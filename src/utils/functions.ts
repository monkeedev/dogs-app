import Clipboard from '@react-native-clipboard/clipboard';
import {Alert, Linking, Platform, ShareStatic} from 'react-native';
import Share, {ShareOptions} from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import {notificationRef} from './constants';

export const flatTree = (o: any): string[] => {
  const _o = Object.assign({}, o);
  const keys = Object.keys(_o);

  for (let k in _o) {
    if (_o[k].length > 0) {
      let a = _o[k].map((i: string) => `${k}-${i}`);

      let idx = keys.indexOf(k);

      keys.splice(idx, 1, ...a);
    }
  }

  return keys;
};

export const findBreedInList = (list: string[], breed: string) => {
  const _arr = JSON.parse(JSON.stringify(list));
  const splitted = breed.toLowerCase().split(' ');

  if (
    _arr.indexOf(splitted.join('-')) !== -1 ||
    _arr.indexOf(splitted.reverse().join('-')) !== -1
  ) {
    const normal = _arr.indexOf(splitted.join('-'));
    const reversed = _arr.indexOf(splitted.reverse().join('-'));

    return normal !== -1 ? _arr[normal] : _arr[reversed];
  } else {
    const res = _arr.filter((w: string) => {
      return splitted.filter(i => w.match(i)).length > 0;
    });

    return res.length === 0 ? [] : res.length === 1 ? res[0] : breed;
  }
};

export const parseImage = (s: string) => {
  const fromBreed = s.slice(s.indexOf('breeds'));
  const arr = fromBreed.split('/');

  return `${arr[2]}`;
};

export const getBreed = (s: string) => {
  const fromBreed = s.slice(s.indexOf('breeds'));
  let breed = fromBreed.split('/')[1];

  if (breed.indexOf('-') !== -1) {
    breed = breed.split('-')[0];
  }

  return `${breed}s`;
};

export const shareImage = async (uri: string, type: string) => {
  if (uri === null) {
    return false;
  } else {
    const msg = `Look at this cute doggo!\n${uri}`;
    let isSupported = false;

    try {
      switch (type) {
        case 'CopyLink':
          Clipboard.setString(`${msg}`);
          notificationRef.current.show('Link copied!', 'info');
          break;

        case 'MsgApp':
          const phone = `sms:?&body=${msg}`;
          isSupported = await Linking.canOpenURL(phone);

          if (isSupported) {
            Clipboard.setString(`${msg}`);
            await Linking.openURL(phone);
          } else {
            notificationRef.current.show(
              'Messaging is not supported',
              'warning',
            );
          }
          break;

        case 'MailApp':
          const mail = `mailto:`;
          isSupported = await Linking.canOpenURL(mail);

          if (isSupported) {
            Clipboard.setString(`${msg}`);
            await Linking.openURL(mail);
          } else {
            notificationRef.current.show('Mailing is not supported', 'warning');
          }
          break;

        default:
          break;
      }
    } catch (error) {
      throw new Error('' + error);
    }
  }

  // try {
  //   const res = await RNFetchBlob.config({
  //     fileCache: true,
  //   }).fetch('GET', img);

  //   const b64 = await res.readFile('base64');

  //   const icon = `data:image/png;base64,${b64}`;

  //   let options: ShareOptions = {
  //     title: 'Share image',
  //     url: icon,
  //     failOnCancel: false,
  //   };

  //   const sharedImage = await Share.open(options);

  //   if (sharedImage.success) {
  //     return sharedImage;
  //   } else if (sharedImage.dismissedAction) {
  //     console.warn('@NotShared');
  //   }

  //   RNFetchBlob.fs.unlink(res.path());
  // } catch (error) {
  //   throw new Error(`${error}`);
  // }
};
