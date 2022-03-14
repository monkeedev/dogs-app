import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useImperativeHandle, useRef, useState} from 'react';
import {colors, springConfig} from '../utils/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon} from 'react-native-elements';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

enum NotificationColor {
  info = '#0275d8',
  success = '#5cb85c',
  warning = '#f0ad4e',
  error = '#d9534f',
}

enum NotificationIcon {
  info = 'information-circle-outline',
  success = 'ios-checkmark-circle-outline',
  warning = 'warning-outline',
  error = 'sad-outline',
}

const TIMEOUT = 3000;

type NotificationType = 'info' | 'success' | 'warning' | 'error';

const Notification = React.forwardRef((_, ref) => {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const [type, setType] = useState<NotificationType>('info');
  const [height, setHeight] = useState(0);

  const timerRef = useRef<any | null>(null);

  const isOpened = useSharedValue(0);
  const transformStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          isOpened.value,
          [0, 1],
          [0, height],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  useImperativeHandle(ref, () => ({
    stack: [],
    show: (msg: string, t: NotificationType = 'info') => {
      if (!msg || msg === '') {
        return;
      } else {
        isOpened.value = withSpring(1, springConfig);

        setText(msg);
        setType(t);

        timerRef.current = setTimeout(ref.current?.hide, TIMEOUT);
      }
    },
    hide: () => {
      isOpened.value = withSpring(0, springConfig);

      clearTimeout(timerRef.current);
    },
  }));

  const notificationStyles = {
    backgroundColor: NotificationColor[type],
    paddingTop: insets.top + 21,
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {top: -height},
        notificationStyles,
        transformStyles,
      ]}
      onLayout={e => setHeight(e.nativeEvent.layout.height)}>
      <TouchableOpacity onPress={ref.current?.hide}>
        <View style={styles.inner}>
          <Icon
            name={NotificationIcon[type]}
            type={'ionicon'}
            size={28}
            color={colors.white}
            tvParallaxProperties={false}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  inner: {
    width: Dimensions.get('screen').width,
    paddingHorizontal: 21,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textContainer: {
    paddingLeft: 7,
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
    flexShrink: 1,
  },
});

export default Notification;
