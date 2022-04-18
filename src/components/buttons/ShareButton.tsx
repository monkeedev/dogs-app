import React from 'react';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {DefaultButton} from '.';
import {useTheme} from '../../assets/theme';
import {colors, shareBottomSheetRef} from '../../utils/constants';

interface Props {
  uri: string;
}

export const ShareButton = ({uri}: Props) => {
  const {mode} = useTheme();

  const openBottomSheetNavigator = () => {
    if (uri && uri !== '') {
      return shareBottomSheetRef.current.toggle(uri);
    }
  };

  return (
    <DefaultButton onPress={openBottomSheetNavigator} color={colors.turquoise}>
      <Icon
        type={'ionicon'}
        name={`share-social-sharp`}
        color={mode.card}
        size={18}
      />
    </DefaultButton>
  );
};
