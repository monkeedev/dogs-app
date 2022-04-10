import axios from 'axios';
import firestore from '@react-native-firebase/firestore';

const instance = axios.create();

instance.defaults.baseURL = 'https://api.tinyurl.com';
instance.defaults.headers.post['Content-Type'] = 'application/json';

export const createTinyUrl = async (url: string) => {
  const fcData = await firestore().collection('api_keys').doc('tiny_url').get();
  const {key} = fcData.data() as any;

  if (!key && typeof key !== 'string') {
    throw new Error('key was received');
  } else {
    instance.defaults.headers.common['Authorization'] = `Bearer ${key}`;

    const {data} = await instance
      .post(`${instance.defaults.baseURL}/create`, {
        url,
        domain: 'rotf.lol',
      })
      .catch(err => {
        throw new Error(err);
      });

    return data.data.tiny_url;
  }
};
