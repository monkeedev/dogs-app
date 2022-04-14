import React from 'react';
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
import {CustomStatusBar} from '../../components';
import {EmptyList, GalleryList} from '../../components/lists';
import {Title} from '../../components/texts';
import {getDogsCatalog} from '../../redux/rootSelector';
import {colors, text} from '../../utils/constants';

export const BookmarksScreen = () => {
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

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
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

      <View style={styles.galleryContainer}>
        <GalleryList
          images={bookmarks}
          isAnimated={true}
          onScroll={handleScroll}
          EmptyComponent={<EmptyList />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.turquoise,
    position: 'relative',
  },
  galleryContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
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
  indicator: {
    paddingTop: 49,
    marginBottom: 7,
  },
});
