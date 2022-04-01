import React from 'react';
import renderer from 'react-test-renderer';
import {Text} from 'react-native';
import FakeInputButton from '../../../src/components/buttons/FakeInputButton';
import {render, fireEvent, act} from '@testing-library/react-native';

describe('FakeButton', () => {
  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <FakeInputButton action={() => console.log('@foo')}>
          <Text>foo</Text>
        </FakeInputButton>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('does nothing when action was not provided', () => {
    const {getByTestId} = render(
      <FakeInputButton>
        <Text>foo</Text>
      </FakeInputButton>,
    );
    const view = getByTestId('FakeInputButton_Pressable');

    act(() => {
      const evt = fireEvent(view, 'onPress');

      expect(evt).toBe('No action provided');
    });
  });

  it('does something when action was provided', () => {
    const mockedFn = jest.fn().mockImplementation(() => true);

    const {getByTestId} = render(
      <FakeInputButton action={mockedFn}>
        <Text>foo</Text>
      </FakeInputButton>,
    );
    const view = getByTestId('FakeInputButton_Pressable');

    act(() => {
      const evt = fireEvent(view, 'onPress');

      expect(evt).toBe(true);
    });
  });
});
