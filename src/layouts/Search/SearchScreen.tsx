import {View, StyleSheet} from 'react-native';
import React, {useRef, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import CustomStatusBar from '../../components/CustomStatusBar';
import {colors, ErrorMessages, notificationRef} from '../../utils/constants';
import {RootStackParamList} from '../Navigator/routes';
import Api from '../../api/requests';
import {SuggestionsList} from './Components/SuggestionsList';
import {SearchBar} from './Components/SearchBar';

const TIMER_TIMEOUT = 1500;

const SearchScreen = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'Search'>>();

  const [search, setSearch] = useState(params.search ?? '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isEmptyListVisible, setEmptyListVisible] = useState(false);

  const idleTimerRef = useRef<any>();
  const fetchDogsListRef = useRef(async () => {
    const res = await Api.getListOfDogBreeds();
    return res;
  });

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
      <SuggestionsList
        value={search}
        data={suggestions}
        isEmpty={isEmptyListVisible}
      />
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
