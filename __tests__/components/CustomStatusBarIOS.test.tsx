import React from 'react';
import renderer from 'react-test-renderer';
import CustomStatusBar from '../../src/components/CustomStatusBar';
import {shallow} from 'enzyme';

jest.mock('../../src/utils/functions', () => ({
  isAndroid: jest.fn(() => false),
}));

describe('CustomStatusBar (for iOS)', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(<CustomStatusBar backgroundColor={'transparent'} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('sets height for iOS', () => {
    const wrapper = shallow(
      <CustomStatusBar backgroundColor={'transparent'} />,
    );

    const height = wrapper.first().props().style.height;
    expect(height).toBe(44);
  });
});
