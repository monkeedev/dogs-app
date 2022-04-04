import React, {ReactElement, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {colors} from '../../utils/constants';
import {parseImage} from '../../utils/functions';
import {renderItem} from './helpers';

interface Props {
  images: string[];
  isLoading?: boolean;
  isAnimated?: boolean;
  HeaderComponent?: ReactElement;
  FooterComponent?: ReactElement;
  EmptyComponent?: ReactElement;
  onEndReached?: () => void;
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const renderFooterComponent = (
  isLoading?: boolean,
  Component?: ReactElement,
) => {
  if (!Component) {
    return isLoading ? (
      <ActivityIndicator
        testID={'ActivityIndicator_Loading'}
        size={'small'}
        style={styles.footerComponent}
      />
    ) : (
      <View testID={'ActivityIndicator_Blank'} style={styles.footerComponent} />
    );
  } else {
    return isLoading ? (
      <ActivityIndicator
        testID={'ActivityIndicator_Loading'}
        size={'small'}
        style={styles.footerComponent}
      />
    ) : (
      Component
    );
  }
};

const GalleryList = ({
  images,
  isLoading,
  isAnimated,
  HeaderComponent,
  FooterComponent,
  EmptyComponent,
  onEndReached,
  onScroll,
}: Props) => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    if (typeof isLoading && !isLoading) {
      if (images.length > 4 && images.length < 7) {
        setData([...images, '', '']);
      } else {
        setData(images);
      }
    }
  }, [images, isLoading]);

  // Event configs
  const onScrollConfig =
    onScroll && typeof onScroll === 'function' ? {onScroll} : {};
  const onEndReachedConfig =
    onEndReached && typeof onEndReached === 'function' ? {onEndReached} : {};
  const eventsMainConfig = {
    ...onScrollConfig,
    ...onEndReachedConfig,
    scrollEventThrottle: 16,
  };

  // List[*]Component configs
  const headerComponentConfig = HeaderComponent
    ? {ListHeaderComponent: HeaderComponent}
    : {};
  const footerComponentConfig =
    isLoading || FooterComponent
      ? {
          ListFooterComponent: () =>
            renderFooterComponent(isLoading, FooterComponent),
        }
      : {};
  const emptyListConfig = EmptyComponent
    ? {ListEmptyComponent: EmptyComponent}
    : {};
  const componentsMainConfig = {
    ...headerComponentConfig,
    ...footerComponentConfig,
    ...emptyListConfig,
  };

  const config = {
    data,
    numColumns: 2,
    testID: 'GalleryList',
    showsVerticalScrollIndicator: false,
    bounces: false,
    keyExtractor: parseImage,
    contentContainerStyle: [
      styles.list,
      images.length === 0
        ? styles.emptyList
        : images.length < 7
        ? {height: '100%'}
        : {},
    ],
    renderItem: ({item, index}: {item: string; index: number}) =>
      renderItem(item, index),
    ...eventsMainConfig,
    ...componentsMainConfig,
  };

  return isAnimated ? (
    <Animated.FlatList {...config} />
  ) : (
    <FlatList {...config} />
  );
};

export default GalleryList;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 7,
    paddingTop: 7,
    paddingBottom: 49,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    backgroundColor: colors.white,
    minHeight: Dimensions.get('screen').height - 56,
  },
  emptyList: {
    flex: 1,
    paddingBottom: 0,
    justifyContent: 'center',
  },
  footerComponent: {
    paddingTop: 35,
    height: 56,
  },
});
