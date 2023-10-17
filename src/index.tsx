import React, { useState } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
  View,
  type NativeSyntheticEvent,
} from 'react-native';
import type { Config } from './models';

const LINKING_ERROR =
  `The package 'benefit-pay-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ComponentName = 'BenefitPayReactNativeView';

export * from './models';

export const BenefitPayReactNativeView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<IBenefitPayViewNativeProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export interface IBenefitPayViewProps {
  style: ViewStyle;
  config: Config;
  onError: (data: Object) => void;
  onSuccess: (data: Object) => void;
  onOrderCreated: (data: Object) => void;
  onChargeCreated: (data: Object) => void;
  onReady: () => void;
  onClicked: () => void;
  onCanceled: () => void;
}
export interface IBenefitPayViewNativeProps {
  style: ViewStyle;
  config: Config;

  onCanceledCallback: () => void;
  onSuccessCallback: ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: Object }>) => void;
  onErrorCallback: ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: Object }>) => void;
  onOrderCreatedCallback: ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: Object }>) => void;
  onChargeCreatedCallback: ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: Object }>) => void;
  onReadyCallback: () => void;
  onClickedCallback: () => void;
}

// UIManager.setLayoutAnimationEnabledExperimental &&
//   UIManager.setLayoutAnimationEnabledExperimental(true);

function BenefitPayView({
  style,
  config,
  onSuccess,
  onReady,
  onError,
  onOrderCreated,
  onChargeCreated,
  onCanceled,
  onClicked,
}: IBenefitPayViewProps) {
  const [addFlex, setAddFlex] = useState(false);

  const handleOnSuccess = ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: Object }>) => {
    onSuccess(data);
  };

  const handleOnReady = () => {
    onReady();
    setAddFlex(true);
    setTimeout(() => {
      setAddFlex(false);
    }, 1);
  };

  const handleOnError = ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: object }>) => {
    onError(data);
  };

  const handleOnClicked = () => {
    onClicked();
  };

  const handleOnCanceled = () => {
    onCanceled();
  };

  const handleOnOrderCreated = ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: object }>) => {
    onOrderCreated(data);
  };

  const handleOnChargeCreated = ({
    nativeEvent: { data },
  }: NativeSyntheticEvent<{ data: object }>) => {
    onChargeCreated(data);
  };

  return (
    <View
      style={{
        ...style,
        height: 50,
        flex: addFlex ? 0.1 : 0,
      }}
    >
      <BenefitPayReactNativeView
        style={{ ...style, flex: 1, height: 50 }}
        config={config}
        onErrorCallback={handleOnError}
        onSuccessCallback={handleOnSuccess}
        onOrderCreatedCallback={handleOnOrderCreated}
        onChargeCreatedCallback={handleOnChargeCreated}
        onReadyCallback={handleOnReady}
        onClickedCallback={handleOnClicked}
        onCanceledCallback={handleOnCanceled}
      />
    </View>
  );
}

export default BenefitPayView;
