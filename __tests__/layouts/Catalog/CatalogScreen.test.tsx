import {useRoute} from '@react-navigation/native';
import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {create} from 'react-test-renderer';
import {mockedDispatch, mockedNavigate} from '../../../jest.setup';
import CatalogScreen from '../../../src/layouts/Catalog/CatalogScreen';

const LIST = [
  'https://images.dog.ceo/breeds/labrador/n02099712_5648.jpg',
  'https://images.dog.ceo/breeds/retriever-golden/n02099601_8005.jpg',
  'https://images.dog.ceo/breeds/pyrenees/n02111500_7483.jpg',
];

// Dimensions
// const mockDimensions = ({width, height}) => {
//   jest.resetModules();
//   jest.doMock('react-native/Libraries/Utilities/Dimensions', () => ({
//     get: jest.fn().mockReturnValue({width, height}),
//   }));
// };

describe('CatalogScreen', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
    jest.spyOn(Dimensions, 'get').mockReturnValue({width: 414, height: 818});
  });

  it('matches snapshot', async () => {
    useRoute.mockReturnValue({params: {search: ''}});
    useSelector.mockReturnValue({
      list: {data: [], error: '', loading: false},
    });

    act(() => {
      const tree = create(<CatalogScreen />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  it('renders with list', async () => {
    useRoute.mockReturnValue({params: {search: ''}});
    useSelector.mockReturnValue({
      list: {data: LIST, error: '', loading: false},
      bookmarks: [],
    });

    const {getAllByTestId} = render(<CatalogScreen />);
    const items = getAllByTestId('DogImageListItem_View');
    expect(items.length).toBe(3);
  });

  it('renders with loading', async () => {
    useRoute.mockReturnValue({params: {search: ''}});
    useSelector.mockReturnValue({
      list: {data: LIST, error: '', loading: true},
      bookmarks: [],
    });

    const {getByTestId} = render(<CatalogScreen />);
    const indicator = getByTestId('ActivityIndicator_Loading');

    expect(indicator.type).toBe('ActivityIndicator');
  });

  it('renders with list with bookmarked items', async () => {
    useRoute.mockReturnValue({params: {search: ''}});
    useSelector.mockReturnValue({
      list: {data: LIST, error: '', loading: false},
      bookmarks: ['https://images.dog.ceo/breeds/labrador/n02099712_5648.jpg'],
    });

    const {getAllByTestId, getByTestId} = render(<CatalogScreen />);
    const items = getAllByTestId('DogImageListItem_Bookmarks').filter(
      i => i.props.style.opacity === 1,
    );

    expect(items.length).toBe(1);
  });

  it('renders with list of 5 items', async () => {
    useRoute.mockReturnValue({params: {search: 'foo'}});
    useSelector.mockReturnValue({
      list: {
        data: [
          ...LIST,
          'https://images.dog.ceo/breeds/labrador/n02090712_5648.jpg',
          'https://images.dog.ceo/breeds/labrador/n82099712_5648.jpg',
        ],
        error: '',
        loading: false,
      },
      bookmarks: [],
    });

    const {getByTestId} = render(<CatalogScreen />);
    const view = getByTestId('SearchInput_Disabled');

    expect(view.children[0].props.children).toBe('foo');
  });

  it('redirects to specific route with search', async () => {
    useRoute.mockReturnValue({params: {search: 'foo'}});
    useSelector.mockReturnValue({
      list: {data: LIST, error: '', loading: false},
      bookmarks: [],
    });

    const {getByTestId} = render(<CatalogScreen />);
    const view = getByTestId('SearchInput_Disabled');
    const btn = getByTestId('FakeInputButton_Pressable');

    expect(view.children[0].props.children).toBe('foo');

    act(() => {
      fireEvent(btn, 'onPress');
      expect(mockedNavigate).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onEndReachedCallback (with search)', async () => {
    useRoute.mockReturnValue({params: {search: 'foo'}});
    useSelector.mockReturnValue({
      list: {data: ['foo', 'bar', 'baz'], error: '', loading: false},
      bookmarks: ['foo'],
    });

    const {getByTestId} = render(<CatalogScreen />);
    const list = getByTestId('GalleryList');

    act(() => {
      fireEvent(list, 'onEndReached');

      expect(mockedDispatch).toHaveBeenCalled();
    });
  });

  it('calls onEndReachedCallback (without search)', async () => {
    useRoute.mockReturnValue({params: {search: ''}});
    useSelector.mockReturnValue({
      list: {data: ['foo', 'bar', 'baz'], error: '', loading: false},
      bookmarks: ['foo'],
    });

    const {getByTestId} = render(<CatalogScreen />);
    const list = getByTestId('GalleryList');

    act(() => {
      fireEvent(list, 'onEndReached');

      expect(mockedDispatch).toHaveBeenCalled();
    });
  });

  it('clears input when ClearTextButton pressed', async () => {
    useRoute.mockReturnValue({params: {search: 'foo'}});
    useSelector.mockReturnValue({
      list: {data: ['foo', 'bar', 'baz'], error: '', loading: false},
      bookmarks: ['foo'],
    });

    const {getByTestId} = render(<CatalogScreen />);
    const btn = getByTestId('ClearTextButton_Button');

    act(() => {
      fireEvent(btn, 'onPress');

      expect(mockedDispatch).toHaveBeenCalled();
    });
  });
});
