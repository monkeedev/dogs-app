import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {DefaultInput} from '.';
import {useTheme} from '../../assets/theme';

interface Props {
  onChangeText?: (str: string) => void;
}

export const PasswordInput = ({onChangeText}: Props) => {
  const {mode} = useTheme();
  const [isSecure, setSecure] = useState(true);

  const handleChangeText = (str: string) => {
    if (onChangeText && typeof onChangeText === 'function') {
      onChangeText(str);
    }
  };

  const handlePress = () => setSecure(prev => !prev);

  return (
    <View style={styles.container}>
      <DefaultInput
        onChangeText={handleChangeText}
        iconConfig={{name: 'key-outline', type: 'ionicon'}}
        placeholder={'Password'}
        isPassword={isSecure}
      />
      <Icon
        name={isSecure ? 'eye-outline' : 'eye-off-outline'}
        color={mode.text}
        size={21}
        type={'ionicon'}
        onPress={handlePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    marginHorizontal: 21,
  },
});
