import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import CustomStatusBar from '../../components/CustomStatusBar';
import {colors} from '../../utils/constants';
import SearchInput from '../../components/inputs/SearchInput';
import {RootStackParamList} from '../Navigator/routes';

const SearchScreen = () => {
  const {goBack} = useNavigation();
  const {params} = useRoute<RouteProp<RootStackParamList, 'Search'>>();
  return (
    <View>
      <CustomStatusBar
        backgroundColor={colors.turquoise}
        barStyle={'dark-content'}
      />
      <SearchInput value={params.search ?? ''} />
      <View style={styles.fakeContainer}>
        <Pressable onPress={goBack}>
          <Text>Go Back</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fakeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
