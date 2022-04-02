import {useRoute} from '@react-navigation/native';
import {act, render} from '@testing-library/react-native';
import React from 'react';
import {Image} from 'react-native';
import {create} from 'react-test-renderer';
import GalleryModal from '../../../src/layouts/Gallery/GalleryModal';
import Api from '../../../src/api/requests';
import * as Functions from '../../../src/utils/functions';
import {shallow} from 'enzyme';

let mockedPromise = Promise.resolve();

jest.mock('../../../src/api/requests', () => ({
  fetchDogBySubbreed: jest.fn().mockImplementation(() => mockedPromise),
}));

describe('GalleryModal', () => {
  beforeEach(() => {
    const getSizeMock = jest.spyOn(Image, 'getSize');
    getSizeMock.mockImplementation(() => {});
  });

  it('matches snapshot', () => {
    useRoute.mockReturnValue({
      params: {uri: 'foo', search: '', img: 'foo.jpg'},
    });

    act(() => {
      const tree = create(<GalleryModal />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('successfully fetches list', async () => {
    mockedPromise = Promise.resolve({message: ['foo', 'bar']});
    useRoute.mockReturnValue({
      params: {uri: 'foo', search: 'foo', img: 'foo.jpg'},
    });

    const spy = jest.spyOn(React, 'useEffect');

    render(<GalleryModal />);

    await act(async () => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('is not fetching list when promise was rejected', async () => {
    mockedPromise = Promise.reject('some error');
    useRoute.mockReturnValue({
      params: {uri: 'foo', search: 'foo', img: 'foo.jpg'},
    });

    const spy = jest.spyOn(React, 'useEffect');

    render(<GalleryModal />);

    await act(async () => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('is not fetching list when promise was rejected', async () => {
    mockedPromise = Promise.resolve({message: ['foo', 'bar']});
    useRoute.mockReturnValue({
      params: {uri: 'foo', search: 'foo', img: 'foo.jpg'},
    });

    const spy = jest.spyOn(React, 'useEffect');

    render(<GalleryModal />);

    await act(async () => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
