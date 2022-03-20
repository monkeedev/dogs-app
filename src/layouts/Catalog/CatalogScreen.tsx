import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ListItem from '../../components/lists/ListItem';
import {colors, text} from '../../utils/constants';
import {Icon} from 'react-native-elements';
import CustomStatusBar from '../../components/CustomStatusBar';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDogsList} from '../../redux/actions/listActions';
import {getDogsCatalog} from '../../redux/rootSelector';
import {parseImage} from '../../utils/functions';

const ICON_SIZE = 36;
const AVATAR_SIZE = 78;

const renderItem = (uri: string, idx: number) => {
  return <ListItem uri={uri} idx={idx} />;
};
const CatalogScreen = () => {
  const dispatch = useDispatch();
  const {list} = useSelector(getDogsCatalog);

  const [search, setSearch] = useState('');
  const [data, setData] = useState<string[]>([]);

  // searching dog breed
  const handleSearch = (str: string) => {
    dispatch(fetchDogsList(str, true, true));
  };

  const handleEndReached = useCallback(() => {
    if (search) {
      dispatch(fetchDogsList(search, true));
    } else {
      dispatch(fetchDogsList());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDogsList('', false, true));
  }, []);

  useEffect(() => {
    if (!list.loading) {
      if (list.data.length > 4 && list.data.length < 7) {
        setData([...list.data, '', '']);
      } else {
        setData(list.data);
      }
    }
  }, [list]);

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={colors.turquoise}
        barStyle={'dark-content'}
      />
      <View style={styles.searchBarInner}>
        <TextInput
          style={styles.input}
          value={search}
          placeholder={"Write dog's breed here"}
          onChangeText={setSearch}
        />
        <Pressable onPress={() => handleSearch(search)}>
          <Icon
            size={21}
            name={'search'}
            type={'ionicon'}
            style={styles.icon}
            color={colors.black}
            tvParallaxProperties={false}
          />
        </Pressable>
      </View>

      <FlatList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={parseImage}
        contentContainerStyle={[
          styles.list,
          data.length === 0
            ? styles.emptyList
            : data.length < 7
            ? {height: '100%'}
            : {},
        ]}
        renderItem={({item, index}) => renderItem(item, index)}
        bounces={false}
        onEndReached={handleEndReached}
        ListFooterComponent={() => (
          <ActivityIndicator
            size={'small'}
            style={styles.indicator}
            hidesWhenStopped={list.loading}
          />
        )}
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
  searchBarOuter: {
    paddingHorizontal: 14,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 54,
    left: 0,
    width: '100%',
    zIndex: 1,
  },
  searchBarInner: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: colors.white,
    marginVertical: 7,
    marginHorizontal: 7,
  },
  searchBarBg: {
    zIndex: -1,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    bottom: 0,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    padding: 7,
    paddingLeft: 14,
    marginRight: 14,
    color: colors.black,
    height: 36,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: 7,
    paddingTop: 7,
    paddingBottom: 49,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    backgroundColor: colors.white,
  },
  emptyList: {
    flex: 1,
    paddingBottom: 0,
    justifyContent: 'center',
  },
  user: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
  },
  userAvatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderWidth: 3,
    borderRadius: AVATAR_SIZE,
    borderColor: colors.white,
  },
  userText: {
    marginTop: 7,
    fontSize: text.m,
    fontWeight: '900',
    color: colors.white,
  },
  indicator: {
    paddingTop: 35,
  },
});

export default CatalogScreen;
