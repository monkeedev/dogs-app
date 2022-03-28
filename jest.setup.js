import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

configure({adapter: new Adapter()});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: () => jest.fn(),
  }),
}));
