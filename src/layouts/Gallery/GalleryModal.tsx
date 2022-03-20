import {View, Image, ImageBackground, StyleSheet, Platform} from 'react-native';
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
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {colors, springConfig, text} from '../../utils/constants';
import Api from '../../api/requests';
import {PanGestureHandler} from 'react-native-gesture-handler';
import SeeMore from './Components/SeeMore';
import CustomStatusBar from '../../components/CustomStatusBar';

const HIGH_BORDER = 56;
const FETCH_QUANTITY = 6;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const MAX_LIST_SCROLL = 63;
const HEADER_HEIGHT = 67.33333587646484;
const PLATFORM_BORDER = Platform.select({
  ios: 14,
  android: HIGH_BORDER,
  default: 14,
});

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

      const d = [...data, ...(r.message as string[])];
      setData(d);
    } catch (err) {
      throw new Error(err as string);
    }
  });

  const panScrollY = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler(
    {
      onStart: (_, ctx: any) => {
        ctx.startY = panScrollY.value;
      },
      onActive: (event, ctx) => {
        panScrollY.value = ctx.startY - event.translationY;

        if (panScrollY.value >= size.height) {
          scrollY.value = interpolate(
            panScrollY.value,
            [size.height, size.height + MAX_LIST_SCROLL],
            [0, -MAX_LIST_SCROLL],
            Extrapolate.CLAMP,
          );
        } else {
          scrollY.value = 0;
        }
      },
    },
    [size.height],
  );

  const backgroundColor = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        panScrollY.value,
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
            panScrollY.value,
            [0, size.height],
            [-100, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }),
    [size.height],
  );

  const panTransformStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: interpolate(
            panScrollY.value,
            [0, size.height],
            [size.height - HEADER_HEIGHT, PLATFORM_BORDER],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }),
    [size.height],
  );

  const listTransformStyle = useAnimatedStyle(() => ({
    transform: [{translateY: scrollY.value}],
  }));

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
          h = SCREEN_WIDTH / imageRatio + HEADER_HEIGHT;
        }

        setSize({width: w, height: Math.min(SCREEN_HEIGHT, h)});
      }
    });

    if (params.search) {
      fetchDogs.current(params.search);
    }

    return () => {
      isMounted = false;
      panScrollY.value = withSpring(0, springConfig);
      scrollY.value = withSpring(0, springConfig);
      setData([]);
    };
  }, [params.uri]);

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />

      <View style={styles.header}>
        <View style={Platform.OS === 'android' ? styles.headerButtons : null}>
          <GoBack />

          <View style={styles.goBackContainer}>
            <Animated.Text style={[styles.goBackText, goBackTransform]}>
              Go back
            </Animated.Text>
          </View>
        </View>

        <Animated.View
          style={[backgroundColor, styles.background]}
          pointerEvents={'none'}>
          <ImageBackground source={{uri: params.uri}} style={{...size}} />
        </Animated.View>
      </View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[panTransformStyle, styles.panGestureStyle]}>
          <Animated.FlatList
            data={data}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            style={listTransformStyle}
            scrollEnabled={false}
            keyExtractor={parseImage}
            contentContainerStyle={styles.list}
            renderItem={({item, index}) => renderItem(item, index)}
            bounces={false}
            ListHeaderComponent={() => <ListHeader uri={params.uri} />}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  header: {
    position: 'absolute',
  },
  headerButtons: {
    position: 'relative',
    top: 28,
  },
  background: {
    zIndex: -1,
  },
  list: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    paddingBottom: 7 * 18,
    paddingHorizontal: 7,
    height: '100%',
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
  panGestureStyle: {
    overflow: 'hidden',
  },
});

export default GalleryModal;
