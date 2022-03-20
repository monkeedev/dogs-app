import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HEADER_EXPANDED_HEIGHT = 78 + 14;

export const useComputedHeaderValue = () => {
  const insets = useSafeAreaInsets();
  const headerAddedValue = insets.top + 7 * 2;

  const height = Platform.select({
    ios: HEADER_EXPANDED_HEIGHT + headerAddedValue,
    android: HEADER_EXPANDED_HEIGHT + insets.top + headerAddedValue,
    default: HEADER_EXPANDED_HEIGHT + headerAddedValue,
  });

  return {height};
};
