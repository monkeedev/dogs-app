import React from 'react';
import {DefaultInput} from '.';

interface Props {
  onChangeText: (s: string) => void;
}

export const EmailInput: React.FC<Props> = ({onChangeText}) => {
  return (
    <DefaultInput
      onChangeText={onChangeText}
      iconConfig={{name: 'mail', type: 'feather'}}
      placeholder={'Email'}
      type={'email-address'}
    />
  );
};
