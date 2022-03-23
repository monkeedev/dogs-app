import {View, Text, FlatList} from 'react-native';
import React from 'react';
import EmptyList from '../../../components/lists/EmptyList';
import {colors} from '../../../utils/constants';
import {SuggestionsItem} from './SuggestionsItem';

interface Props {
  data: string[];
  value: string;
  isEmpty: boolean;
}

const renderItem = (value: string) => {
  return <SuggestionsItem value={value} />;
};

const renderEmptyComponent = (
  value: string,
  dataLength: number,
  isEmpty: boolean,
) => {
  return value !== '' && dataLength === 0 && isEmpty ? (
    <EmptyList color={colors.white} />
  ) : (
    <View />
  );
};

export const SuggestionsList = ({data, value, isEmpty}: Props) => {
  return (
    <FlatList
      data={data}
      keyExtractor={i => i}
      renderItem={({item}) => renderItem(item)}
      ListEmptyComponent={() =>
        renderEmptyComponent(value, data.length, isEmpty)
      }
    />
  );
};
