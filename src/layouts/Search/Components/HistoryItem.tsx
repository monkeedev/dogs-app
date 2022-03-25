import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {MainStyles} from '../../../assets/styles/MainStyles';
import {colors, ExtendedNavigationProp, text} from '../../../utils/constants';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {parseDog} from '../../../utils/functions';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {toggleInHistory} from '../../../redux/actions/listActions';
import {DogItem} from '../../../redux/types/listTypes';

interface Props {
  value: DogItem;
}

const ICON_SIZE = 40;

export const HistoryItem = ({value}: Props) => {
  const dispatch = useDispatch();
  const {navigate} =
    useNavigation<
      ExtendedNavigationProp<'CatalogTabs', {params: {search: string}}>
    >();

  const parsedDog = parseDog(value.name);

  const redirect = () => {
    if (parsedDog && typeof parsedDog !== 'undefined' && parsedDog !== '') {
      navigate('CatalogTabs', {
        screen: 'Catalog',
        params: {
          search: parsedDog,
        },
      });
    }
  };

  const deleteFromHistory = () => {
    if (parsedDog && typeof parsedDog !== 'undefined' && parsedDog !== '') {
      dispatch(toggleInHistory(value));
    }
  };

  return value.name ? (
    <View style={styles.container}>
      <TouchableOpacity onPress={redirect}>
        <View style={MainStyles.rowFull}>
          <ImageBackground
            source={{uri: value.img}}
            resizeMode={'cover'}
            style={styles.icon}
          />
          <Text style={styles.text}>{parsedDog}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteFromHistory}>
        <Icon name={'x'} type={'feather'} color={colors.darkGray} />
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    ...MainStyles.rowFull,
    marginHorizontal: 14,
    marginVertical: 7,
  },
  text: {
    fontSize: text.m,
    color: colors.darkGray,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 7,
    borderRadius: ICON_SIZE,
    overflow: 'hidden',
  },
});
