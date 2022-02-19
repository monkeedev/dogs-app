import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Props {
  uri: string;
  idx: number;
}

const ListItem = ({uri, idx}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          position: 'relative',
          top: idx % 2 !== 0 ? 28 : 0,
        },
      ]}>
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
  },
});
