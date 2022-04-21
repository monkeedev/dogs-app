import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors, ErrorMessages, notificationRef} from '../../../utils/constants';
import {showAlert} from '../../../utils/functions';
import {clearCache, getCacheSize} from '../../../utils/helpers/cache';
import {ShowAlertProps} from '../../../utils/types';
import {Setting} from './Setting';

export const CacheLink = () => {
  const isFocused = useIsFocused();

  const [size, setSize] = useState<number>(0);

  useEffect(() => {
    if (isFocused) {
      getCacheSize().then(res => setSize(res));
    }
  }, [isFocused]);

  const cacheModal: ShowAlertProps = {
    title: 'Clear cache?',
    message: 'Cache folder will be cleared',
    buttons: [
      {
        text: 'OK',
        onPress: () => {
          clearCache()
            .then(() => {
              setSize(0);
              notificationRef.current?.show('Done!', 'success');
            })
            .catch(() => {
              notificationRef.current?.show(ErrorMessages.Default, 'error');
            });
        },
        style: 'default',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
  };

  return (
    <Setting
      text={'Cache'}
      action={() => showAlert(cacheModal)}
      iconConfig={{name: 'folder', type: 'feather'}}
      component={<Text style={styles.text}>{size.toFixed(2)} MB</Text>}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.gray,
    marginRight: 7,
  },
});
