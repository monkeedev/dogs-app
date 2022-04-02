import {
  View,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
  ColorValue,
} from 'react-native';
import React, {ReactElement} from 'react';
import {colors} from '../../utils/constants';

interface Props {
  children: ReactElement;
  onPress: () => void;
  color?: ColorValue;
  isCircle?: boolean;
}

const DefaultButton = ({children, onPress, isCircle, color}: Props) => {
  return (
    <TouchableOpacity
      testID={'DefaultButton_TouchableOpacity'}
      onPress={onPress}
      activeOpacity={0.9}>
      <View
        testID={'DefaultButton_View'}
        style={{
          ...styles.container,
          ...styles[isCircle ? 'circle' : 'square'],
          backgroundColor: color ?? colors.white,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 3.5,
  },
  circle: {
    borderRadius: 99,
  },
  square: {
    borderRadius: 7,
  },
});

export default DefaultButton;
