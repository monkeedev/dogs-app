import React from 'react';
import {create} from 'react-test-renderer';
import ShareToBottomSheet from '../../../src/components/bottomSheets/ShareToBottomSheet';
import {shareBottomSheetRef} from '../../../src/utils/constants';
import {render, fireEvent, act} from '@testing-library/react-native';

// TODO: pointerEvents issue
describe('ShareToBottomSheet', () => {
  it('matches snapshot', () => {
    const tree = create(
      <ShareToBottomSheet ref={shareBottomSheetRef} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('shares image on press', () => {
    const {getByTestId} = render(
      <ShareToBottomSheet ref={shareBottomSheetRef} />,
    );
    const btn = getByTestId('ShareToBottomSheet_Content_Link');
    const evt = fireEvent(btn, 'onPress');

    // TODO: rewrite
    // expects Promise
    expect(typeof evt === 'object' && typeof evt.then === 'function').toBe(
      true,
    );
  });

  it('hides bottomsheet when pressing on a specified button', () => {
    const {getByTestId} = render(
      <ShareToBottomSheet ref={shareBottomSheetRef} />,
    );
    const btn = getByTestId('ShareToBottomSheet_CloseBtn');
    const spy = jest.spyOn(shareBottomSheetRef.current, 'toggle');

    act(() => {
      const evt = fireEvent(btn, 'onPress');

      expect(spy).toHaveBeenCalled();
      expect(evt).toBeUndefined();
    });
  });
});
