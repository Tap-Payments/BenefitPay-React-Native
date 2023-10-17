import React, { useCallback, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView,
  type KeyboardTypeOptions,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import {
  useForm,
  Controller,
  type SubmitHandler,
  type FieldValues,
} from 'react-hook-form';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './Screens.types';
import {
  ColorStyle,
  Edges,
  Locale,
  Theme,
  TapCurrencyCode,
  type Config,
} from 'benefit-pay-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfigScreen'>;

function ConfigScreen({ route, navigation }: Props) {
  const { config, setConfig } = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue('key', config.operator.publicKey);
    setValue('nameOnCard', config.customer.nameOnCard);
    setValue('editable', config.customer.editable);
    setValue('customerId', config.customer.id);
    setValue(
      'firstName',
      config.customer.name !== undefined
        ? config.customer.name[0]?.first ?? ''
        : ''
    );
    setValue(
      'lastName',
      config.customer.name !== undefined ? config.customer.name[0]?.last : ''
    );
    setValue(
      'middleName',
      config.customer.name !== undefined ? config.customer.name[0]?.middle : ''
    );
    setValue(
      'customerLocale',
      config.customer.name !== undefined ? config.customer.name[0]?.lang : ''
    );
    setValue('customerEmail', config.customer.contact?.email ?? '');
    setValue(
      'customerCountryCode',
      config.customer.contact?.phone.number ?? ''
    );
    setValue('customerPhone', config.customer.contact?.phone.countryCode ?? '');
    setValue('merchantId', config.merchant?.id ?? '');
    setValue('invoice', config.invoice?.id);
    setValue('post', config.post?.url);
    setValue('amount', config.order.amount?.toString() ?? '1');
    setValue('orderDescription', config.order.description);
    setValue('orderId', config.order.id);
    setValue('orderReference', config.order.reference);
    setValue('currency', config.order.currency);

    setValue('edges', config.interface?.edges);
    setValue('theme', config.interface?.theme);
    setValue('colorStyle', config.interface?.colorStyle);
    setValue('loader', config.interface?.loader ?? false);
    setValue('locale', config.interface?.locale ?? Locale.en);
  }, [
    config.customer.contact?.email,
    config.customer.contact?.phone.countryCode,
    config.customer.contact?.phone.number,
    config.customer.editable,
    config.customer.id,
    config.customer.name,
    config.customer.nameOnCard,
    config.interface?.colorStyle,
    config.interface?.edges,
    config.interface?.loader,
    config.interface?.locale,
    config.interface?.theme,
    config.invoice?.id,
    config.merchant?.id,
    config.operator.publicKey,
    config.order.amount,
    config.order.currency,
    config.order.description,
    config.order.id,
    config.order.reference,
    config.post?.url,
    setValue,
  ]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    let newConfig: Config = {
      post: { url: data.post },
      invoice: { id: data.invoice },
      operator: { publicKey: data.key, hashString: 'Osama' },
      merchant: { id: data.merchantId },
      order: {
        ...config.order,
        amount: data.amount,
        description: data.orderDescription,
        id: data.orderId,
        reference: data.orderReference,
        currency: data.currency,
      },
      customer: {
        editable: data.editable,
        nameOnCard: data.nameOnCard,
        id: data.customerId,
        name: [
          {
            first: data.firstName,
            last: data.lastName,
            middle: data.middleName,
            lang: data.customerLocale,
          },
        ],
        contact: {
          email: data.customerEmail,
          phone: {
            number: data.customerCountryCode,
            countryCode: data.customerPhone,
          },
        },
      },
      interface: {
        loader: data.loader,
        colorStyle: data.colorStyle,
        theme: data.theme,
        locale: data.locale,
        edges: data.edges,
      },
    };
    setConfig(newConfig);
    navigation.pop();
  };

  const renderTextInput = useCallback(
    (
      name: string,
      title: string,
      isRequired: boolean,
      keyboardType?: KeyboardTypeOptions
    ) => {
      return (
        <View>
          <Text>{title}</Text>
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
              <View style={styles.textBox}>
                <TextInput
                  keyboardType={keyboardType ?? 'default'}
                  style={styles.text}
                  placeholder={title}
                  defaultValue={value}
                  onChangeText={(v) => onChange(v)}
                />
              </View>
            )}
            rules={{
              required: {
                value: isRequired,
                message: 'Please fill out all required fields.',
              },
            }}
          />
          {errors[name]?.message ? (
            <Text style={styles.errorText}>{`${errors[name]?.message}`}</Text>
          ) : null}
        </View>
      );
    },
    [control, errors]
  );

  const renderSwitch = useCallback(
    (name: string, title: string) => {
      return (
        <View>
          <Text style={{ marginVertical: 10 }}>{title}</Text>
          <Controller
            control={control}
            name={name}
            defaultValue={false}
            render={({ field: { onChange, value } }) => {
              return (
                <Switch
                  value={value}
                  onValueChange={(val: boolean) => {
                    onChange(val);
                  }}
                />
              );
            }}
          />
        </View>
      );
    },
    [control]
  );

  const renderList = useCallback(
    ({
      name,
      items,
      isRequired,
      defaultOption,
      title,
    }: {
      name: string;
      title: string;
      items: {
        key: string;
        value: string;
      }[];
      isRequired: boolean;
      defaultOption: string;
    }) => {
      return (
        <View>
          <Text style={{ marginVertical: 10 }}>{title}</Text>
          <Controller
            rules={{
              required: {
                value: isRequired,
                message: 'Please fill out all required fields.',
              },
            }}
            control={control}
            name={name}
            defaultValue={false}
            render={({ field: { onChange, value } }) => {
              return (
                <SelectList
                  setSelected={(val: any) => {
                    onChange(val);
                  }}
                  data={items}
                  save="value"
                  onSelect={() => {
                    onChange(value);
                  }}
                  defaultOption={{ key: defaultOption, value: defaultOption }}
                />
              );
            }}
          />
          {errors[name]?.message ? (
            <Text style={styles.errorText}>{`${errors[name]?.message}`}</Text>
          ) : null}
        </View>
      );
    },
    [control, errors]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={[styles.container]}>
        <View style={styles.container}>
          {renderTextInput('key', 'publicKey', true)}
          {renderTextInput('amount', 'Amount', true, 'numeric')}
          {renderList({
            name: 'currency',
            title: 'Currency',
            items: Object.values(TapCurrencyCode).map((item) => ({
              key: item,
              value: item,
            })),
            isRequired: true,
            defaultOption: config.order.currency as string,
          })}

          <View style={{ height: 10 }}></View>

          {renderList({
            name: 'customerLocale',
            title: 'Customer Locale',
            items: Object.values(Locale).map((item) => ({
              key: item,
              value: item,
            })),
            isRequired: true,
            defaultOption:
              config.customer.name !== undefined
                ? (config.customer.name[0]?.lang as string)
                : '',
          })}
          {renderTextInput('nameOnCard', 'Name On Card', true)}
          {renderSwitch('editable', 'Editable')}
          {renderTextInput('customerId', 'customer Id', false)}
          {renderTextInput('firstName', 'First Name', true)}
          {renderTextInput('middleName', 'Middle Name', true)}
          {renderTextInput('lastName', 'Last Name', true)}
          {renderTextInput('customerPhone', 'Customer Phone', true)}
          {renderTextInput(
            'customerCountryCode',
            'Customer Country Code',
            true
          )}
          {renderTextInput('customerEmail', 'Customer Email', true)}
          {renderTextInput('merchantId', 'Merchant Id', false)}
          {renderTextInput('post', 'post url', false)}
          {renderTextInput('invoice', 'invoice Id', false)}
          {renderTextInput('orderDescription', 'Order Description', false)}
          {renderTextInput('orderId', 'Order Id', false)}
          {renderTextInput('orderReference', 'Order Reference', false)}

          {renderList({
            name: 'colorStyle',
            title: 'color Style',
            items: Object.values(ColorStyle).map((item) => ({
              key: item,
              value: item,
            })),
            isRequired: true,
            defaultOption: config.interface?.colorStyle as string,
          })}

          {renderList({
            name: 'locale',
            title: 'Local',
            items: Object.values(Locale).map((item) => ({
              key: item,
              value: item,
            })),
            isRequired: true,
            defaultOption: config.interface?.locale as string,
          })}
          {renderList({
            name: 'edges',
            title: 'Edges',
            items: Object.values(Edges).map((item) => ({
              key: item,
              value: item,
            })),
            isRequired: true,
            defaultOption: config.interface?.edges as string,
          })}
          {renderList({
            name: 'theme',
            title: 'Theme',
            items: Object.values(Theme).map((item) => ({
              key: item,
              value: item,
            })),
            isRequired: true,
            defaultOption: config.interface?.theme as string,
          })}

          {renderSwitch('loader', 'loader')}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSubmit(onSubmit, (err) => {
              console.log(
                '🚀 ~ file: ConfigScreen.tsx:763 ~ handleSubmit ~ err:',
                err
              );
            })();
          }}
        >
          <Text style={styles.buttonText}>{'Edit'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 16,
  },
  container: {
    width: '100%',
  },
  textBox: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    paddingStart: 5,
    borderColor: '#e4e4e4',
    borderWidth: 1,
    alignSelf: 'stretch',
    marginVertical: 7,
  },
  text: {
    fontSize: 15,
    paddingVertical: 10,
  },
  errorText: {
    color: 'red',
  },
  dropdown: {
    marginVertical: 10,
  },
  dropdownPlaceholder: {
    color: '#c7c7c8',
  },
  button: {
    width: '100%',
    backgroundColor: '#517CFF',
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
});

export default ConfigScreen;
