import {View, ColorValue, StatusBar, StatusBarProps} from 'react-native';
import React from 'react';
import {isAndroid} from '../utils/functions';

interface Props extends StatusBarProps {
  backgroundColor: ColorValue;
}

const APPBAR_HEIGHT = isAndroid() ? 56 : 44;

const CustomStatusBar = ({backgroundColor, ...props}: Props) => {
  return (
    <View style={{height: APPBAR_HEIGHT, backgroundColor}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

export default CustomStatusBar;
