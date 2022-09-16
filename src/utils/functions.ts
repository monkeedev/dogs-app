import Clipboard from '@react-native-clipboard/clipboard';
import {Alert, Linking, Platform} from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import {ErrorMessages, notificationRef} from './constants';
import {createTinyUrl} from './tinyUrlHelper';
import {ShowAlertProps} from './types';

/**
 * Tree with dogs
 *
 * @param o object with breeds
 * @returns array with possible variations with breed and subbreed
 */
export const flatTree = (o: any): string[] => {
  if (Object.keys(o).length === 0) {
    return [];
  } else {
    const _o = Object.assign({}, o);
    const keys = Object.keys(_o).filter(i => Array.isArray(_o[i]));
    const res = [];

    for (const k in _o) {
      if (!Array.isArray(_o[k])) {
        continue;
      } else {
        if (_o[k].length === 0) {
          res.push(k);
        } else {
          const a = _o[k]
            .filter((i: any) => typeof i === 'string')
            .map((i: string) => `${k}-${i}`);

          const idx = keys.indexOf(k);

          res.push(...a);
        }
      }
    }

    return res;
  }
};

/**
 * Get dog image
 *
 * @param list list with breeds
 * @param breed
 * @returns breed
 */
export const findBreedInList = (list: string[], breed: string) => {
  const _arr = JSON.parse(JSON.stringify(list));

  const splitted = breed
    .toLowerCase()
    .split(' ')
    .filter(i => i !== '');

  if (
    _arr.indexOf(splitted.join('-')) !== -1 ||
    _arr.indexOf(splitted.reverse().join('-')) !== -1
  ) {
    // found something
    const normal = _arr.indexOf(splitted.join('-'));
    const reversed = _arr.indexOf(splitted.reverse().join('-'));

    return normal !== -1 ? _arr[normal] : _arr[reversed];
  } else {
    // not found
    const res = _arr.filter((w: string) => {
      return splitted.filter(i => w.match(i)).length > 0;
    });

    return res.length === 0 ? [] : res.length === 1 ? res[0] : breed;
  }
};

/**
 * Get dog image
 *
 * @param s string with image
 * @returns image
 */
export const parseImage = (s: string) => {
  if (s === '' || typeof s !== 'string') return '';

  const fromBreed = s.slice(s.indexOf('breeds'));
  const arr = fromBreed.split('/');

  return `${arr[2]}`;
};

/**
 * Get dog breed
 *
 * @param uri string with breed
 * @returns transformed string of dog breed
 */
export const getBreed = (uri: string) => {
  if (uri === '' || typeof uri !== 'string') return '';

  const fromBreed = uri.slice(uri.indexOf('breeds'));
  let breed = fromBreed.split('/')[1];

  if (breed.indexOf('-') !== -1) {
    breed = breed.split('-')[0];
  }

  const breedLow = breed.toLowerCase();
  if (breedLow.indexOf('ees') === breedLow.length - 3) {
    return breed;
  } else {
    return `${breed}s`;
  }
};

/**
 * Share image to singe social
 *
 * @param social
 * @param url image address
 */
const shareSingle = async (social: string, url: string) => {
  try {
    let _url = url;

    if (social === 'instagram') {
      const res = await RNFetchBlob.config({
        fileCache: true,
      }).fetch('GET', _url);

      const b64 = await res.readFile('base64');

      _url = `data:image/png;base64,${b64}`;
    }

    const options: any = {
      message: 'Look at this cute doggo!',
      url: _url,
      social,
      type: 'image/*',
    };

    await Share.shareSingle(options).catch(err => {
      notificationRef.current?.show(ErrorMessages.SocialIsMissing, 'warning');
    });
  } catch (error) {
    notificationRef.current?.show(ErrorMessages.Default, 'warning');
    throw new Error('' + error);
  }
};

/**
 * Share image
 *
 * @param uri image address
 * @param type destination
 */
export const shareImage = async (uri: string, type: string) => {
  if (!uri || uri === '' || typeof uri !== 'string') {
    return false;
  } else {
    const url = await createTinyUrl(uri).catch(_ => uri);

    const msg = `Look at this cute doggo!\n${url}`;
    let link = '';
    let isSupported = false;

    try {
      switch (type) {
        case 'CopyLink':
          Clipboard.setString(`${msg}`);
          notificationRef.current?.show('Link copied!', 'info');
          break;

        case 'MsgApp':
          link = `sms:?&body=${msg}`;
          isSupported = await Linking.canOpenURL(link);

          if (isSupported) {
            Clipboard.setString(`${msg}`);
            await Linking.openURL(link);
          } else {
            // await shareSingle(Social.Messenger, url);
            await shareSingle('messenger', url);
          }
          break;

        case 'TelegramApp':
          link = `https://t.me/share/url?url=${encodeURI(url)}&text=${encodeURI(
            'Look at this cute doggo!',
          )}`;

          await Linking.openURL(link).catch(err => {
            notificationRef.current?.show(
              ErrorMessages.NotSupported,
              'warning',
            );
          });
          break;

        case 'MailApp':
          // await shareSingle(Social.Email, url);
          await shareSingle('email', url);
          break;

        case 'FacebookApp':
          // await shareSingle(Social.Facebook, url);
          await shareSingle('facebook', url);
          break;

        case 'InstagramApp':
          // await shareSingle(Social.Instagram, url);
          await shareSingle('instagram', url);
          break;

        default:
          break;
      }

      return true;
    } catch (error) {
      throw new Error('' + error);
    }
  }
};

/**
 * Word to camel case
 *
 * @param word
 * @returns word transformed to camel case
 */
const transformToCamelCase = (word: string) => {
  if (word && typeof word === 'string' && word !== '') {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
  } else {
    return '';
  }
};

/**
 * Camel case dog breed
 *
 * @param str
 * @returns string transformed to camel case
 */
export const parseDog = (str: string): string => {
  if (!str || str === '' || typeof str !== 'string') {
    return '';
  } else {
    const words = str.split('-');

    if (words.length === 1) {
      return transformToCamelCase(str);
    } else {
      const f = transformToCamelCase(words[0]);
      const s = transformToCamelCase(words[1]);

      return `${f} ${s}`;
    }
  }
};

// needed for tests
export const isAndroid = () => Platform.OS === 'android';

export const showAlert = (o: ShowAlertProps) => {
  Alert.alert(o.title, o.message ?? '', o.buttons ? [...o.buttons] : undefined);
};

export const validateEmail = (address: string): boolean => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

  return regex.test(address);
};
