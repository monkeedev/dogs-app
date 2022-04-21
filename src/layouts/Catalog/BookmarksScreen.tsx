import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {MainStyles} from '../../assets/styles/MainStyles';
import {Loading} from '../../components';
import {EmptyList, GalleryList} from '../../components/lists';
import {Title} from '../../components/texts';
import {GalleryListWrapper, GalleryWrapper} from '../../components/wrappers';
import {getDogsCatalog} from '../../redux/rootSelector';
import {colors, text} from '../../utils/constants';
import {restoreCacheFromLists} from '../../utils/helpers/cache';

export const BookmarksScreen = () => {
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);

  const {bookmarks} = useSelector(getDogsCatalog);
  const scrollY = useSharedValue(0);

  const counterStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 49], [0, 1], Extrapolate.CLAMP),
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, 49],
          [10, 0],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = e.nativeEvent.contentOffset.y;
  };

  const restoreImages = useCallback(async () => {
    const wasRestored = await restoreCacheFromLists(bookmarks);

    if (wasRestored) {
      setLoading(false);
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      restoreImages();
    }

    return () => {
      setLoading(true);
    };
  }, [isFocused]);

  return (
    <GalleryWrapper>
      <View style={styles.header}>
        <Title text={'Favourites:'} color={colors.white} />

        <View style={styles.counterContainer}>
          <Animated.View style={[styles.counter, counterStyle]}>
            <Text style={[styles.headerText, {fontSize: text.s}]}>
              {bookmarks.length}
            </Text>
            <Icon
              name={'bookmarks'}
              type={'ionicon'}
              size={text.m}
              color={colors.white}
            />
          </Animated.View>
        </View>
      </View>

      <GalleryListWrapper>
        <GalleryList
          images={bookmarks}
          isAnimated={true}
          onScroll={handleScroll}
          EmptyComponent={<EmptyList />}
        />

        {isLoading ? <Loading size={'large'} isFullScreen={true} /> : <></>}
      </GalleryListWrapper>
    </GalleryWrapper>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    width: 49,
    overflow: 'hidden',
  },
  counter: {
    ...MainStyles.rowFull,
  },
  header: {
    ...MainStyles.rowFull,
    alignItems: 'flex-end',
    marginTop: 9,
    marginBottom: 7,
    marginHorizontal: 14,
  },
  headerText: {
    color: colors.white,
    fontSize: text.m,
    fontWeight: '900',
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
    paddingTop: Dimensions.get('screen').height / 4,
  },
});
