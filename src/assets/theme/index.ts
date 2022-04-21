import {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {changeTheme} from '../../redux/actions/userActions';
import {getUserStorage} from '../../redux/rootSelector';
import {ColorSchemeColors} from '../../utils/types';
import {darkTheme} from './dark';
import {lightTheme} from './light';

export enum ColorScheme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

const themes: Record<'light' | 'dark', ColorSchemeColors> = {
  light: lightTheme,
  dark: darkTheme,
};

export const useTheme = () => {
  const scheme = useColorScheme();
  const dispatch = useDispatch();
  const {theme} = useSelector(getUserStorage);

  const [userTheme, setUserTheme] = useState('');

  // FIXME: triggers twice
  // const schemeListener = useCallback(
  //   (scheme: Appearance.AppearancePreferences) => {
  //     console.log(theme, scheme.colorScheme);
  //     if (!scheme.colorScheme || scheme.colorScheme === null) {
  //       setUserTheme(ColorScheme.LIGHT);
  //     } else {
  //       setUserTheme(scheme.colorScheme);
  //     }
  //   },
  //   [],
  // );

  // triggers when user change system mode
  // useEffect(() => {
  //   Appearance.addChangeListener(schemeListener);

  //   return () => Appearance.removeChangeListener(schemeListener);
  // }, []);

  useEffect(() => {
    if (userTheme !== '') {
      dispatch(changeTheme(userTheme));
    }
  }, [userTheme]);

  const mode = themes[(theme ?? 'light') as 'light' | 'dark'];

  return {mode};
};
