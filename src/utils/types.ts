import {AlertButton, ColorValue} from 'react-native';
import {DogItem} from '../redux/types/listTypes';

export interface ActionType<T, P> {
  type: T;
  payload: P | null;
}

export interface StatedObject<T> {
  data: T[] | T;
  error: string;
  loading: boolean;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export type NotificationRef = {
  show: (msg: string, t: NotificationType) => boolean;
  hide: () => null;
};

export enum NotificationNumber {
  info = 0,
  success = 1,
  warning = 2,
  error = 3,
}

export enum NotificationColor {
  info = '#0275d8',
  success = '#5cb85c',
  warning = '#f0ad4e',
  error = '#d9534f',
}

export enum NotificationIcon {
  info = 'information-circle-outline',
  success = 'ios-checkmark-circle-outline',
  warning = 'warning-outline',
  error = 'sad-outline',
}

export interface DogsJSONItems {
  [key: string]: DogItem;
}
export interface ExtendedNavigationProp<T, P> {
  navigate: (T: string, P: any) => void;
  screen: T;
  params: P;
}

export type IconProps = {
  name: string;
  type: string;
  size?: number;
};

export type ShowAlertProps = {
  title: string;
  message?: string;
  buttons?: AlertButton[];
};

type ColorSchemeKeys =
  | 'primary'
  | 'secondary'
  | 'background'
  | 'surface'
  | 'error'
  | 'text'
  | 'border'
  | 'inputPlaceholder'
  | 'inputText'
  | 'icons'
  | 'card'
  | 'notification';

export type ColorSchemeColors = Record<ColorSchemeKeys, ColorValue>;

export type User = {
  login: string;
  mail: string;
  phone: string;
};
