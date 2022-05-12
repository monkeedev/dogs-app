import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useTheme} from '../../assets/theme';
import {colors} from '../../utils/constants';

interface Props {
  value: string;
  onChangeText?: (str: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isAutofocused?: boolean;
}

const ICON_SIZE = 36;

export const SearchInput = ({
  value = '',
  onChangeText,
  placeholder,
  isDisabled,
  isAutofocused,
}: Props) => {
  const {mode} = useTheme();
  const isPlaceholderForDisabledInputPresent = value === '' && placeholder;

  return (
    <View style={styles.container}>
      <Icon
        size={21}
        name={'search'}
        type={'ionicon'}
        style={styles.icon}
        color={mode.text}
      />
      {isDisabled ? (
        <View
          testID={'SearchInput_Disabled'}
          style={{
            ...styles.input,
          }}>
          <Text style={{...styles.text, color: mode.text}}>
            {isPlaceholderForDisabledInputPresent ? placeholder : value}
          </Text>
        </View>
      ) : (
        <TextInput
          style={{...styles.input, ...styles.text, color: mode.text}}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
          testID={'SearchInput_Input'}
          onChangeText={onChangeText}
          autoFocus={isAutofocused}
        />
      )}
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
    marginVertical: 7,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    left: 7,
  },
  text: {
    fontWeight: '700',
  },
  input: {
    flex: 1,
    padding: 7,
    marginRight: 14,
    height: 36,
    justifyContent: 'center',
  },
});
