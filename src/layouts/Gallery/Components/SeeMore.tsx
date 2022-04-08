import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import DefaultButton from '../../../components/buttons/DefaultButton';
import {colors, dogs, text} from '../../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {parseDog} from '../../../utils/functions';
import {ExtendedNavigationProp} from '../../../utils/types';
import {useDispatch} from 'react-redux';
import {toggleInHistory} from '../../../redux/actions/listActions';

interface Props {
  search: string;
}

const SeeMore = ({search}: Props) => {
  const dispatch = useDispatch();
  const {navigate} =
    useNavigation<
      ExtendedNavigationProp<'CatalogTabs', {params: {search: string}}>
    >();

  const handlePress = () => {
    const name = parseDog(search);
    navigate('CatalogTabs', {
      screen: 'Catalog',
      params: {
        search: name,
      },
    });
    dispatch(toggleInHistory({name, img: dogs[search].img as string}));
  };

  return (
    <View style={styles.container}>
      <DefaultButton color={colors.turquoise} onPress={handlePress}>
        <Text style={styles.text}>See more</Text>
      </DefaultButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 49,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: text.s,
    fontWeight: '500',
    color: colors.white,
  },
});

export default SeeMore;
