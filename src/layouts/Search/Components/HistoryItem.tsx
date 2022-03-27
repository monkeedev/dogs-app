import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {MainStyles} from '../../../assets/styles/MainStyles';
import {colors} from '../../../utils/constants';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {parseDog} from '../../../utils/functions';
import {useDispatch} from 'react-redux';
import {toggleInHistory} from '../../../redux/actions/listActions';
import {DogItem} from '../../../redux/types/listTypes';
import {DogInfo} from './DogInfo';

interface Props {
  value: DogItem;
}

export const HistoryItem = ({value}: Props) => {
  const dispatch = useDispatch();

  const parsedDog = parseDog(value.name);
  const deleteFromHistory = () => {
    if (parsedDog && typeof parsedDog !== 'undefined' && parsedDog !== '') {
      dispatch(toggleInHistory(value));
    }
  };

  return value.name ? (
    <View style={styles.container}>
      <DogInfo name={value.name} uri={value.img} />

      <View style={styles.icon}>
        <TouchableOpacity onPress={deleteFromHistory}>
          <Icon name={'x'} type={'feather'} color={colors.darkGray} />
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    ...MainStyles.rowFull,
    marginHorizontal: 14,
    marginVertical: 7,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 40,
    width: 40,
    justifyContent: 'center',
    zIndex: 1,
  },
});
