/**
 * Native module that check internet connection for Android
 */

import {NativeModules} from 'react-native';
import {isAndroid} from '../src/utils/functions';

const {InternetConnectionModule} = NativeModules;

interface InternetConnectionInterface {
  checkConnection(): boolean;
}

export const checkConnection = async (): Promise<boolean> => {
  // TODO: iOS native module
  return isAndroid() ? await InternetConnectionModule.checkConnection() : true;
};

export default InternetConnectionModule as InternetConnectionInterface;
