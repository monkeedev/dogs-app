import React from 'react';
import CustomStatusBar from '../../src/components/CustomStatusBar';
import {shallow} from 'enzyme';

jest.mock('../../src/utils/functions', () => ({
  isAndroid: jest.fn(() => true),
}));

describe('CustomStatusBar (for Android)', () => {
  it('sets height for android', () => {
    const wrapper = shallow(
      <CustomStatusBar backgroundColor={'transparent'} />,
    );

    const height = wrapper.first().props().style.height;
    expect(height).toBe(56);
  });
});
