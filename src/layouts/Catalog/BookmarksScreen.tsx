import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getDogsCatalog} from '../../redux/rootSelector';
import {colors, text} from '../../utils/constants';
import CustomStatusBar from '../../components/CustomStatusBar';
import {parseImage} from '../../utils/functions';
import DogImageListItem from '../../components/lists/DogImageListItem';
import EmptyList from '../../components/lists/EmptyList';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {MainStyles} from '../../assets/styles/MainStyles';

const renderItem = (uri: string, idx: number) => {
  return <DogImageListItem uri={uri} idx={idx} />;
};

const BookmarksScreen = () => {
  const {bookmarks} = useSelector(getDogsCatalog);
  const [data, setData] = useState<string[]>([]);

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

  // scroll handler for FlatList
  useEffect(() => {
    if (bookmarks.length > 4 && bookmarks.length < 7) {
      setData([...bookmarks, '', '']);
    } else {
      setData(bookmarks);
    }
  }, [bookmarks]);

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={colors.turquoise}
        barStyle={'dark-content'}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Favourites:</Text>

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

      <Animated.FlatList
        testID={'BookmarksScreen_List'}
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={parseImage}
        contentContainerStyle={[
          styles.list,
          data.length === 0
            ? styles.emptyList
            : data.length <= 6
            ? {height: '100%'}
            : {},
        ]}
        bounces={false}
        renderItem={({item, index}) => renderItem(item, index)}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListEmptyComponent={EmptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.turquoise,
    position: 'relative',
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
    marginVertical: 7,
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

export default BookmarksScreen;
