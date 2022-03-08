import React, {useRef} from 'react';
import DefaultButton from './DefaultButton';
import {colors} from '../../utils/constants';
import {Icon} from 'react-native-elements';
import {shareImage} from '../../utils/functions';

interface Props {
  uri: string;
}

const ShareButton = ({uri}: Props) => {
  const shareRef = useRef(async (img: string) => {
    await shareImage(img).catch(err => console.log('@error!', err));
  });

  return (
    <DefaultButton
      onPress={() => shareRef.current(uri)}
      color={colors.turquoise}>
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
