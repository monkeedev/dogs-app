import {View, Image, ImageBackground, StyleSheet, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import GoBack from '../../components/GoBack';
import {RootStackParamList} from '../Navigator/routes';
import {ListHeader} from './Components/ListHeader';
import {parseImage} from '../../utils/functions';
import ListItem from '../../components/lists/ListItem';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {colors, text} from '../../utils/constants';
import Api from '../../api/requests';

const HIGH_BORDER = 35 + 21;
const FETCH_QUANTITY = 12;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const renderItem = (uri: string, idx: number) => {
  return <ListItem uri={uri} idx={idx} />;
};

const GalleryModal = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'Gallery'>>();

  const [data, setData] = useState<string[]>([]);
  const [size, setSize] = useState<{width: number; height: number}>({
    width: 0,
    height: 0,
  });

  const fetchDogs = useRef(async (s: string) => {
    try {
      const r = await Api.fetchDogBySubbreed(s, FETCH_QUANTITY);

      setData(r.message as string[]);
    } catch (err) {
      throw new Error(err as string);
    }
  });

  const scrollY = useSharedValue(0);

  // scroll handler for FlatList
  const handleScroll = useAnimatedScrollHandler({
    onScroll: e => (scrollY.value = e.contentOffset.y),
  });

  const backgroundColor = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        scrollY.value,
        [0, size.height],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    }),
    [size.height],
  );

  const goBackTransform = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: interpolate(
            scrollY.value,
            [0, size.height],
            [-100, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }),
    [size.height],
  );

  const transformStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, size.height],
            [size.height - 14, HIGH_BORDER],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }),
    [size.height],
  );

  // set image size
  useEffect(() => {
    let isMounted = true;

    Image.getSize(params.uri, (width, height) => {
      if (isMounted) {
        let w = SCREEN_WIDTH;
        let h = SCREEN_HEIGHT / 1.5;

        const ratio = w / h;
        const imageRatio = width / height;

        if (imageRatio > ratio) {
          h = SCREEN_WIDTH / imageRatio;
        }

        setSize({width: w, height: Math.min(SCREEN_HEIGHT, h)});
      }
    });

    if (params.search) {
      fetchDogs.current(params.search);
    }

    return () => {
      isMounted = false;
      setData([]);
    };
  }, [params.uri]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBack />

        <View style={styles.goBackContainer}>
          <Animated.Text style={[styles.goBackText, goBackTransform]}>
            Go back
          </Animated.Text>
        </View>

        <Animated.View style={backgroundColor}>
          <ImageBackground source={{uri: params.uri}} style={{...size}} />
        </Animated.View>
      </View>

      <Animated.FlatList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={transformStyle}
        onScroll={handleScroll}
        keyExtractor={parseImage}
        contentContainerStyle={styles.list}
        renderItem={({item, index}) => renderItem(item, index)}
        bounces={false}
        ListHeaderComponent={() => <ListHeader uri={params.uri} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    position: 'absolute',
  },
  list: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    paddingBottom: 7 * 18,
  },
  goBackContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 18,
    left: 35 + 14 * 1.5,
    zIndex: 1,
    overflow: 'hidden',
  },
  goBackText: {
    fontSize: text.m,
    fontWeight: '900',
    color: colors.darkGray,
  },
});

export default GalleryModal;
