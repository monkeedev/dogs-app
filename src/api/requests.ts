import axios from 'axios';
import {ErrorMessages, notificationRef} from '../utils/constants';
import {findBreedInList, flatTree} from '../utils/functions';
import {DogApiResponse} from './interfaces';

const returnNetworkError = () => {
  notificationRef.current?.show(ErrorMessages.Network, 'error');
  return false;
};

/**
 * TODO:
 * 1. [typescript] fix DogApiResponse
 */

class DogsApi {
  readonly uri: string;
  list: string[];

  constructor() {
    this.uri = 'https://dog.ceo/api';
    this.list = [];

    // TODO: move to <MainNavigator />
    this.getListOfDogBreeds();
  }

  getListOfDogBreeds = async (): Promise<string[] | Error> => {
    try {
      const req = (await axios
        .get(`${this.uri}/breeds/list/all`)
        .catch(returnNetworkError)) as any;

      this.list = flatTree(req?.data.message);

      return this.list;
    } catch (error) {
      throw new Error("Can't fetch doggos list");
    }
  };

  /**
   * Fetch dog list
   *
   * @param b breed
   * @param q quantity
   *
   * @returns {Promise} list with dogs
   */
  fetchDogs = async (
    b?: string | null,
    q = 10,
  ): Promise<DogApiResponse | false | Error> => {
    try {
      let req: any;

      if (b && b !== '') {
        req = await axios
          .get<DogApiResponse>(
            `${this.uri}/breed/${b.toLocaleLowerCase()}/images/random${
              q ? `/${q}` : ''
            }`,
          )
          .catch(returnNetworkError);
      } else {
        req = await axios
          .get(`${this.uri}/breeds/image/random${q ? `/${q}` : ''}`)
          .catch(returnNetworkError);
      }

      return req.data;
    } catch (err) {
      throw new Error("Can't fetch doggos");
    }
  };

  /**
   * Fetch dog by subbreed
   *
   * @param b breed
   * @param q quantity
   *
   * @returns {Promise} list with dogs
   */
  fetchDogBySubbreed = async (
    b: string,
    q?: number,
  ): Promise<DogApiResponse> => {
    try {
      let req: any;
      const _l = JSON.parse(JSON.stringify(this.list));

      const search = findBreedInList(_l, b.toLowerCase());

      if (search.length === 0) {
        return [] as any;
      } else {
        const _s = search.split('-');

        req = await axios
          .get(
            `${this.uri}/breed/${
              _s.length === 1 ? `${_s[0]}` : `${_s[0]}/${_s[1]}`
            }/images/random${q ? `/${q}` : ''}`,
          )
          .catch(returnNetworkError);

        return req.data;
      }
    } catch (err) {
      throw new Error("Can't fetch doggo");
    }
  };
}

const Api = new DogsApi();

export default Api;
