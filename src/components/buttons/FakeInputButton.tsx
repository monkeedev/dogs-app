import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {ReactElement} from 'react';

interface Props {
  children: ReactElement;
  action: () => void;
}

const FakeInputButton = ({children, action}: Props) => {
  const handleRedirect = () => {
    if (!action || typeof action !== 'function') {
      throw new Error('No action provided');
    } else {
      action();
    }
  };

  return (
    <Pressable onPress={handleRedirect}>
      <View>{children}</View>
    </Pressable>
  );
};

export default FakeInputButton;

const styles = StyleSheet.create({});
