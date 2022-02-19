export interface ActionType<T, P> {
  type: T;
  payload: P;
}

export interface StatedObject<T> {
  data: T[];
  error: string;
  loading: boolean;
}
