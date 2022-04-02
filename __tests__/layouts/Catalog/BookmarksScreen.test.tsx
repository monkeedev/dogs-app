import {act, fireEvent, render} from '@testing-library/react-native';
import {shallow} from 'enzyme';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {create} from 'react-test-renderer';
import {mockedDispatch} from '../../../jest.setup';
import BookmarksScreen from '../../../src/layouts/Catalog/BookmarksScreen';

const LIST = [
  'https://images.dog.ceo/breeds/labrador/n02099712_5648.jpg',
  'https://images.dog.ceo/breeds/retriever-golden/n02099601_8005.jpg',
  'https://images.dog.ceo/breeds/pyrenees/n02111500_7483.jpg',
];

describe('BookmarksScreen', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
  });

  it('matches snapshot', () => {
    useSelector.mockReturnValue({
      bookmarks: LIST,
    });

    act(() => {
      const tree = create(<BookmarksScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('renders with list of 5 items', () => {
    useSelector.mockReturnValue({
      bookmarks: [
        ...LIST,
        'https://images.dog.ceo/breeds/labrador/n02090712_5648.jpg',
        'https://images.dog.ceo/breeds/labrador/n82099712_5648.jpg',
      ],
    });

    const {getAllByTestId} = render(<BookmarksScreen />);
    const items = getAllByTestId('DogImageListItem_View');

    expect(items.length).toBe(5);
  });

  it('handles onScroll', () => {
    useSelector.mockReturnValue({
      bookmarks: [
        ...LIST,
        'https://images.dog.ceo/breeds/labrador/n02090712_5648.jpg',
        'https://images.dog.ceo/breeds/labrador/n82099712_5648.jpg',
      ],
    });

    const wrapper = shallow(<BookmarksScreen />);
    const list = wrapper.find({testID: 'BookmarksScreen_List'});

    list.simulate('scroll', {nativeEvent: {contentOffset: {y: 1}}});
  });
});
