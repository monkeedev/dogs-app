import {View, StyleSheet, FlatList, TextInput, Pressable} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Api from '../../api/requests';
import ListItem from './Components/ListItem';
import {colors} from '../../utils/constants';
import Animated, {
  event,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Icon} from 'react-native-elements';
import CustomStatusBar from '../../components/CustomStatusBar';

const ICON_SIZE = 36;
const HEADER_EXPANDED_HEIGHT = 98;
const HEADER_COLLAPSED_HEIGHT = 42;

const renderItem = (uri: string, idx: number) => {
  return <ListItem uri={uri} idx={idx} />;
};

const CatalogScreen = () => {
  const [breed, setBreed] = useState('');
  const [dogsList, setDogsList] = useState<string[]>([]);

  const searchBarHeight = useSharedValue(HEADER_EXPANDED_HEIGHT);
  const searchBarStyle = useAnimatedStyle(() => ({
    height: withTiming(searchBarHeight.value, {duration: 300}),
  }));

  // useAnima

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

  useEffect(() => {
    fetchDogsRef.current('', 10).then(res => {
      setDogsList(Array.isArray(res.message) ? res.message : [res.message]);
    });
  }, []);

  return (
    <View style={styles.container}>
      <CustomStatusBar bg={colors.turquoise} barStyle={'light-content'} />
      <Animated.View style={[styles.searchBarOuter, searchBarStyle]}>
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
        keyExtractor={(_, idx) => `Dog_${idx}`}
        contentContainerStyle={styles.list}
        renderItem={({item, index}) => renderItem(item, index)}
        bounces={false}
        scrollEventThrottle={16}
        // onScroll={}
        // renderScrollComponent={(props) => <Animated.ScrollView {...props} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.turquoise,
  },
  searchBarOuter: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    justifyContent: 'flex-end',
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
});

export default CatalogScreen;
