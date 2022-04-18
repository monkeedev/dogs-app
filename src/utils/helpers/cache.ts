import RNFS from 'react-native-fs';
import sh2 from 'shorthash2';
import {ErrorMessages, notificationRef} from '../constants';
import {isAndroid} from '../functions';

/**
 * Adds file to cache
 *
 * @param {string} uri file destination
 * @returns {string} filepath
 */
export const checkImageCache = async (uri: string = ''): Promise<string> => {
  const hash = sh2(uri);

  const path = RNFS.CachesDirectoryPath;
  const filePath = `${isAndroid() ? 'file://' : ''}${path}/${hash}${uri.slice(
    uri.lastIndexOf('.'),
  )}`;

  try {
    const doesFileExist = await RNFS.exists(filePath);

    // check file in filesystem
    if (!doesFileExist) {
      const res = await RNFS.downloadFile({
        fromUrl: uri,
        toFile: filePath,
      }).promise;

      if (res.statusCode === 200) {
        return filePath;
      } else {
        notificationRef.current?.show(ErrorMessages.Default, 'warning');
        return '';
      }
    } else {
      return filePath;
    }
  } catch (error) {
    notificationRef.current?.show(ErrorMessages.Default, 'warning');
    return '';
  }
};

/**
 * Clears cache folder
 *
 */
export const clearCache = async () => {
  const path = RNFS.CachesDirectoryPath;
  const filePath = `${isAndroid() ? 'file://' : ''}${path}`;

  try {
    const files = await RNFS.readdir(path);

    for (let key in files) {
      await RNFS.unlink(`${filePath}/${files[key]}`);
    }
  } catch (error) {
    throw new Error();
  }
};

/**
 * Check image path in cache folder
 *
 * @var {string} p - path of image
 */
export const checkImagePath = async (p: string): Promise<boolean> => {
  const hash = sh2(p);
  const path = RNFS.CachesDirectoryPath;

  try {
    const files = await RNFS.readdir(path);

    return files.includes(`${hash}${p.slice(p.lastIndexOf('.'))}`);
  } catch (error) {
    throw new Error();
  }
};

/**
 * Restore images list from cache
 *
 * @var {string[]} list - list to restore
 */
export const restoreCacheFromLists = async (
  list: string[],
): Promise<boolean> => {
  try {
    for (const key in list) {
      await checkImageCache(list[key]).catch(_ => {
        throw new Error(ErrorMessages.Default);
      });
    }

    return true;
  } catch (error) {
    notificationRef.current?.show(ErrorMessages.Default, 'error');

    return false;
  }
};

/**
 * Get size of cache folder
 *
 * @var     {string[]} list - list to restore
 * @returns {number} size in MB
 */
export const getCacheSize = async (): Promise<number> => {
  const s = await RNFS.readDir(RNFS.CachesDirectoryPath);
  let size = 0;

  if (s.length > 0) {
    const bytes = s.reduce((a, c) => {
      a += c.size;
      return a;
    }, 0);

    size = bytes / 1000000;
  }

  return size;
};
