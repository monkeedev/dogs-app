import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {getDogsCatalog} from '../../redux/rootSelector';
import {animationConfig, colors} from '../../utils/constants';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {saveToBookmarks} from '../../redux/actions/listActions';

interface Props {
  uri: string;
  idx: number;
}

const ICON_SIZE = 35;

const ListItem = ({uri, idx}: Props) => {
  const {bookmarks} = useSelector(getDogsCatalog);
  const dispatch = useDispatch();

  const isBookmarked = bookmarks.indexOf(uri) !== -1;

  const handleSave = () => dispatch(saveToBookmarks(uri));

  const rStyle = useAnimatedStyle(() => {
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

  return (
    <View
      style={[
        styles.container,
        {
          position: 'relative',
          top: idx % 2 !== 0 ? 28 : 0,
        },
      ]}>
      {uri === '' ? null : (
        <>
          <Pressable onPress={handleSave}>
            <Animated.View style={[styles.icon, rStyle]}>
              <Icon
                type={'ionicon'}
                name={`bookmarks`}
                color={colors.white}
                size={16}
                tvParallaxProperties={false}
              />
            </Animated.View>
          </Pressable>

          <Image source={{uri}} style={styles.image} />
        </>
      )}
    </View>
  );
};

export default ListItem;

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
  },
  icon: {
    position: 'absolute',
    top: 7,
    right: 7,
    zIndex: 1,
    elevation: 1,
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
});
