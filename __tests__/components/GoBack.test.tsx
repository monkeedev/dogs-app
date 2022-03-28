import React from 'react';
import renderer from 'react-test-renderer';
import GoBack from '../../src/components/GoBack';
import {shallow} from 'enzyme';

describe('GoBack', () => {
  it('snapshot', () => {
    const tree = renderer.create(<GoBack />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('event', () => {
    const wrapper = shallow(<GoBack />)
      .find({testID: 'GoBack_Button'})
      .first();
    expect(wrapper.exists()).toBe(true);

    const wrapperWithProps = wrapper.props();

    const handlerKeyId = Object.keys(wrapperWithProps).indexOf('onPress');
    expect(handlerKeyId !== -1).toBe(true);

    const handlerValueId = typeof Object.values(wrapperWithProps)[handlerKeyId];
    expect(handlerValueId !== 'undefined').toBe(true);
  });
});
