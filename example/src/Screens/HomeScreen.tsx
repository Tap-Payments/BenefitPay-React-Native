/* eslint-disable react-native/no-inline-styles */
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
  Edges,
  Locale,
  TapCurrencyCode,
  type ConfigSettings,
} from 'benefit-pay-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

function HomeScreen({ navigation }: Props) {
  const [config, setConfig] = useState<ConfigSettings>({
    merchant: {
      id: '',
    },
    redirect: 'tapredirectionwebsdk://',
    customer: {
      names: [
        {
          middle: 'Middle',
          last: 'Payments',
          lang: 'en',
          first: 'Tap',
        },
      ],
      contact: {
        phone: {
          number: '66178990',
          countryCode: '965',
        },
        email: 'email@email.com',
      },
      id: null,
    },
    interface: {
      edges: Edges.straight,
      locale: Locale.ar,
    },
    reference: { transaction: 'transaction', order: '12' },
    metadata: '',
    post: { url: '' },
    transaction: {
      amount: '1',
      currency: TapCurrencyCode.BHD,
      autoDismiss: true,
    },
    androidOperator: {
      hashString: '',
      publicKey: 'pk_live_3zIsCFeStGLv8DNd9m054bYc',
    },
    iOSOperator: {
      hashString: '',
      publicKey: 'pk_live_3zIsCFeStGLv8DNd9m054bYc',
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
          // eslint-disable-next-line react-native/no-inline-styles
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
              setConfig: setConfig,
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
