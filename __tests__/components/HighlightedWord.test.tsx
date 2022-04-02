import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import HighlightedWord from '../../src/components/HighlightedWord';
import {TextStyle} from 'react-native';

const defaultProps = {
  text: '',
  highlight: '',
  style: null,
  highlightStyle: null,
};

const halfFilledProps = {
  text: 'foobarbaz',
  highlight: 'o',
};

const filledProps = {
  text: 'foobarbaz',
  highlight: 'o',
  style: {fontWeight: '500'} as TextStyle,
  highlightStyle: {backgroundColor: 'yellow'} as TextStyle,
};

describe('HighlightedWord', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(<HighlightedWord {...defaultProps} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('highlights the word', () => {
    const wrapper = shallow(<HighlightedWord {...filledProps} />);

    const parts = wrapper.find({testID: 'Highlighted'});
    expect(parts.length).toBe(2);
  });

  it('style and highlightedStyle props are null', () => {
    const wrapper = shallow(<HighlightedWord {...halfFilledProps} />);

    const parts = wrapper.find({style: {fontWeight: '800'}});
    expect(parts.length).toBe(2);
  });
});
