import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useDispatch, useSelector} from 'react-redux';
import {MainStyles} from '../../../assets/styles/MainStyles';
import {DefaultButton, ShareButton} from '../../../components/buttons';
import {saveToBookmarks} from '../../../redux/actions/listActions';
import {getDogsCatalog} from '../../../redux/rootSelector';
import {colors, text} from '../../../utils/constants';
import {getBreed} from '../../../utils/functions';

interface Props {
  uri: string;
}

export const ListHeader = ({uri}: Props) => {
  const {bookmarks} = useSelector(getDogsCatalog);
  const dispatch = useDispatch();

  const handleToogleBookmark = () => dispatch(saveToBookmarks(uri));

  const isBookmark = bookmarks.indexOf(uri) !== -1;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>More {getBreed(uri)}</Text>

      <View style={styles.headerButtons}>
        <DefaultButton
          onPress={handleToogleBookmark}
          color={isBookmark ? colors.turquoise : colors.lightGray}>
          <Icon
            testID={'ListHeader_Icon'}
            type={'ionicon'}
            name={`bookmarks`}
            color={isBookmark ? colors.white : colors.turquoise}
            size={18}
          />
        </DefaultButton>
        <ShareButton uri={uri} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...MainStyles.rowFull,
    borderRadiusTopLeft: 14,
    borderRadiusTopRight: 14,
    backgroundColor: colors.white,
    paddingLeft: 14,
    paddingRight: 11.5,
    paddingVertical: 7,
  },
  headerText: {
    fontSize: text.m,
    fontWeight: '900',
    paddingVertical: 14,
    color: colors.darkGray,
  },
  headerButtons: {
    flexDirection: 'row',
  },
});
