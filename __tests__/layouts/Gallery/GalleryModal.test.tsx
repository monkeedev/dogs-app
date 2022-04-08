import {useRoute} from '@react-navigation/native';
import {act, render} from '@testing-library/react-native';
import React from 'react';
import {Image} from 'react-native';
import {create} from 'react-test-renderer';
import GalleryModal from '../../../src/layouts/Gallery/GalleryModal';
import {useSelector} from 'react-redux';

let mockedPromise = Promise.resolve();
const LIST = [
  'https://images.dog.ceo/breeds/labrador/n02099712_5648.jpg',
  'https://images.dog.ceo/breeds/retriever-golden/n02099601_8005.jpg',
  'https://images.dog.ceo/breeds/pyrenees/n02111500_7483.jpg',
];

jest.mock('../../../src/api/requests', () => ({
  fetchDogBySubbreed: jest.fn().mockImplementation(() => mockedPromise),
}));

describe('GalleryModal', () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      bookmarks: LIST,
    });

    const getSizeMock = jest.spyOn(Image, 'getSize');
    getSizeMock.mockImplementation(() => {});
  });

  it('matches snapshot', () => {
    useRoute.mockReturnValue({
      params: {
        uri: LIST[0],
        search: 'foo',
        img: 'foo.jpg',
        size: {w: 100, h: 100},
        isConnected: true,
      },
    });

    const tree = create(<GalleryModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('successfully fetches list', async () => {
    useRoute.mockReturnValue({
      params: {
        uri: LIST[0],
        search: '',
        img: 'foo.jpg',
        size: {w: 100, h: 100},
        isConnected: true,
      },
    });

    mockedPromise = Promise.resolve({message: ['foo', 'bar']});
    const spy = jest.spyOn(React, 'useEffect');
    render(<GalleryModal />);

    await act(async () => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('is not fetching list when promise was rejected', async () => {
    useRoute.mockReturnValue({
      params: {
        uri: LIST[0],
        search: '',
        img: 'foo.jpg',
        size: {w: 100, h: 100},
        isConnected: false,
      },
    });

    mockedPromise = Promise.reject('some error');
    const spy = jest.spyOn(React, 'useEffect');

    render(<GalleryModal />);
    await act(async () => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('is not fetching list when promise was rejected', async () => {
    useRoute.mockReturnValue({
      params: {
        uri: LIST[0],
        search: '',
        img: 'foo.jpg',
        size: {w: 100, h: 100},
        isConnected: true,
      },
    });

    mockedPromise = Promise.resolve({message: ['foo', 'bar']});
    const spy = jest.spyOn(React, 'useEffect');

    render(<GalleryModal />);
    await act(async () => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
