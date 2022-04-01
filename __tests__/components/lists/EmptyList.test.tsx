import React from 'react';
import {create} from 'react-test-renderer';
import EmptyList from '../../../src/components/lists/EmptyList';

describe('EmptyList', () => {
  it('matches snapshot', () => {
    const tree = create(<EmptyList />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
