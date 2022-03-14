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
  current: {
    show: (msg: string, t: NotificationType) => void;
    hide: () => void;
  };
};
