import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HighlightedWord} from '..';
import {MainStyles} from '../../assets/styles/MainStyles';
import {SearchContext} from '../../layouts/Search/SearchScreen';
import {toggleInHistory} from '../../redux/actions/listActions';
import {getDogsCatalog} from '../../redux/rootSelector';
import {DogItem} from '../../redux/types/listTypes';
import {colors, text} from '../../utils/constants';
import {parseDog} from '../../utils/functions';
import {checkImageCache} from '../../utils/helpers/cache';
import {ExtendedNavigationProp} from '../../utils/types';

interface Props {
  name: string;
  uri: string;
}

const ICON_SIZE = 40;

export const DogInfoListItem = ({name, uri}: Props) => {
  const search = useContext(SearchContext);

  const dispatch = useDispatch();
  const {history} = useSelector(getDogsCatalog);

  const {navigate} =
    useNavigation<
      ExtendedNavigationProp<'CatalogTabs', {params: {search: string}}>
    >();

  const [img, setImg] = useState('');

  const parsedDog = parseDog(name);
  const addToHistory = () => dispatch(toggleInHistory({name, img: uri}));

  const redirect = () => {
    if (parsedDog && typeof parsedDog !== 'undefined' && parsedDog !== '') {
      if (!history || history.length === 0) {
        addToHistory();
      } else {
        const idx = history.findIndex((i: DogItem) => i.name === name);

        idx === -1 ? addToHistory() : null;
      }

      navigate('CatalogTabs', {
        screen: 'Catalog',
        params: {
          search: parsedDog,
        },
      });
    }
  };

  useEffect(() => {
    let isMounted = false;

    checkImageCache(uri).then(res => {
      if (!isMounted) {
        setImg(res);
      }
    });

    return () => {
      isMounted = true;
    };
  }, []);

  return (
    <TouchableOpacity onPress={redirect}>
      <View style={styles.container}>
        {img !== '' ? (
          <ImageBackground
            source={{uri: img}}
            resizeMode={'cover'}
            style={styles.icon}
          />
        ) : (
          <View style={styles.icon} />
        )}
        <HighlightedWord
          text={parsedDog ?? ''}
          highlight={search.trim()}
          style={styles.text}
          highlightStyle={styles.highlight}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...MainStyles.rowFull,
    justifyContent: 'flex-start',
    width: Dimensions.get('screen').width - 14 * 2,
  },
  text: {
    fontSize: text.m,
    color: colors.darkGray,
  },
  highlight: {
    backgroundColor: colors.yellow,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: 7,
    borderRadius: ICON_SIZE,
    overflow: 'hidden',
    backgroundColor: colors.lightGray,
  },
});
