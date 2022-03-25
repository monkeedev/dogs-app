import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback} from 'react';
import {MainStyles} from '../../../assets/styles/MainStyles';
import {colors, ExtendedNavigationProp, text} from '../../../utils/constants';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {parseDog} from '../../../utils/functions';
import * as DogsJSON from '../../../utils/dogs.json';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../Navigator/routes';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toggleInHistory} from '../../../redux/actions/listActions';
import {DogItem} from '../../../redux/types/listTypes';
import {getDogsCatalog} from '../../../redux/rootSelector';

interface Props {
  value: string;
}

interface DogsJSONItems {
  [key: string]: DogItem;
}

const ICON_SIZE = 40;
const data: DogsJSONItems = DogsJSON;

export const SuggestionsItem = ({value}: Props) => {
  const dispatch = useDispatch();
  const {history} = useSelector(getDogsCatalog);

  const {navigate} =
    useNavigation<
      ExtendedNavigationProp<'CatalogTabs', {params: {search: string}}>
    >();

  const parsedDog = parseDog(value);

  const addToHistory = () => {
    dispatch(toggleInHistory({name: data[value].name, img: data[value].img}));
  };

  const redirect = () => {
    if (parsedDog && typeof parsedDog !== 'undefined' && parsedDog !== '') {
      if (!history || history.length === 0) {
        addToHistory();
      } else {
        const idx = history.findIndex((i: DogItem) => i.name === value);

        idx === -1 ? addToHistory() : null;
      }

      navigate('CatalogTabs', {
        screen: 'Catalog',
        params: {
          search: parsedDog,
        },
      });
    }
  };

  return data[value] ? (
    <View style={styles.container}>
      <TouchableOpacity onPress={redirect}>
        <View style={MainStyles.rowFull}>
          <ImageBackground
            source={{uri: data[value].img}}
            resizeMode={'cover'}
            style={styles.icon}
          />
          <Text style={styles.text}>{parsedDog}</Text>
        </View>
      </TouchableOpacity>
      <Icon name={'chevron-right'} type={'feather'} color={colors.darkGray} />
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
