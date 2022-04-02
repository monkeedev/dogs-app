import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {colors} from '../../utils/constants';

interface Props {
  value: string;
  action?: (str: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isAutofocused?: boolean;
}

const ICON_SIZE = 36;

const SearchInput = ({
  value = '',
  action,
  placeholder,
  isDisabled,
  isAutofocused,
}: Props) => {
  const isPlaceholderForDisabledInputPresent = value === '' && placeholder;

  return (
    <View style={styles.container}>
      <Icon
        size={21}
        name={'search'}
        type={'ionicon'}
        style={styles.icon}
        color={colors.gray}
      />
      {isDisabled ? (
        <View testID={'SearchInput_Disabled'} style={styles.input}>
          <Text
            style={
              isPlaceholderForDisabledInputPresent
                ? styles.placeholderText
                : {color: colors.black}
            }>
            {isPlaceholderForDisabledInputPresent ? placeholder : value}
          </Text>
        </View>
      ) : (
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
          testID={'SearchInput_Input'}
          onChangeText={action}
          autoFocus={isAutofocused}
        />
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: colors.white,
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
  input: {
    flex: 1,
    padding: 7,
    marginRight: 14,
    color: colors.black,
    height: 36,
    justifyContent: 'center',
  },
  placeholderText: {
    color: colors.gray,
  },
});
