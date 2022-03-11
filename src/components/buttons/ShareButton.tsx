import React, {useRef, useState} from 'react';
import DefaultButton from './DefaultButton';
import {colors, shareBottomSheetRef} from '../../utils/constants';
import {Icon} from 'react-native-elements';
// import {shareImage} from '../../utils/functions';
import {Text, View} from 'react-native';

interface Props {
  uri: string;
}

const ShareButton = ({uri}: Props) => {
  const openBottomSheetNavigator = () => {
    shareBottomSheetRef.current.toggle();
  };

  return (
    <DefaultButton onPress={openBottomSheetNavigator} color={colors.turquoise}>
      <Icon
        type={'ionicon'}
        name={`share-social-sharp`}
        color={colors.white}
        size={18}
        tvParallaxProperties={false}
      />
    </DefaultButton>
  );
};

export default ShareButton;
