import type { ConfigSettings } from 'benefit-pay-react-native';

export type RootStackParamList = {
  ConfigScreen: {
    config: ConfigSettings;
    setConfig: (config: ConfigSettings) => void;
  };
  HomeScreen: undefined;
};
