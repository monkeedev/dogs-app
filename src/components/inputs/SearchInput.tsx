import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {colors} from '../../utils/constants';

interface Props {
  value: string;
  action: (str: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
}

const ICON_SIZE = 36;

const SearchInput = ({value = '', action, placeholder, isDisabled}: Props) => {
  const isPlaceholderForDisabledInputPresent = value === '' && placeholder;

  return (
    <View style={styles.container}>
      <Icon
        size={21}
        name={'search'}
        type={'ionicon'}
        style={styles.icon}
        color={colors.gray}
        tvParallaxProperties={false}
      />
      {isDisabled ? (
        <View style={styles.input}>
          <Text
            style={
              isPlaceholderForDisabledInputPresent
                ? styles.placeholderText
                : null
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
          onChangeText={action}
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
    marginHorizontal: 7,
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