import React, {ReactElement} from 'react';
import {Pressable, View} from 'react-native';

interface Props {
  children: ReactElement;
  onPress: () => void;
}

export const FakeInputButton = ({children, onPress}: Props) => {
  const handleRedirect = () => {
    if (onPress || typeof onPress === 'function') {
      return onPress();
    }
  };

  return (
    <Pressable testID={'FakeInputButton_Pressable'} onPress={handleRedirect}>
      <View>{children}</View>
    </Pressable>
  );
};
