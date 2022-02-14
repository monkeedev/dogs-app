import {View, Text, Image, ImageSourcePropType, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Api from '../../api/requests';
import {DogApiResponse} from '../../api/interfaces';
import List from './Components/List';
import SearchBar from './Components/SearchBar';

const CatalogScreen = () => {
  const [breed, setBreed] = useState('');
  const [dogsList, setDogsList] = useState<string[]>([]);

  const fetchDogsRef = useRef((breed?: string, quantity?: number) =>
    Api.fetchDogs(breed, quantity),
  );

  const fetchDogsByBreedRef = useRef((breed: string, quantity?: number) =>
    Api.fetchDogBySubbreed(breed, quantity),
  );

  const handleSearch = (str: string) => {
    const isMoreThanOneWord = str.split(' ').length > 1;

    if (isMoreThanOneWord) {
      fetchDogsByBreedRef.current(str, 10).then(res => {
        setDogsList(Array.isArray(res.message) ? res.message : [res.message]);
      });
    } else {
      fetchDogsRef.current(str, 10).then(res => {
        setDogsList(Array.isArray(res.message) ? res.message : [res.message]);
      });
    }
  };

  useEffect(() => {
    fetchDogsRef.current('', 10).then(res => {
      setDogsList(Array.isArray(res.message) ? res.message : [res.message]);
    });
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar value={breed} onChange={setBreed} onSearch={handleSearch} />
      <List data={dogsList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
  },
});

export default CatalogScreen;
