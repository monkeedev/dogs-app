import React from 'react';
import {act, create} from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';
import Notifications from '../../src/components/Notifications';
import {notificationRef} from '../../src/utils/constants';

describe('Notifications', () => {
  it('matches snapshot', () => {
    jest.useFakeTimers();

    const tree = create(<Notifications ref={notificationRef} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('does not show notification with empty message', () => {
    act(() => {
      const spy = jest.spyOn(notificationRef.current, 'show');
      const isVisible = notificationRef.current?.show('', 'info');

      expect(spy).toHaveBeenCalled();
      expect(isVisible).toBe(false);
    });
  });

  it('shows notification with non-empty message and default type', () => {
    act(() => {
      const spy = jest.spyOn(notificationRef.current, 'show');
      const isVisible = notificationRef.current?.show('info');

      expect(spy).toHaveBeenCalled();
      expect(isVisible).toBe(true);
    });
  });

  it('shows notification with non-empty message and custom type', () => {
    act(() => {
      const spy = jest.spyOn(notificationRef.current, 'show');
      const isVisible = notificationRef.current?.show('error', 'error');

      expect(spy).toHaveBeenCalled();
      expect(isVisible).toBe(true);
    });
  });

  it('renders and triggers onLayout', () => {
    const {getByTestId} = render(<Notifications ref={notificationRef} />);
    const view = getByTestId('Notification');

    act(() => {
      const evt = fireEvent(view, 'onLayout', {
        nativeEvent: {
          layout: {
            height: 0,
          },
        },
      });

      expect(evt).toBeUndefined();
    });
  });
});
