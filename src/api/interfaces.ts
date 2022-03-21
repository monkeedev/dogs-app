import {ImageSourcePropType} from 'react-native';

type DogApiError = 'success' | 'error';

export interface DogApiResponse {
  message: string[] | string | void;
  status: DogApiError;
}
