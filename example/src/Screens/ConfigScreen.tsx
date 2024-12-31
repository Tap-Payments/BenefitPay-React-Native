import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
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
  Edges,
  Locale,
  TapCurrencyCode,
  type ConfigSettings,
} from 'benefit-pay-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfigScreen'>;

function ConfigScreen({ route, navigation }: Props) {
  const { config, setConfig } = route.params;
  const [configState, _] = useState<ConfigSettings>(config);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    let newConfig: ConfigSettings = {
      merchant: {
        id: data.merchantId,
      },
      redirect: data.redirect,
      customer: {
        names: [
          {
            middle: data.middleName,
            last: data.lastName,
            lang: data.nameLanguage,
            first: data.firstName,
          },
        ],
        contact: {
          phone: {
            number: data.customerPhone,
            countryCode: data.customerCountryCode,
          },
          email: data.customerEmail,
        },
        id: data.customerId,
      },
      interface: {
        edges: data.edges,
        locale: data.locale,
      },
      reference: { transaction: data.transactionRef, order: data.orderId },
      metadata: data.metadata,
      post: { url: data.post },
      transaction: {
        amount: data.amount,
        currency: data.currency,
      },
      androidOperator: {
        hashString: '',
        publicKey: data.androidKey,
      },
      iOSOperator: {
        hashString: '',
        publicKey: data.iOSKey,
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
      defaultValue: string,
      keyboardType?: KeyboardTypeOptions
    ) => {
      return (
        <View>
          <Text>{title}</Text>
          <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field: { onChange, value } }) => (
              <View style={styles.textBox}>
                <TextInput
                  keyboardType={keyboardType ?? 'default'}
                  style={styles.text}
                  placeholder={title}
                  value={value}
                  defaultValue={defaultValue}
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

  // const renderSwitch = useCallback(
  //   (name: string, title: string) => {
  //     return (
  //       <View>
  //         <Text style={{ marginVertical: 10 }}>{title}</Text>
  //         <Controller
  //           control={control}
  //           name={name}
  //           defaultValue={false}
  //           render={({ field: { onChange, value } }) => {
  //             return (
  //               <Switch
  //                 value={value}
  //                 onValueChange={(val: boolean) => {
  //                   onChange(val);
  //                 }}
  //               />
  //             );
  //           }}
  //         />
  //       </View>
  //     );
  //   },
  //   [control]
  // );

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
            defaultValue={defaultOption}
            render={({ field: { onChange, value } }) => {
              console.log(
                '🚀 ~ file: ConfigScreen.tsx:193 ~ ConfigScreen ~ value:',
                value
              );

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
          {renderTextInput(
            'iOSKey',
            'iOS Key',
            true,
            configState.iOSOperator.publicKey
          )}
          {renderTextInput(
            'androidKey',
            'Android Key',
            true,
            configState.androidOperator.publicKey
          )}
          {renderTextInput(
            'amount',
            'Amount',
            true,
            configState.transaction.amount,
            'numeric'
          )}
          {renderList({
            name: 'currency',
            title: 'Currency',
            items: Object.values(TapCurrencyCode).map((item) => ({
              key: item,
              value: item,
            })),
            isRequired: true,
            defaultOption: configState.transaction.currency as string,
          })}
          <View style={{ height: 10 }}></View>
          {renderTextInput(
            'merchantId',
            'Merchant Id',
            false,
            configState.merchant.id
          )}
          {renderTextInput('post', 'post url', false, config.post.url)}
          {renderTextInput('metadata', 'meta data', false, config.metadata)}
          {renderTextInput(
            'transactionRef',
            'transaction Ref',
            false,
            configState.reference.transaction
          )}
          {renderTextInput(
            'orderId',
            'transaction order',
            false,
            configState.reference.order
          )}

          {renderList({
            name: 'edges',
            title: 'edges',
            items: Object.values(Edges).map((item) => ({
              key: item,
              value: item,
            })),
            isRequired: true,
            defaultOption: configState.interface.edges as string,
          })}
          <View style={{ height: 10 }}></View>

          {renderList({
            name: 'locale',
            title: 'locale',
            items: Object.values(Locale).map((item) => ({
              key: item,
              value: item,
            })),
            isRequired: true,
            defaultOption: configState.interface.locale as string,
          })}

          <View style={{ height: 10 }}></View>

          {renderTextInput(
            'customerId',
            'customer Id',
            false,
            configState.customer.id ?? ''
          )}
          {renderTextInput(
            'firstName',
            'First Name',
            true,
            configState.customer.names?.[0]?.first ?? ''
          )}
          {renderTextInput(
            'middleName',
            'Middle Name',
            true,
            configState.customer.names?.[0]?.middle ?? ''
          )}
          {renderTextInput(
            'lastName',
            'Last Name',
            true,
            configState.customer.names?.[0]?.last ?? ''
          )}
          {renderTextInput(
            'customerPhone',
            'Customer Phone',
            true,
            configState.customer.contact?.phone.number ?? ''
          )}
          {renderTextInput(
            'customerCountryCode',
            'Customer Country Code',
            true,
            configState.customer.contact?.phone.countryCode ?? ''
          )}
          {renderTextInput(
            'customerEmail',
            'Customer Email',
            true,
            configState.customer.contact?.email ?? ''
          )}
          {renderList({
            name: 'nameLanguage',
            title: 'Name Language',
            items: Object.values(Locale).map((item) => ({
              key: item,
              value: item,
            })),
            isRequired: true,
            defaultOption: configState.customer.names?.[0]?.lang ?? '',
          })}
          <View style={{ height: 10 }}></View>
          {renderTextInput(
            'redirect',
            'redirect url',
            false,
            configState.redirect
          )}
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
