import React from 'react';
import DogImageListItem from './DogImageListItem';

export const renderItem = (uri: string, idx: number) => {
  return <DogImageListItem uri={uri} idx={idx} />;
};
