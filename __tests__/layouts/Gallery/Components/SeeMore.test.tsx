import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {create} from 'react-test-renderer';
import SeeMore from '../../../../src/layouts/Gallery/Components/SeeMore';
import {mockedDispatch, mockedNavigate} from '../../../../jest.setup';
import {useDispatch} from 'react-redux';

describe('GalleryModal (SeeMore)', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(mockedDispatch);
  });

  it('matches snapshot', () => {
    const tree = create(<SeeMore search="foo" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('navigates to another screen', () => {
    const {getByTestId} = render(<SeeMore search={'retriever-golden'} />);
    const btn = getByTestId('DefaultButton_TouchableOpacity');

    act(() => {
      fireEvent.press(btn);
      expect(mockedNavigate).toHaveBeenCalled();
    });
  });
});
