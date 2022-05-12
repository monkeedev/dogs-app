import React from 'react';
import {ColorValue, StatusBar, StatusBarProps, View} from 'react-native';
import {isAndroid} from '../utils/functions';

interface Props extends StatusBarProps {
  backgroundColor: ColorValue;
}

const APPBAR_HEIGHT = isAndroid() ? 56 : 44;

export const CustomStatusBar = ({backgroundColor, ...props}: Props) => {
  return (
    <View style={{height: APPBAR_HEIGHT, backgroundColor}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};
