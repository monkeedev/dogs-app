import React from 'react';
import renderer from 'react-test-renderer';
import CustomStatusBar from '../../src/components/CustomStatusBar';

describe('CustomStatusBar', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(<CustomStatusBar backgroundColor={'transparent'} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
