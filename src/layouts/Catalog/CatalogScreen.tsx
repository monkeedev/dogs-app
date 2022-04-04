import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, text} from '../../utils/constants';
import CustomStatusBar from '../../components/CustomStatusBar';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDogsList} from '../../redux/actions/listActions';
import {getDogsCatalog} from '../../redux/rootSelector';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '../Navigator/routes';
import FakeInputButton from '../../components/buttons/FakeInputButton';
import SearchInput from '../../components/inputs/SearchInput';
import GalleryList from '../../components/lists/GalleryList';

const CatalogScreen = () => {
  const dispatch = useDispatch();
  const {navigate} =
    useNavigation<NavigationProp<RootStackParamList, 'Search'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CatalogTabs'>>();
  const {list} = useSelector(getDogsCatalog);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchDogsList('', false, true));
  }, []);

  useEffect(() => {
    if (route.params?.search) {
      setSearch(route.params?.search);
      dispatch(fetchDogsList(route.params?.search, true, true));
    }
  }, [route]);

  const handleEndReached = () => {
    if (search) {
      dispatch(fetchDogsList(search, true));
    } else {
      dispatch(fetchDogsList());
    }
  };

  const redirectToSearch = () => {
    navigate('Search', {search});
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={colors.turquoise}
        barStyle={'dark-content'}
      />
      <FakeInputButton action={redirectToSearch}>
        <View style={styles.searchBar}>
          <SearchInput
            value={search}
            isDisabled={true}
            placeholder={"Write dog's breed here"}
          />
        </View>
      </FakeInputButton>

      <GalleryList
        images={list.data}
        isLoading={list.loading}
        onEndReached={handleEndReached}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.turquoise,
  },
  text: {
    fontSize: text.l,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 7,
    color: colors.white,
  },
  searchBar: {
    marginHorizontal: 7,
  },
});

export default CatalogScreen;
