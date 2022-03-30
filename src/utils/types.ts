export interface ActionType<T, P> {
  type: T;
  payload: P;
}

export interface StatedObject<T> {
  data: T[];
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
