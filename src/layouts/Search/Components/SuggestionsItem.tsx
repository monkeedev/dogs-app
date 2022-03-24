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
import * as DogsJSON from '../../../utils/dogs.json';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../Navigator/routes';
import {useEffect} from 'react';

interface Props {
  value: string;
}

interface DogsJSONItems {
  [key: string]: {
    name: string;
    img: string;
  };
}

const ICON_SIZE = 40;
const data: DogsJSONItems = DogsJSON;

export const SuggestionsItem = ({value}: Props) => {
  const {navigate} =
    useNavigation<
      ExtendedNavigationProp<'CatalogTabs', {params: {search: string}}>
    >();

  const parsedDog = parseDog(value);

  const redirect = () => {
    navigate('CatalogTabs', {
      screen: 'Catalog',
      params: {
        search: parsedDog,
      },
    });
  };

  return (
    <TouchableOpacity onPress={redirect}>
      <View style={styles.container}>
        <View style={MainStyles.rowFull}>
          <ImageBackground
            source={{uri: data[value].img}}
            resizeMode={'cover'}
            style={styles.icon}
          />
          <Text style={styles.text}>{parsedDog}</Text>
        </View>
        <Icon name={'chevron-right'} type={'feather'} color={colors.darkGray} />
      </View>
    </TouchableOpacity>
  );
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
