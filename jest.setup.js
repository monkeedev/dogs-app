import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();
// jest.useFakeTimers();

configure({adapter: new Adapter()});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => jest.fn(),
}));

jest.mock('react-native-share', () => ({
  Share: jest.fn(),
  Social: jest.fn(),
  shareSingle: jest.fn(),
}));

jest.mock('rn-fetch-blob', () => ({
  config: () => ({
    fetch: () => ({
      readFile: jest.fn(),
    }),
  }),
}));

jest.mock('react-native-fs', () => ({
  CachesDirectoryPath: 'test_cache',
  exists: jest.fn(),
  downloadFile: jest.fn(),
}));

export const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useRoute: jest.fn(),
    useNavigation: () => ({
      navigate: mockedNavigate,
      goBack: () => jest.fn(),
    }),
  };
});

export const mockedDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: mockedDispatch,
}));

jest.mock('@react-native-clipboard/clipboard');
