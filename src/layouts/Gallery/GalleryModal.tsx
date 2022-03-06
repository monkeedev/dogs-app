import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import GoBack from '../../components/GoBack';
import {colors, text} from '../../utils/constants';
import DefaultButton from '../../components/buttons/DefaultButton';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {getDogsCatalog} from '../../redux/rootSelector';
import DownloadButton from '../../components/buttons/DownloadButton';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../Navigator/routes';
import {saveToBookmarks} from '../../redux/actions/listActions';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const GalleryModal = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'Gallery'>>();
  const {bookmarks} = useSelector(getDogsCatalog);
  const dispatch = useDispatch();

  const isBookmark = bookmarks.indexOf(params.uri) !== -1;

  const [size, setSize] = useState<{width: number; height: number}>({
    width: 0,
    height: 0,
  });

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

    return () => {
      isMounted = false;
    };
  }, []);

  const handleToogleBookmark = () => dispatch(saveToBookmarks(params.uri));

  return (
    <View style={styles.container}>
      <View>
        <GoBack />
        <ImageBackground source={{uri: params.uri}} style={{...size}} />
      </View>

      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Same pictures</Text>

          <View style={styles.headerButtons}>
            <DefaultButton
              onPress={handleToogleBookmark}
              color={isBookmark ? colors.turquoise : colors.lightGray}>
              <Icon
                type={'ionicon'}
                name={`bookmarks`}
                color={isBookmark ? colors.white : colors.turquoise}
                size={18}
                tvParallaxProperties={false}
              />
            </DefaultButton>
            <DownloadButton uri={params.uri} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  info: {
    borderRadius: 14,
    position: 'relative',
    top: -14,
    backgroundColor: colors.white,
    paddingLeft: 14,
    paddingRight: 11.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  headerText: {
    fontSize: text.m,
    fontWeight: '900',
    paddingVertical: 14,
    color: colors.darkGray,
  },
  headerButtons: {
    flexDirection: 'row',
  },
});

export default GalleryModal;
