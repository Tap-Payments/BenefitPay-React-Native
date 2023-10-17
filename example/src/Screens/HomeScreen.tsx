import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { RootStackParamList } from './Screens.types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import BenefitPayView, {
  ColorStyle,
  Edges,
  Locale,
  TapCurrencyCode,
  Theme,
  type Config,
} from 'benefit-pay-react-native';
type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

function HomeScreen({ navigation }: Props) {
  const [config, setConfigState] = useState<Config>({
    merchant: {
      id: '',
    },
    order: {
      reference: '',
      amount: 1,
      currency: TapCurrencyCode.SAR,
      description: '',
      id: '',
      metadata: {},
    },
    invoice: {
      id: 'Map to authenticate.reference.invoice',
    },
    post: {
      url: 'Map to authenticate.reference.post',
    },
    operator: {
      publicKey: 'pk_test_YhUjg9PNT8oDlKJ1aE2fMRz7',
      hashString: 'OSAMA',
    },
    customer: {
      nameOnCard: 'Tap Payments',
      editable: true,
      id: '',
      name: [
        {
          first: 'Tap',
          lang: Locale.en,
          middle: 'Company',
          last: 'Payments',
        },
      ],
      contact: {
        phone: {
          number: '88888888',
          countryCode: '+965',
        },
        email: 'tappayments@tap.company',
      },
    },
    interface: {
      loader: true,
      locale: Locale.en,
      theme: Theme.dark,
      edges: Edges.curved,
      colorStyle: ColorStyle.colored,
    },
  });

  const [response, setResponse] = useState<String>('');

  React.useEffect(() => {
    setResponse('');
    setResponse(`config${JSON.stringify(config, null, 2)}`);
  }, [config]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BenefitPayView
          onSuccess={(tokenValue) => {
            setResponse(
              `${response} \n =====onSuccessStart==== \n ${JSON.stringify(
                tokenValue,
                null,
                2
              )} \n =====onSuccessEnd===== \n`
            );
          }}
          style={{ width: '100%' }}
          config={config}
          onReady={() => {
            setResponse(
              `${response} \n =====onReady==== \n onReady \n =====onReady===== \n`
            );
          }}
          onCanceled={() => {
            setResponse(
              `${response} \n =====onCanceled==== \n onCanceled \n =====onCanceled===== \n`
            );
          }}
          onClicked={() => {
            setResponse(
              `${response} \n =====onClicked==== \n onClicked \n =====onClicked===== \n`
            );
          }}
          onChargeCreated={(binIdentification: Object) => {
            setResponse(
              `${response} \n =====onChargeCreated==== \n ${JSON.stringify(
                binIdentification,
                null,
                2
              )} \n =====onChargeCreated===== \n`
            );
          }}
          onOrderCreated={(binIdentification: Object) => {
            setResponse(
              `${response} \n =====onOrderCreated==== \n ${JSON.stringify(
                binIdentification,
                null,
                2
              )} \n =====onOrderCreated===== \n`
            );
          }}
          onError={(error: object) => {
            setResponse(
              `${response} \n =====onErrorStart==== \n ${JSON.stringify(
                error,
                null,
                2
              )} \n =====onErrorEnd===== \n`
            );
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ConfigScreen', {
              config,
              setConfig: setConfigState,
            });
          }}
        >
          <Text style={{ color: 'black' }}>Config SDK</Text>
        </TouchableOpacity>
        <ScrollView>
          <Text style={{ color: 'black' }}>{response}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
