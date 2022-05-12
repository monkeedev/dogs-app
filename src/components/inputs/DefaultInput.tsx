import React, {useCallback} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useTheme} from '../../assets/theme';
import {IconProps} from '../../utils/types';

interface Props {
  value?: string;
  onChangeText?: (str: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isAutofocused?: boolean;
  iconConfig?: IconProps;
  type?: TextInputProps['keyboardType'];
  isPassword?: boolean;
}

const ICON_SIZE = 36;

export const DefaultInput = ({
  value,
  placeholder,
  onChangeText,
  isDisabled,
  isAutofocused,
  iconConfig,
  isPassword,
}: Props) => {
  const {mode} = useTheme();

  const renderIcon = useCallback(() => {
    return (
      iconConfig && (
        <Icon
          size={iconConfig.size ?? 21}
          name={iconConfig.name}
          type={iconConfig.type}
          style={styles.icon}
          color={mode.text}
        />
      )
    );
  }, [iconConfig?.name]);

  return (
    <View style={styles.container}>
      {renderIcon()}

      <TextInput
        style={{...styles.input, ...styles.text, color: mode.inputText}}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={mode.inputPlaceholder}
        testID={'SearchInput_Input'}
        secureTextEntry={isPassword}
        onChangeText={onChangeText}
        autoCapitalize={'none'}
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
    marginVertical: 7,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
