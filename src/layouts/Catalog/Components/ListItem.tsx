import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {getDogsCatalog} from '../../../redux/rootSelector';
import {colors} from '../../../utils/constants';

interface Props {
  uri: string;
  idx: number;
}

const ICON_SIZE = 42;

// activeName: 'bookmarks',
// defaultName: 'bookmarks-outline',

const ListItem = ({uri, idx}: Props) => {
  const {bookmarks} = useSelector(getDogsCatalog);

  const isBookmarked = bookmarks.indexOf(uri) !== -1;

  return (
    <View
      style={[
        styles.container,
        {
          position: 'relative',
          top: idx % 2 !== 0 ? 28 : 0,
        },
      ]}>
      <Pressable>
        <Icon
          type={'ionicon'}
          name={`bookmarks`}
          color={isBookmarked ? colors.white : 'transparent'}
          containerStyle={styles.icon}
        />
      </Pressable>

      <Image source={{uri}} style={styles.image} />
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 7,
    marginHorizontal: 7,
  },
  image: {
    width: '100%',
    maxWidth: Dimensions.get('screen').width / 2 - 7 * 2 - 7,
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
  },
});
