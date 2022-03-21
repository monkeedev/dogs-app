import Clipboard from '@react-native-clipboard/clipboard';
import {Linking} from 'react-native';
import Share, {Social} from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import {ErrorMessages, notificationRef} from './constants';

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

  if (breed.toLowerCase() === 'pyrenees') {
    return breed;
  } else {
    return `${breed}s`;
  }
};

const shareSingle = async (social: Social, url: string) => {
  try {
    let _url = url;

    if (social === Social.Instagram) {
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

    const isSupported = await Linking.canOpenURL(`${social}://`);

    if (isSupported) {
      await Share.shareSingle(options);
    } else {
      notificationRef.current?.show(ErrorMessages.SocialIsMissing, 'warning');
    }
  } catch (error) {
    notificationRef.current?.show(ErrorMessages.Default, 'warning');
    throw new Error('' + error);
  }
};

export const shareImage = async (uri: string, type: string) => {
  if (uri === null || uri === '') {
    return false;
  } else {
    const msg = `Look at this cute doggo!\n${uri}`;
    let link = '';
    let isSupported = false;

    try {
      switch (type) {
        case 'CopyLink':
          Clipboard.setString(`${msg}`);
          notificationRef.current.show('Link copied!', 'info');
          break;

        case 'MsgApp':
          link = `sms:?&body=${msg}`;
          isSupported = await Linking.canOpenURL(link);

          if (isSupported) {
            Clipboard.setString(`${msg}`);
            await Linking.openURL(link);
          } else {
            notificationRef.current.show(ErrorMessages.NotSupported, 'warning');
          }
          break;

        case 'MailApp':
          // link = `mailto:`;
          // isSupported = await Linking.canOpenURL(link);

          // if (isSupported) {
          //   Clipboard.setString(`${msg}`);
          //   await Linking.openURL(link);
          // } else {
          //   notificationRef.current.show('Mailing is not supported', 'warning');
          // }
          await shareSingle(Social.Email, uri);

          break;

        case 'TelegramApp':
          link = `https://t.me/share/url?url=${encodeURI(
            uri,
          )}&text=Look at this cute doggo!`;
          isSupported = await Linking.canOpenURL(link);

          if (isSupported) {
            await Linking.openURL(link);
          } else {
            notificationRef.current.show(ErrorMessages.NotSupported, 'warning');
          }
          break;

        case 'FacebookApp':
          await shareSingle(Social.Facebook, uri);

          break;

        case 'InstagramApp':
          await shareSingle(Social.Instagram, uri);

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
