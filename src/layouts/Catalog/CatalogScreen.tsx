import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ListItem from './Components/ListItem';
import {colors, text} from '../../utils/constants';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Icon} from 'react-native-elements';
import CustomStatusBar from '../../components/CustomStatusBar';
import {images} from '../../assets/images/asData';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {clearDogsList, fetchDogsList} from '../../redux/actions/listActions';
import {getDogsCatalog} from '../../redux/rootSelector';
import {parseImage} from '../../utils/functions';

const ICON_SIZE = 36;
const AVATAR_SIZE = 78;
const HEADER_EXPANDED_HEIGHT = AVATAR_SIZE + 7 * 2;

const renderItem = (uri: string, idx: number) => {
  return <ListItem uri={uri} idx={idx} />;
};

const CatalogScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {list} = useSelector(getDogsCatalog);

  const headerAddedValue = insets.top + 7 * 2;

  const [breed, setBreed] = useState('');
  const [dogsList, setDogsList] = useState<string[]>([]);

  const opacity = useSharedValue(1);
  const searchBarHeight = useSharedValue(
    HEADER_EXPANDED_HEIGHT + headerAddedValue,
  );
  const searchBarStyle = useAnimatedStyle(() => ({
    height: searchBarHeight.value,
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // searching dog breed
  const handleSearch = (str: string) => {
    dispatch(fetchDogsList(str, true, true));
  };

  // scroll handler for FlatList
  const handleScroll = useAnimatedScrollHandler({
    onScroll: e => {
      const {y} = e.contentOffset;

      searchBarHeight.value = interpolate(
        y,
        [0, HEADER_EXPANDED_HEIGHT + headerAddedValue],
        [HEADER_EXPANDED_HEIGHT + headerAddedValue, insets.top],
        Extrapolate.CLAMP,
      );

      opacity.value = interpolate(
        y,
        [0, HEADER_EXPANDED_HEIGHT + headerAddedValue],
        [1, 0],
        Extrapolate.CLAMP,
      );
    },
  });

  const handleEndReached = () => {
    if (breed) {
      dispatch(fetchDogsList(breed, true));
    } else {
      dispatch(fetchDogsList());
    }
  };

  useEffect(() => {
    dispatch(fetchDogsList('', false, true));
  }, []);

  useEffect(() => {
    setDogsList(list.data);
  }, [list]);

  return (
    <View style={styles.container}>
      <CustomStatusBar bg={colors.turquoise} barStyle={'light-content'} />
      <Animated.View style={[styles.searchBarOuter, searchBarStyle]}>
        <Animated.View style={[styles.user, opacityStyle]}>
          <Image source={{uri: images.avatar}} style={styles.userAvatar} />
          <Text style={styles.userText}>John Doe</Text>
        </Animated.View>
        <View style={styles.searchBarInner}>
          <TextInput
            style={styles.input}
            value={breed}
            placeholder={"Write dog's breed here"}
            onChangeText={setBreed}
          />
          <Pressable onPress={() => handleSearch(breed)}>
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
      </Animated.View>

      <Animated.FlatList
        data={dogsList}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => parseImage(item)}
        contentContainerStyle={styles.list}
        renderItem={({item, index}) => renderItem(item, index)}
        bounces={false}
        scrollEventThrottle={16}
        onEndReached={handleEndReached}
        onScroll={handleScroll}
        ListFooterComponent={() =>
          list.loading ? (
            <ActivityIndicator size={'small'} style={styles.indicator} />
          ) : null
        }
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
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 7,
    color: colors.white,
  },
  searchBarOuter: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  searchBarInner: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 999,
    backgroundColor: colors.lightGray,
  },
  input: {
    flex: 1,
    padding: 7,
    paddingLeft: 14,
    marginRight: 14,
    color: colors.black,
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
    borderRadius: 21,
    backgroundColor: colors.white,
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
    paddingTop: 49,
    marginBottom: 7,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 63,
    left: 7,
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
});

export default CatalogScreen;
