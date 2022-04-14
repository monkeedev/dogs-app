import React from 'react';
import {FlatList} from 'react-native';
import {HistoryItem} from '.';
import {DogItem} from '../../redux/types/listTypes';

interface Props {
  data: DogItem[];
}

const renderItem = (value: DogItem) => {
  return <HistoryItem value={value} />;
};

export const HistoryList = ({data}: Props) => {
  return (
    <FlatList
      data={data.slice(0, 10)}
      keyExtractor={i => i.name}
      renderItem={({item}) => renderItem(item)}
    />
  );
};
