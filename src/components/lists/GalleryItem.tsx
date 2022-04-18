import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {checkConnection} from '../../../native-modules/InternetConnectionModuleAndroid';
import {saveToBookmarks} from '../../redux/actions/listActions';
import {getDogsCatalog} from '../../redux/rootSelector';
import {
  animationConfig,
  colors,
  ErrorMessages,
  notificationRef,
} from '../../utils/constants';
import {checkImageCache} from '../../utils/helpers/cache';

interface Props {
  uri: string;
  idx: number;
}

const ICON_SIZE = 35;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const HEADER_HEIGHT = 67.33333587646484;

export const GalleryItem = ({uri, idx}: Props) => {
  const {bookmarks} = useSelector(getDogsCatalog);
  const dispatch = useDispatch();
  const {navigate} = useNavigation<any>();

  const [img, setImg] = useState('');

  const isBookmarked = bookmarks.indexOf(uri) !== -1;

  const bStyle = useAnimatedStyle(() => {
    const _active = {
      opacity: withTiming(1, animationConfig),
      backgroundColor: withTiming(colors.turquoise, animationConfig),
    };

    const _default = {
      opacity: withTiming(0.75, animationConfig),
      backgroundColor: withTiming('transparent', animationConfig),
    };

    return isBookmarked ? _active : _default;
  }, [isBookmarked]);

  const setImageSizes = useCallback((path: string, isConnected: boolean) => {
    const search = uri.slice(
      uri.indexOf('breeds') + 'breeds/'.length,
      uri.lastIndexOf('/'),
    );

    Image.getSize(
      path,
      (width, height) => {
        let w = SCREEN_WIDTH;
        let h = SCREEN_HEIGHT / 1.5;

        const ratio = w / h;
        const imageRatio = width / height;

        if (imageRatio > ratio) {
          h = SCREEN_WIDTH / imageRatio + HEADER_HEIGHT;
        }

        navigate('Gallery', {
          uri,
          search,
          img: path,
          isConnected,
          size: {w, h},
        });
      },
      err => {
        notificationRef.current?.show(ErrorMessages.Default, 'error');
      },
    );
  }, []);

  const handleSave = () => dispatch(saveToBookmarks(uri));

  const openGallery = async () => {
    const isConnected = await checkConnection();
    // const doesImageExist = await checkImagePath(uri);
    let path = img;

    // restores cache for all files
    // if (!doesImageExist) {
    //   // dispatch(restoreCacheFromLists());
    //   path = await checkImageCache(uri);
    // }

    setImageSizes(path, isConnected);
  };

  useEffect(() => {
    let isMounted = false;

    checkImageCache(uri).then(res => {
      if (!isMounted) {
        setImg(res);
      }
    });

    return () => {
      isMounted = true;
    };
  }, []);

  return typeof uri !== 'string' || uri === '' ? null : (
    <Animated.View
      testID={'DogImageListItem_View'}
      style={[
        styles.container,
        {
          position: 'relative',
          top: idx % 2 !== 0 ? 28 : 0,
        },
      ]}>
      <TouchableOpacity
        testID={'DogImageListItem_GalleryBtn'}
        activeOpacity={0.9}
        onPress={openGallery}>
        <Pressable onPress={handleSave}>
          <Animated.View
            testID={'DogImageListItem_Bookmarks'}
            style={[styles.icon, bStyle]}>
            <Icon
              type={'ionicon'}
              name={`bookmarks`}
              color={colors.white}
              size={16}
            />
          </Animated.View>
        </Pressable>

        {img !== '' ? (
          <Image
            testID={'DogImageListItem_Image'}
            source={{uri: img}}
            style={styles.image}
          />
        ) : (
          <View testID={'DogImageListItem_EmptyView'} style={styles.image} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 7,
    marginHorizontal: 7,
    minHeight: 70,
    maxWidth: Dimensions.get('screen').width / 2 - 7 * 2 - 7,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    zIndex: -1,
    backgroundColor: colors.lightGray,
  },
  icon: {
    position: 'absolute',
    top: 7,
    right: 7,
    zIndex: 1,
    elevation: 1,
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
