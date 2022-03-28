import {
  View,
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
    <View testID={'StatusBar'} style={{height: APPBAR_HEIGHT, backgroundColor}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

export default CustomStatusBar;
