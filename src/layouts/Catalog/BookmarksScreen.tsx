import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getDogsCatalog} from '../../redux/rootSelector';
import {colors, text} from '../../utils/constants';
import CustomStatusBar from '../../components/CustomStatusBar';
import {parseImage} from '../../utils/functions';
import ListItem from '../../components/lists/ListItem';
import EmptyList from '../../components/lists/EmptyList';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HEADER_EXPANDED_HEIGHT = 78 + 7 * 2;

const renderItem = (uri: string, idx: number) => {
  return <ListItem uri={uri} idx={idx} />;
};

const BookmarksScreen = () => {
  const insets = useSafeAreaInsets();
  const headerAddedValue = insets.top + 7 * 2;

  const {bookmarks} = useSelector(getDogsCatalog);
  const [data, setData] = useState<string[]>([]);

  const scrollY = useSharedValue(0);
  const headerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, HEADER_EXPANDED_HEIGHT + headerAddedValue],
      [HEADER_EXPANDED_HEIGHT + headerAddedValue, insets.top - 7],
      Extrapolate.CLAMP,
    ),
  }));

  const fontStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(
      scrollY.value,
      [0, HEADER_EXPANDED_HEIGHT + headerAddedValue],
      [text.l, text.m],
      Extrapolate.CLAMP,
    ),
  }));

  const transformStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, HEADER_EXPANDED_HEIGHT + headerAddedValue],
          [HEADER_EXPANDED_HEIGHT + headerAddedValue + 7, 0],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  // scroll handler for FlatList
  const handleScroll = useAnimatedScrollHandler({
    onScroll: e => (scrollY.value = e.contentOffset.y),
  });

  useEffect(() => {
    if (bookmarks.length > 4 && bookmarks.length < 7) {
      setData([...bookmarks, '', '']);
    } else {
      setData(bookmarks);
    }
  }, [bookmarks]);

  return (
    <View style={styles.container}>
      <CustomStatusBar bg={colors.turquoise} />

      <Animated.View style={[styles.header, headerStyle]}>
        <Animated.Text style={[styles.headerText, fontStyle]}>
          Favourites
        </Animated.Text>

        <View style={styles.headerBg} />
      </Animated.View>

      <Animated.FlatList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => parseImage(item)}
        contentContainerStyle={[
          styles.list,
          data.length === 0
            ? styles.emptyList
            : data.length <= 6
            ? {height: '100%'}
            : {},
        ]}
        style={transformStyle}
        bounces={false}
        renderItem={({item, index}) => renderItem(item, index)}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListEmptyComponent={() => <EmptyList />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.turquoise,
  },
  header: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 54,
    left: 0,
    width: '100%',
    zIndex: 1,
  },
  headerBg: {
    backgroundColor: colors.turquoise,
    zIndex: -1,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width / 2,
    bottom: 0,
    opacity: 0.75,
  },
  headerText: {
    color: colors.white,
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
    justifyContent: 'center',
  },
  indicator: {
    paddingTop: 49,
    marginBottom: 7,
  },
});

export default BookmarksScreen;
