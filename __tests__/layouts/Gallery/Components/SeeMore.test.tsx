import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {create} from 'react-test-renderer';
import SeeMore from '../../../../src/layouts/Gallery/Components/SeeMore';
import {mockedNavigate} from '../../../../jest.setup';

describe('GalleryModal (SeeMore)', () => {
  it('matches snapshot', () => {
    const tree = create(<SeeMore search="foo" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('navigates to another screen', () => {
    const {getByTestId} = render(<SeeMore search={'foo'} />);
    const btn = getByTestId('DefaultButton_TouchableOpacity');

    act(() => {
      fireEvent.press(btn);
      expect(mockedNavigate).toHaveBeenCalled();
    });
  });
});
