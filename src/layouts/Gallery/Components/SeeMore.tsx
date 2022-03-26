import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import DefaultButton from '../../../components/buttons/DefaultButton';
import {colors, ExtendedNavigationProp, text} from '../../../utils/constants';
import {useNavigation} from '@react-navigation/native';

interface Props {
  search: string;
}

const SeeMore = ({search}: Props) => {
  const {navigate} =
    useNavigation<
      ExtendedNavigationProp<'CatalogTabs', {params: {search: string}}>
    >();

  const handlePress = () => {
    navigate('CatalogTabs', {
      screen: 'Catalog',
      params: {
        search,
      },
    });
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
