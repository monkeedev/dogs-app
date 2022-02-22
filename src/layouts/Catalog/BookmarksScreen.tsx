import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {getDogsCatalog} from '../../redux/rootSelector';

const BookmarksScreen = () => {
  const list = useSelector(getDogsCatalog);

  console.log('@bookmarks', list);

  return (
    <View style={{marginTop: 50}}>
      <Text>bookmarked pictures: {0}</Text>
    </View>
  );
};

export default BookmarksScreen;
