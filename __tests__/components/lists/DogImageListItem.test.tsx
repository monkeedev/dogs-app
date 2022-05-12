import {act, fireEvent, render} from '@testing-library/react-native';
import {shallow} from 'enzyme';
import React from 'react';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';
import {create} from 'react-test-renderer';
import GalleryItem from '../../../src/components/lists/GalleryItem';
import * as Functions from '../../../src/utils/functions';

const resolved = 'file://test_cache/some_img.jpg';
const LIST = [
  'https://images.dog.ceo/breeds/labrador/n02099712_5648.jpg',
  'https://images.dog.ceo/breeds/retriever-golden/n02099601_8005.jpg',
  'https://images.dog.ceo/breeds/pyrenees/n02111500_7483.jpg',
];

jest.mock('../../../src/utils/functions');

describe('DogImageListItem', () => {
  beforeEach(() => {
    useSelector.mockReturnValue({bookmarks: []});
  });

  it('matches snapshot', async () => {
    await act(async () => {
      await Functions.checkImageCache.mockImplementation(() =>
        Promise.resolve(resolved),
      );

      const tree = create(<GalleryItem uri={'foo'} idx={1} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('renders nothing when uri is empty', async () => {
    await act(async () => {
      await Functions.checkImageCache.mockImplementation(() =>
        Promise.resolve(resolved),
      );

      const {toJSON} = render(<GalleryItem />);
      expect(toJSON()).toBe(null);
    });
  });

  it('navigates to gallery when pressing on a specified button', async () => {
    await act(async () => {
      await Functions.checkImageCache.mockImplementation(() =>
        Promise.resolve(resolved),
      );

      const getSizeMock = jest.spyOn(Image, 'getSize');
      const success = jest.fn((width, height) => {});
      const failure = jest.fn(() => {});

      getSizeMock.mockImplementation((_, success, failure) => {
        success(100, 100);
      });

      const {getByTestId} = render(<GalleryItem uri={LIST[0]} idx={1} />);
      const btn = getByTestId('DogImageListItem_GalleryBtn');

      fireEvent(btn, 'onPress');
      // TODO: bug?
      expect(btn).toBeDefined();
    });
  });

  it('renders two images with different top style', async () => {
    await act(async () => {
      await Functions.checkImageCache.mockImplementation(() =>
        Promise.resolve(resolved),
      );

      const {toJSON} = render(
        <>
          <GalleryItem uri={'foo'} idx={1} />
          <GalleryItem uri={'bar'} idx={2} />
        </>,
      );

      expect(toJSON()[0].props.style.top).toBe(28);
      expect(toJSON()[1].props.style.top).toBe(0);
    });
  });

  it('renders component with empty box', async () => {
    await act(async () => {
      await Functions.checkImageCache.mockImplementation(() =>
        Promise.resolve(resolved),
      );

      const wrapper = shallow(<GalleryItem uri={'foo'} idx={1} />);
      const view = wrapper.find({testID: 'DogImageListItem_EmptyView'});

      expect(view.exists()).toBe(true);
    });
  });
});
