import {
  View,
  StyleSheet,
  ColorValue,
  StatusBar,
  StatusBarProps,
  Platform,
} from 'react-native';
import React from 'react';

interface Props extends StatusBarProps {
  backgroundColor: ColorValue;
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const CustomStatusBar = ({backgroundColor, ...props}: Props) => {
  return (
    <View style={[styles.appBar, {backgroundColor}]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: APPBAR_HEIGHT,
  },
});

export default CustomStatusBar;
