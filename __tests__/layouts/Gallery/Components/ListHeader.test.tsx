import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {create} from 'react-test-renderer';
import {mockedDispatch} from '../../../../jest.setup';
import {ListHeader} from '../../../../src/layouts/Gallery/Components/ListHeader';
import {colors} from '../../../../src/utils/constants';

const LIST = [
  'https://images.dog.ceo/breeds/labrador/n02099712_5648.jpg',
  'https://images.dog.ceo/breeds/retriever-golden/n02099601_8005.jpg',
  'https://images.dog.ceo/breeds/pyrenees/n02111500_7483.jpg',
];

describe('GalleryModal (ListHeader)', () => {
  beforeAll(() => {
    useSelector.mockReturnValue({
      bookmarks: LIST,
    });
    useDispatch.mockReturnValue(mockedDispatch);
  });

  it('matches snapshot', () => {
    const tree = create(
      <ListHeader uri={LIST[1].replace('golden', 'flatcoated')} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sets specified color to icon when uri is bookmarked', () => {
    const {getAllByTestId} = render(
      <View>
        <ListHeader uri={LIST[0]} />
        <ListHeader uri={LIST[1].replace('golden', 'flatcoated')} />
      </View>,
    );

    const view = getAllByTestId('ListHeader_Icon');

    expect(view[0].children[0].props.children.props.color).toBe(colors.white);
    expect(view[1].children[0].props.children.props.color).toBe(
      colors.turquoise,
    );
  });

  it('dispatches action', () => {
    const {getAllByTestId} = render(<ListHeader uri={LIST[0]} />);
    const btn = getAllByTestId('DefaultButton_TouchableOpacity');

    act(() => {
      fireEvent.press(btn[0]);
      expect(mockedDispatch).toHaveBeenCalled();
    });
  });
});
