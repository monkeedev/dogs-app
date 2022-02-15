import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import ListItem from './ListItem';

interface Props {
  data: string[];
}

const renderItem = (uri: string, idx: number) => {
  return <ListItem uri={uri} idx={idx} />;
};

const List = ({data}: Props) => {
  return (
    <FlatList
      data={data}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, idx) => `Dog_${idx}`}
      contentContainerStyle={{paddingBottom: 21}}
      renderItem={({item, index}) => renderItem(item, index)}
    />
  );
};

export default List;
