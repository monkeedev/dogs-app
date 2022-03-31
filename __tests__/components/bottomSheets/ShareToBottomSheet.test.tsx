import React from 'react';
import {create} from 'react-test-renderer';
import ShareToBottomSheet from '../../../src/components/bottomSheets/ShareToBottomSheet';
import {shareBottomSheetRef} from '../../../src/utils/constants';
import {render, fireEvent, act} from '@testing-library/react-native';

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
    const evt = fireEvent(btn, 'onPress');

    expect(evt).toBe(1);
  });

  // it('opens and hides bottomsheet when pressing on a specified buttons', () => {
  //   const {getByTestId} = render(
  //     <ShareToBottomSheet ref={shareBottomSheetRef} />,
  //   );
  //   const oBtn = getByTestId('ShareToBottomSheet_OpenBtn');
  //   const cBtn = getByTestId('ShareToBottomSheet_CloseBtn');

  //   act(() => {
  //     // open bottomsheet
  //     const oEvt = fireEvent(oBtn, 'onPress');
  //     console.log('@', oEvt);
  //     expect(oEvt).toBe(1);
  //   });
  // });
});
