import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {ReactElement} from 'react';

interface Props {
  children: ReactElement;
  action: () => void;
}

const FakeInputButton = ({children, action}: Props) => {
  const handleRedirect = () => {
    if (!action || typeof action !== 'function') {
      return 'No action provided';
    } else {
      return action();
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
