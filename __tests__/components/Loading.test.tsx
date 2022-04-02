import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../../src/components/Loading';
import {shallow} from 'enzyme';

describe('Loading', () => {
  it('snapshot', () => {
    const tree = renderer.create(<Loading />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with default props', () => {
    const wrapper = shallow(<Loading />);

    const view = wrapper.find({testID: 'Loading_View'}).first();
    expect(view.exists()).toBe(true);

    const viewStyles = view.props().style;
    expect(Object.keys(viewStyles[0]).length).toBeGreaterThan(0);
    expect(Object.keys(viewStyles[1]).length).toBe(0);

    const indicator = wrapper.find({testID: 'Loading_Indicator'}).first();
    expect(indicator.exists()).toBe(true);

    const indicatorSize = indicator.props().size;
    expect(indicatorSize).toBe('large');
  });

  it('renders with style prop', () => {
    const wrapper = shallow(<Loading style={{backgroundColor: 'red'}} />);

    const view = wrapper.find({testID: 'Loading_View'}).first();
    expect(view.exists()).toBe(true);

    const viewStyles = view.props().style;
    expect(Object.keys(viewStyles[0]).length).toBeGreaterThan(0);
    expect(Object.keys(viewStyles[1]).length).toBeGreaterThan(0);
  });

  it('renders with size prop (string)', () => {
    const wrapper = shallow(<Loading size={'small'} />);
    const expected = ['small', 'large'];

    const indicator = wrapper.find({testID: 'Loading_Indicator'}).first();
    expect(indicator.exists()).toBe(true);

    const indicatorSize = indicator.props().size;
    expect(expected.includes(indicatorSize)).toBe(true);
  });

  it('renders with size prop (number)', () => {
    const wrapper = shallow(<Loading size={20} />);

    const indicator = wrapper.find({testID: 'Loading_Indicator'}).first();
    expect(indicator.exists()).toBe(true);

    const indicatorSize = indicator.props().size;
    expect(indicatorSize).toBe(20);
  });
});
