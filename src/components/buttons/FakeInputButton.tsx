import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {ReactElement} from 'react';

interface Props {
  children: ReactElement;
  onPress: () => void;
}

const FakeInputButton = ({children, onPress}: Props) => {
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

export default FakeInputButton;

const styles = StyleSheet.create({});
