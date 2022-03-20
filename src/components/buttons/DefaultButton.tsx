import {
  View,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
  ColorValue,
} from 'react-native';
import React, {ReactElement} from 'react';

interface Props {
  children: ReactElement;
  onPress: () => void;
  color?: ColorValue;
  isCircle?: boolean;
}

const DefaultButton = ({
  children,
  onPress,
  isCircle = false,
  color = 'red',
}: Props) => {
  const handlePress = (e: GestureResponderEvent) => {
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <View
        style={[
          styles.container,
          isCircle ? styles.circle : styles.square,
          {backgroundColor: color},
        ]}>
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
