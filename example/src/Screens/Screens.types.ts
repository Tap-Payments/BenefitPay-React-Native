import type { Config } from 'benefit-pay-react-native';

export type RootStackParamList = {
  ConfigScreen: { config: Config; setConfig: (config: Config) => void };
  HomeScreen: undefined;
};
