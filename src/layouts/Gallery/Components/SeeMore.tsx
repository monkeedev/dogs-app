import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTheme} from '../../../assets/theme';
import {DefaultButton} from '../../../components/buttons';
import {toggleInHistory} from '../../../redux/actions/listActions';
import {colors, dogs, text} from '../../../utils/constants';
import {parseDog} from '../../../utils/functions';
import {ExtendedNavigationProp} from '../../../utils/types';

interface Props {
  search: string;
}

export const SeeMore = ({search}: Props) => {
  const {mode} = useTheme();
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
        <Text style={{...styles.text, color: mode.card}}>See more</Text>
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
  },
});
