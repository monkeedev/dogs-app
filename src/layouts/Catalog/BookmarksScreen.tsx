import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {getDogsCatalog} from '../../redux/rootSelector';
import {colors, text} from '../../utils/constants';
import CustomStatusBar from '../../components/CustomStatusBar';
import {parseImage} from '../../utils/functions';
import ListItem from '../../components/lists/ListItem';
import EmptyList from '../../components/lists/EmptyList';

const renderItem = (uri: string, idx: number) => {
  return <ListItem uri={uri} idx={idx} />;
};

const BookmarksScreen = () => {
  const {bookmarks} = useSelector(getDogsCatalog);

  return (
    <View style={styles.container}>
      <CustomStatusBar bg={colors.turquoise} />

      <View style={styles.header}>
        <Text style={styles.headerText}>Favourites</Text>
      </View>

      <FlatList
        data={bookmarks}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => parseImage(item)}
        contentContainerStyle={[
          styles.list,
          bookmarks.length === 0
            ? styles.emptyList
            : bookmarks.length <= 6
            ? {height: '100%'}
            : {},
        ]}
        bounces={false}
        renderItem={({item, index}) => renderItem(item, index)}
        ListEmptyComponent={() => <EmptyList />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.turquoise,
  },
  header: {
    paddingLeft: 14,
    paddingBottom: 7,
    justifyContent: 'flex-end',
  },
  headerText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: text.m,
  },
  list: {
    paddingHorizontal: 7,
    paddingTop: 7,
    paddingBottom: 49,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    backgroundColor: colors.white,
  },
  emptyList: {
    flex: 1,
    paddingBottom: 0,
    justifyContent: 'center',
  },
  indicator: {
    paddingTop: 49,
    marginBottom: 7,
  },
});

export default BookmarksScreen;
