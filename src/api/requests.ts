import axios from 'axios';
import {options} from './options';

class DogsApi {
  readonly uri: string;

  constructor() {
    this.uri = options.uri;
  }

  fetchRandomDog = async (breed?: string) => {
    try {
      return await axios
        .get(`${this.uri}/${breed ?? 'breeds'}/image/random`)
        .then(req => req.data)
        .catch(error => error);
    } catch (err) {
      throw new Error("Can't fetch doggo");
    }
  };
}

const Api = new DogsApi();

export default Api;
