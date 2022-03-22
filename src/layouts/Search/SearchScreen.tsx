import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import CustomStatusBar from '../../components/CustomStatusBar';
import {colors, springConfig, text} from '../../utils/constants';
import SearchInput from '../../components/inputs/SearchInput';
import {RootStackParamList} from '../Navigator/routes';
import {MainStyles} from '../../assets/styles/MainStyles';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Api from '../../api/requests';
import EmptyList from '../../components/lists/EmptyList';

const MAX_INPUT_WIDTH = Dimensions.get('screen').width - 14;
const CLEAR_BUTTON_WIDTH = 56;
const TIMER_TIMEOUT = 1500;

const SearchScreen = () => {
  const {goBack} = useNavigation();
  const {params} = useRoute<RouteProp<RootStackParamList, 'Search'>>();

  const [isMounted, setMounted] = useState(false);
  const [search, setSearch] = useState(params.search ?? '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isEmptyListVisible, setEmptyListVisible] = useState(false);

  const idleTimerRef = useRef<any>();
  const fetchDogsListRef = useRef(async () => {
    const res = await Api.getListOfDogBreeds();
    return res;
  });

  const inputStyles = useAnimatedStyle(
    () => ({
      width: withSpring(
        interpolate(
          +isMounted,
          [0, 1],
          [MAX_INPUT_WIDTH, MAX_INPUT_WIDTH - CLEAR_BUTTON_WIDTH],
          Extrapolate.CLAMP,
        ),
        springConfig,
      ),
    }),
    [],
  );

  const handleSearch = (str: string) => {
    setSearch(str);

    clearTimeout(idleTimerRef.current);
    if (str === '') {
      setEmptyListVisible(false);
      setSuggestions([]);
    } else {
      const stringInRequest = str.split(' ').join('-');

      idleTimerRef.current = setTimeout(async () => {
        const list: string[] = await fetchDogsListRef.current();
        const filtered = list.filter(i =>
          i.toLowerCase().includes(stringInRequest.toLowerCase()),
        );

        setEmptyListVisible(filtered.length === 0);
        setSuggestions(filtered);
      }, TIMER_TIMEOUT);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={colors.turquoise}
        barStyle={'dark-content'}
      />
      <View style={styles.search}>
        <Animated.View style={[styles.inputContainer, inputStyles]}>
          <SearchInput
            value={search}
            action={handleSearch}
            isAutofocused={true}
          />
        </Animated.View>
        <Pressable onPress={goBack}>
          <View style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Cancel</Text>
          </View>
        </Pressable>
      </View>

      <View>
        {search !== '' && suggestions.length === 0 && isEmptyListVisible && (
          <EmptyList color={colors.white} />
        )}
        {suggestions.map(i => (
          <Text key={i}>{i}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.turquoise,
  },
  search: {
    ...MainStyles.rowFull,
    marginHorizontal: 7,
  },
  inputContainer: {
    marginRight: 7,
  },
  clearButton: {
    width: CLEAR_BUTTON_WIDTH,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 36,
    paddingRight: 7,
  },
  clearButtonText: {
    fontSize: text.s,
    fontWeight: '700',
  },
});

export default SearchScreen;
