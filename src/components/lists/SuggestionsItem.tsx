import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {DogInfoListItem} from '.';
import {MainStyles} from '../../assets/styles/MainStyles';
import {colors, dogs} from '../../utils/constants';

interface Props {
  value: string;
}

export const SuggestionsItem = ({value}: Props) => {
  const {name, img} = dogs[value];

  return dogs[value] ? (
    <View style={styles.container}>
      <DogInfoListItem name={name} uri={img} />

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
