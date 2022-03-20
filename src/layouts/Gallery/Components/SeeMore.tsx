import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import DefaultButton from '../../../components/buttons/DefaultButton';
import {colors, text} from '../../../utils/constants';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchDogsList} from '../../../redux/actions/listActions';

interface Props {
  search: string;
}

const SeeMore = ({search}: Props) => {
  const dispatch = useDispatch();
  const {goBack, navigate} = useNavigation();

  const handlePress = () => {
    console.log('@foo');
    // goBack();
    // navigate('CatalogTabs');
    // dispatch(fetchDogsList(search, true, true));
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
