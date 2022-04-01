import {shallow} from 'enzyme';
import React from 'react';
import {create} from 'react-test-renderer';
import SearchInput from '../../../src/components/inputs/SearchInput';

describe('SearchInput', () => {
  it('matches snapshot', () => {
    const tree = create(<SearchInput />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders disabled view', () => {
    const wrapper = shallow(<SearchInput isDisabled={true} />);
    const view = wrapper.find({testID: 'SearchInput_Disabled'});

    expect(view.exists()).toBe(true);
  });

  it('renders disabled view with placeholder same as view', () => {
    const wrapper = shallow(
      <SearchInput isDisabled={true} placeholder={'foo'} value={''} />,
    );
    const view = wrapper.find({testID: 'SearchInput_Disabled'});

    expect(view.exists()).toBe(true);
  });
});
