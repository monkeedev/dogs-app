import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import DefaultButton from '../../../src/components/buttons/DefaultButton';
import {Text} from 'react-native';
import {colors} from '../../../src/utils/constants';

describe('DefaultButton', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <DefaultButton onPress={() => console.log('@foo')}>
          <Text>foo</Text>
        </DefaultButton>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('styles as circle', () => {
    const wrapper = shallow(
      <DefaultButton onPress={() => console.log('@foo')} isCircle={true}>
        <Text>foo</Text>
      </DefaultButton>,
    );

    const {style} = wrapper
      .first()
      .find({testID: 'DefaultButton_View'})
      .props();

    expect(style.borderRadius).toBe(99);
  });

  it('styles as square', () => {
    const wrapper = shallow(
      <DefaultButton onPress={() => console.log('@foo')} isCircle={false}>
        <Text>foo</Text>
      </DefaultButton>,
    );

    const {style} = wrapper
      .first()
      .find({testID: 'DefaultButton_View'})
      .props();

    expect(style.borderRadius).toBe(7);
  });

  it('styles with custom color', () => {
    const wrapper = shallow(
      <DefaultButton
        onPress={() => console.log('@foo')}
        color={colors.turquoise}
        isCircle={false}>
        <Text>foo</Text>
      </DefaultButton>,
    );

    const {style} = wrapper
      .first()
      .find({testID: 'DefaultButton_View'})
      .props();

    expect(style.backgroundColor).toBe(colors.turquoise);
  });
});
