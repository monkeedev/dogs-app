import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainStyles} from '../../assets/styles/MainStyles';
import ClearTextButton from '../../components/buttons/ClearTextButton';
import FakeInputButton from '../../components/buttons/FakeInputButton';
import CustomStatusBar from '../../components/CustomStatusBar';
import SearchInput from '../../components/inputs/SearchInput';
import {GalleryList} from '../../components/lists';
import Loading from '../../components/Loading';
import {fetchDogsList} from '../../redux/actions/listActions';
import {getDogsCatalog} from '../../redux/rootSelector';
import {colors, text} from '../../utils/constants';
import {RootStackParamList} from '../Navigator/routes';

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

  const handleEndReached = useCallback(() => {
    if (search) {
      dispatch(fetchDogsList(search, true));
    } else {
      dispatch(fetchDogsList());
    }
  }, [dispatch, search]);

  const redirectToSearch = () => {
    navigate('Search', {search});
  };

  const clearSearch = () => {
    setSearch('');
    dispatch(fetchDogsList('', false, true));
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View style={MainStyles.pr}>
        <FakeInputButton onPress={redirectToSearch}>
          <View style={styles.searchBar}>
            <SearchInput
              value={search}
              isDisabled={true}
              placeholder={"Write dog's breed here"}
            />
          </View>
        </FakeInputButton>
        {search.length > 0 && (
          <View style={styles.clearButton}>
            <ClearTextButton onPress={clearSearch} />
          </View>
        )}
      </View>

      <View style={styles.galleryContainer}>
        {list.data.length === 0 ? (
          <Loading size={'large'} />
        ) : (
          <GalleryList
            images={list.data}
            isLoading={list.loading}
            onEndReached={handleEndReached}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.turquoise,
  },
  galleryContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
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
  clearButton: {
    position: 'absolute',
    right: 7,
    top: 7,
    zIndex: 1,
    elevation: 1,
  },
});

export default CatalogScreen;
