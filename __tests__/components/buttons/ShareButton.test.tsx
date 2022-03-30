import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent, act} from '@testing-library/react-native';
import ShareButton from '../../../src/components/buttons/ShareButton';
import ShareToBottomSheet from '../../../src/components/bottomSheets/ShareToBottomSheet';
import {shareBottomSheetRef} from '../../../src/utils/constants';

describe('ShareButton', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<ShareButton uri={''} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('does nothing when uri was not provided or empty', () => {
    const {getByTestId} = render(<ShareButton uri={''} />);
    const view = getByTestId('DefaultButton_TouchableOpacity');

    act(() => {
      const evt = fireEvent(view, 'onPress');

      expect(evt).toBeUndefined();
    });
  });

  it('opens bottomsheet', () => {
    render(<ShareToBottomSheet ref={shareBottomSheetRef} />);
    const {getByTestId: btnTestID} = render(<ShareButton uri={'foo'} />);

    const btn = btnTestID('DefaultButton_TouchableOpacity');
    const spy = jest.spyOn(shareBottomSheetRef.current, 'toggle');

    act(() => {
      const evt = fireEvent(btn, 'onPress');

      expect(spy).toHaveBeenCalled();
      expect(evt).toBeUndefined();
    });
  });
});
