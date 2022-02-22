import {
  View,
  StyleSheet,
  ColorValue,
  SafeAreaView,
  StatusBar,
  StatusBarProps,
  Platform,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends StatusBarProps {
  bg: ColorValue;
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const CustomStatusBar = ({bg, ...props}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[{height: insets.top}, {backgroundColor: bg}]}>
      <StatusBar translucent backgroundColor={bg} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});

export default CustomStatusBar;
