import {Platform} from 'react-native';
import Share, {ShareOptions} from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

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

export const shareImage = async (img: string, msg?: string) => {
  const _msg = msg ?? 'Look at this cute doggo!';

  try {
    const res = await RNFetchBlob.config({
      fileCache: true,
    }).fetch('GET', img);

    const b64 = await res.readFile('base64');

    let options = {
      title: 'Share image',
      url: `data:image/png;base64,${b64}`,
      failOnCancel: false,
    };

    const sharedImage = await Share.open(options);

    if (sharedImage.success) {
      return sharedImage;
    } else if (sharedImage.dismissedAction) {
      console.warn('@NotShared');
    }

    RNFetchBlob.fs.unlink(res.path());
  } catch (error) {
    throw new Error(`${error}`);
  }
};
