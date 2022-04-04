import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {} from 'react-native-gesture-handler';
import {colors} from '../../utils/constants';

const ICON_SIZE = 36;

interface Props {
  onPress: () => void;
}

const ClearTextButton = ({onPress}: Props) => {
  const handleOnPress = () => {
    if (onPress && typeof onPress === 'function') {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handleOnPress} testID={'ClearTextButton_Button'}>
      <View style={styles.container}>
        <Icon
          name={'close-circle-outline'}
          type={'ionicon'}
          size={24}
          color={colors.darkGray}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ClearTextButton;

const styles = StyleSheet.create({
  container: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
