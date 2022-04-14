import React from 'react';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {DefaultButton} from '.';
import {colors, shareBottomSheetRef} from '../../utils/constants';

interface Props {
  uri: string;
}

export const ShareButton = ({uri}: Props) => {
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
        color={colors.white}
        size={18}
      />
    </DefaultButton>
  );
};
