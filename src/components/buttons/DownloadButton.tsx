import React from 'react';
import DefaultButton from './DefaultButton';
import {colors} from '../../utils/constants';
import {Icon} from 'react-native-elements';

interface Props {
  uri: string;
}

const DownloadButton = ({uri}: Props) => {
  return (
    <DefaultButton
      onPress={() => console.log('@download', uri)}
      color={colors.turquoise}>
      <Icon
        type={'feather'}
        name={`download`}
        color={colors.white}
        size={18}
        tvParallaxProperties={false}
      />
    </DefaultButton>
  );
};

export default DownloadButton;
