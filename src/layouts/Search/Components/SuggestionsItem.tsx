import {View, StyleSheet} from 'react-native';
import React from 'react';
import {MainStyles} from '../../../assets/styles/MainStyles';
import {colors} from '../../../utils/constants';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import * as DogsJSON from '../../../utils/dogs.json';
import {DogItem} from '../../../redux/types/listTypes';
import {DogInfo} from './DogInfo';

interface Props {
  value: string;
}

interface DogsJSONItems {
  [key: string]: DogItem;
}

const data: DogsJSONItems = DogsJSON;

export const SuggestionsItem = ({value}: Props) => {
  return data[value] ? (
    <View style={styles.container}>
      <DogInfo name={data[value].name} uri={data[value].img} />
      <View style={styles.icon} pointerEvents={'none'}>
        <Icon name={'chevron-right'} type={'feather'} color={colors.darkGray} />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    ...MainStyles.rowFull,
    marginHorizontal: 14,
    marginVertical: 7,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
});
