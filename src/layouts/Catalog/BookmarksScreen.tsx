import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {getDogsCatalog} from '../../redux/rootSelector';
import {colors, text} from '../../utils/constants';
import CustomStatusBar from '../../components/CustomStatusBar';
import {parseImage} from '../../utils/functions';
import ListItem from '../../components/lists/ListItem';
import EmptyList from '../../components/lists/EmptyList';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const HEADER_EXPANDED_HEIGHT = 78 + 7 * 2;

const renderItem = (uri: string, idx: number) => {
  return <ListItem uri={uri} idx={idx} />;
};

const BookmarksScreen = () => {
  const insets = useSafeAreaInsets();
  const {bookmarks} = useSelector(getDogsCatalog);

  const headerAddedValue = insets.top + 7 * 2;

  const headerHeight = useSharedValue(
    HEADER_EXPANDED_HEIGHT + headerAddedValue,
  );

  const hStyle = useAnimatedStyle(() => ({
    height: headerHeight.value,
  }));

  const fStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(
      headerHeight.value,
      [HEADER_EXPANDED_HEIGHT, HEADER_EXPANDED_HEIGHT + headerAddedValue],
      [text.m, text.l],
      Extrapolate.CLAMP,
    ),
  }));

  const handleScroll = useAnimatedScrollHandler({
    onScroll: e => {
      const {y} = e.contentOffset;

      headerHeight.value = interpolate(
        y,
        [0, HEADER_EXPANDED_HEIGHT + headerAddedValue],
        [HEADER_EXPANDED_HEIGHT + headerAddedValue, insets.top],
        Extrapolate.CLAMP,
      );
    },
  });

  return (
    <View style={styles.container}>
      <CustomStatusBar bg={colors.turquoise} />
      <Animated.View style={[styles.header, hStyle]}>
        <Animated.Text style={[styles.headerText, fStyle]}>
          Favourites
        </Animated.Text>
      </Animated.View>

      <Animated.FlatList
        data={bookmarks}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => parseImage(item)}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        contentContainerStyle={[
          styles.list,
          bookmarks.length === 0
            ? styles.emptyList
            : bookmarks.length <= 4
            ? {height: '100%'}
            : {},
        ]}
        renderItem={({item, index}) => renderItem(item, index)}
        bounces={false}
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
    paddingLeft: 14,
    paddingBottom: 7,
    justifyContent: 'flex-end',
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
