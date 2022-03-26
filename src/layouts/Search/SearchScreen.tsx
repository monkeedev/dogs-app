import {View, StyleSheet, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomStatusBar from '../../components/CustomStatusBar';
import {colors, ErrorMessages, notificationRef} from '../../utils/constants';
import Api from '../../api/requests';
import {SuggestionsList} from './Components/SuggestionsList';
import {SearchBar} from './Components/SearchBar';
import {useSelector} from 'react-redux';
import {getDogsCatalog} from '../../redux/rootSelector';
import {HistoryList} from './Components/HistoryList';
import {DogItem} from '../../redux/types/listTypes';

const TIMER_TIMEOUT = 1500;

export const SearchContext = React.createContext('');

const SearchScreen = () => {
  const {history} = useSelector(getDogsCatalog);

  const idleTimerRef = useRef<any>();
  const fetchDogsListRef = useRef(async () => {
    const res = await Api.getListOfDogBreeds();
    return res;
  });

  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<DogItem[]>([]);
  const [isEmptyListVisible, setEmptyListVisible] = useState(false);

  useEffect(() => {
    return () => {
      clearTimeout(idleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (history && typeof history !== 'undefined') {
      setFilteredHistory(
        history.filter(i => i.name.includes(search.toLowerCase())),
      );
    }
  }, [search, history]);

  const handleSearch = (str: string) => {
    setSearch(str);

    clearTimeout(idleTimerRef.current);
    if (str === '') {
      setEmptyListVisible(false);
      setSuggestions([]);
    } else {
      let stringInRequest = str.toLowerCase().trim().split(' ');

      idleTimerRef.current = setTimeout(async () => {
        try {
          const list: string[] = await fetchDogsListRef.current();
          let stringInRequestFormatted = stringInRequest.join('-');

          let filtered = list.filter(i => i.includes(stringInRequestFormatted));

          if (filtered.length === 0) {
            stringInRequestFormatted = stringInRequest[0];

            filtered = list.filter(i => i.includes(stringInRequestFormatted));
          }

          setEmptyListVisible(filtered.length === 0);
          setSuggestions(filtered);
        } catch (error) {
          notificationRef.current?.show(ErrorMessages.Default, 'error');
        }
      }, TIMER_TIMEOUT);
    }
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={colors.turquoise}
        barStyle={'dark-content'}
      />

      <SearchBar value={search} action={handleSearch} />
      <SearchContext.Provider value={search}>
        {search === '' || filteredHistory.length > 0 ? (
          <HistoryList data={filteredHistory} />
        ) : (
          <SuggestionsList
            value={search}
            data={suggestions}
            isEmpty={isEmptyListVisible}
          />
        )}
      </SearchContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.turquoise,
  },
});

export default SearchScreen;
