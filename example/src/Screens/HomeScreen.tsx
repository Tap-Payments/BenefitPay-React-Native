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
  type Config,
} from 'benefit-pay-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

function HomeScreen({ navigation }: Props) {
  const [config, setConfigState] = useState<Config>({
    operator: { publicKey: 'pk_test_Wa4ju8UC1zoi0HhST9yO3M6n', hashString: '' },
    transaction: {
      amount: 12,
      currency: TapCurrencyCode.BHD,
    },
    reference: {
      transaction: 'transaction',
      order: 'order',
    },
    merchant: { id: '' },
    customer: {
      id: '',
      names: [{ lang: Locale.en, first: 'TAP', middle: '', last: 'PAYMENTS' }],
      contact: {
        email: 'tap@tap.company',
        phone: { countryCode: '+965', number: '88888888' },
      },
    },
    interface: {
      locale: Locale.en,
      edges: Edges.curved,
    },
    post: { url: '' },
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
