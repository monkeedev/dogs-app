import {View, ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import GoBack from '../../components/GoBack';
import {RootStackParamList} from '../Navigator/routes';
import {ListHeader} from './Components/ListHeader';
import {isAndroid} from '../../utils/functions';
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
import GalleryList from '../../components/lists/GalleryList';
import Loading from '../../components/Loading';

const FETCH_QUANTITY = 4;
const HEADER_HEIGHT = 67.33333587646484;
// const LOADING_STYLE = isAndroid() ? 'loadingAndroid' : 'loadingIOS';
const PLATFORM_BORDER = isAndroid() ? 28 : 14;

const GalleryModal = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'Gallery'>>();

  const [data, setData] = useState<string[]>([]);
  const [size, setSize] = useState<{width: number; height: number}>({
    width: params.size.w,
    height: params.size.h,
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
      onActive: (evt, ctx) => {
        panScrollY.value = ctx.startY - evt.translationY;

        if (panScrollY.value <= 0) {
          panScrollY.value = 0;
        } else {
          if (panScrollY.value >= size.height) {
            panScrollY.value = size.height;
          } else {
            scrollY.value = 0;
          }
        }
      },
      onEnd: evt => {
        if (evt.translationY < 0) {
          panScrollY.value = withSpring(size.height, springConfig);
        } else {
          panScrollY.value = withSpring(0, springConfig);
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

  const panTransformStyle = useAnimatedStyle(() => {
    return {
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
    };
  }, [size.height]);

  // set image size
  useEffect(() => {
    setSize({width: params.size.w, height: params.size.h});

    if (params.isConnected && params.search) {
      fetchDogs.current(params.search);
    }

    return () => {
      panScrollY.value = withSpring(0, springConfig);
      scrollY.value = withSpring(0, springConfig);
      setData([]);
    };
  }, [params.uri]);

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />

      <View style={styles.header}>
        <View style={isAndroid() ? styles.headerButtons : null}>
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
          <ImageBackground source={{uri: params.img}} style={{...size}} />
        </Animated.View>
      </View>

      <PanGestureHandler
        testID={'GalleryModal_GestureHandler'}
        onGestureEvent={gestureHandler}>
        <Animated.View style={[panTransformStyle, styles.panGestureStyle]}>
          {!params.isConnected ? (
            <View
              style={{
                borderRadius: 14,
                overflow: 'hidden',
              }}>
              <ListHeader uri={params.uri} />
              <View style={styles.loadingList}>
                <Loading size={'large'} />
              </View>
            </View>
          ) : (
            <GalleryList
              images={data}
              HeaderComponent={<ListHeader uri={params.uri} />}
              FooterComponent={
                data.length >= 4 ? (
                  <SeeMore search={params.search ?? ''} />
                ) : (
                  <View />
                )
              }
            />
          )}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: Dimensions.get('screen').height,
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
    flex: 1,
    // borderRadiusTopLeft: 14,
    // borderRadiusTopRight: 14,
    overflow: 'hidden',
  },
  loadingList: {
    height: Dimensions.get('screen').height / 2,
    backgroundColor: colors.white,
  },
});

export default GalleryModal;
