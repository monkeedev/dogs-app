import {FlatList} from 'react-native';
import React from 'react';
import {DogItem} from '../../../redux/types/listTypes';
import {HistoryItem} from './HistoryItem';

interface Props {
  data: DogItem[];
}

const renderItem = (value: DogItem) => {
  return <HistoryItem value={value} />;
};

export const HistoryList = ({data}: Props) => {
  return (
    <FlatList
      data={data.reverse().slice(0, 10)}
      keyExtractor={i => i.name}
      renderItem={({item}) => renderItem(item)}
    />
  );
};
