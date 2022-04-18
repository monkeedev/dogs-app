import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainStyles} from '../../assets/styles/MainStyles';
import {Loading} from '../../components';
import {ClearTextButton, FakeInputButton} from '../../components/buttons';
import {SearchInput} from '../../components/inputs';
import {GalleryList} from '../../components/lists';
import {GalleryListWrapper, GalleryWrapper} from '../../components/wrappers';
import {fetchDogsList} from '../../redux/actions/listActions';
import {getDogsCatalog} from '../../redux/rootSelector';
import {colors, text} from '../../utils/constants';
import {restoreCacheFromLists} from '../../utils/helpers/cache';
import {RootStackParamList} from '../Navigator/utils/routes';

export const CatalogScreen = () => {
  const isFocused = useIsFocused();
  const {navigate} =
    useNavigation<NavigationProp<RootStackParamList, 'Search'>>();
  const navState = useNavigationState(state => state);
  const route = useRoute<RouteProp<RootStackParamList, 'CatalogTabs'>>();

  const dispatch = useDispatch();
  const {list} = useSelector(getDogsCatalog);

  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);

  const restoreImages = useCallback(async () => {
    const wasRestored = await restoreCacheFromLists(list.data);

    if (wasRestored) {
      setLoading(false);
    }
  }, [useIsFocused]);

  useEffect(() => {
    dispatch(fetchDogsList('', false, true));
  }, []);

  useEffect(() => {
    if (route.params?.search) {
      setSearch(route.params?.search);
      dispatch(fetchDogsList(route.params?.search, true, true));
    }
  }, [route.params?.search]);

  useEffect(() => {
    if (isFocused) {
      restoreImages();
    }

    return () => {
      setLoading(true);
    };
  }, [isFocused]);

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
    <GalleryWrapper>
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

      <GalleryListWrapper>
        {list.data.length === 0 || isLoading ? (
          <Loading size={'large'} />
        ) : (
          <GalleryList
            images={list.data}
            isLoading={list.loading}
            onEndReached={handleEndReached}
          />
        )}
      </GalleryListWrapper>
    </GalleryWrapper>
  );
};

const styles = StyleSheet.create({
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
