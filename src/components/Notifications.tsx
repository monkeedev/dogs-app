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
import {Icon} from 'react-native-elements/dist/icons/Icon';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  NotificationColor,
  NotificationIcon,
  NotificationNumber,
  NotificationType,
} from '../utils/types';

const TIMEOUT = 3000;

const Notifications = React.forwardRef((_, ref: any) => {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const [type, setType] = useState<NotificationType>('info');
  const [prevType, setPrevType] = useState<NotificationType>('info');

  const [height, setHeight] = useState(Dimensions.get('screen').height);
  const timerRef = useRef<any | null>(null);

  const isOpened = useSharedValue(0);
  const colorNow = useSharedValue(NotificationNumber[type]);

  const rStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      colorNow.value,
      [NotificationNumber[prevType], NotificationNumber[type]],
      [NotificationColor[prevType], NotificationColor[type]],
    ),
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

  const notificationStyles = {
    backgroundColor: NotificationColor[type],
    paddingTop: insets.top + 21,
  };

  useImperativeHandle(ref, () => ({
    stack: [],
    show: (msg: string, t: NotificationType = 'info') => {
      if (!msg || msg === '') {
        return;
      } else {
        ref.current?.hide();

        isOpened.value = withSpring(1, springConfig);

        setText(msg);
        setPrevType(NotificationNumber[colorNow.value] as NotificationType);
        setType(t);

        colorNow.value = withSpring(NotificationNumber[t], springConfig);
        timerRef.current = setTimeout(ref.current?.hide, TIMEOUT);
      }
    },
    hide: () => {
      isOpened.value = withSpring(0, springConfig);

      clearTimeout(timerRef.current);
    },
  }));

  return (
    <Animated.View
      style={[styles.container, {top: -height}, notificationStyles, rStyles]}
      onLayout={e => setHeight(e.nativeEvent.layout.height)}>
      <TouchableOpacity onPress={ref.current?.hide}>
        <View style={styles.inner}>
          <Icon
            name={NotificationIcon[type]}
            type={'ionicon'}
            size={28}
            color={colors.white}
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

export default Notifications;
