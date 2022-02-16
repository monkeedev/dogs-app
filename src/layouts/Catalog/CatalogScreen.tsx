import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Text,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Api from '../../api/requests';
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

const ICON_SIZE = 36;
const AVATAR_SIZE = 78;

const HEADER_EXPANDED_HEIGHT = AVATAR_SIZE * 2;
const HEADER_COLLAPSED_HEIGHT = 35;

const renderItem = (uri: string, idx: number) => {
  return <ListItem uri={uri} idx={idx} />;
};

const CatalogScreen = () => {
  const [breed, setBreed] = useState('');
  const [dogsList, setDogsList] = useState<string[]>([]);

  const searchBarHeight = useSharedValue(HEADER_EXPANDED_HEIGHT);
  const searchBarStyle = useAnimatedStyle(() => ({
    height: searchBarHeight.value,
  }));

  const opacity = useSharedValue(1);

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // ref for fetching all breeds list
  const fetchDogsRef = useRef((breed?: string, quantity?: number) =>
    Api.fetchDogs(breed, quantity),
  );

  // ref for fetching dog by breed
  const fetchDogsByBreedRef = useRef((breed: string, quantity?: number) =>
    Api.fetchDogBySubbreed(breed, quantity),
  );

  // searching dog breed
  const handleSearch = (str: string) => {
    fetchDogsByBreedRef.current(str, 10).then(res => {
      setDogsList(Array.isArray(res.message) ? res.message : [res.message]);
    });
  };

  const handleScroll = useAnimatedScrollHandler({
    onScroll: e => {
      const {y} = e.contentOffset;
      searchBarHeight.value = interpolate(
        y,
        [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
        Extrapolate.CLAMP,
      );

      opacity.value = interpolate(
        y,
        [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        [1, 0],
        Extrapolate.CLAMP,
      );
    },
  });

  useEffect(() => {
    fetchDogsRef.current('', 10).then(res => {
      setDogsList(Array.isArray(res.message) ? res.message : [res.message]);
    });
  }, []);

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

      <FlatList
        data={dogsList}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, idx) => `Dog_${idx}`}
        contentContainerStyle={styles.list}
        renderItem={({item, index}) => renderItem(item, index)}
        bounces={false}
        scrollEventThrottle={16}
        renderScrollComponent={props => (
          <Animated.ScrollView {...props} onScroll={handleScroll} />
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
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
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
});

export default CatalogScreen;
