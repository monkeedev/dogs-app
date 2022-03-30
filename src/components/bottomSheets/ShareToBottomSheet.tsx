import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {colors, springConfig, text} from '../../utils/constants';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useImperativeHandle} from 'react';
import {shareImage} from '../../utils/functions';

const PANEL_HEIGHT = 177;
const ICON_SIZE = 56;
const ICONS = [
  {
    name: 'link-2',
    type: 'feather',
    action: 'CopyLink',
    iconColor: 'light',
    bgColor: colors.darkTurquoise,
    placeholder: 'Link',
  },
  {
    name: 'message-circle',
    type: 'feather',
    iconColor: 'light',
    action: 'MsgApp',
    bgColor: colors.darkTurquoise,
    placeholder: 'Message',
  },
  {
    name: 'mail',
    type: 'feather',
    iconColor: 'light',
    action: 'MailApp',
    bgColor: colors.darkTurquoise,
    placeholder: 'Mail',
  },
  {
    name: 'paper-plane',
    type: 'ionicon',
    iconColor: 'light',
    action: 'TelegramApp',
    bgColor: colors.darkTurquoise,
    placeholder: 'Telegram',
  },
  {
    name: 'facebook',
    type: 'feather',
    iconColor: 'light',
    action: 'FacebookApp',
    bgColor: colors.darkTurquoise,
    placeholder: 'Facebook',
  },
  {
    name: 'instagram',
    type: 'feather',
    action: 'InstagramApp',
    placeholder: 'Instagram',
    iconColor: 'light',
    bgColor: colors.darkTurquoise,
  },
];

const ShareToBottomSheet = React.forwardRef((_, ref: any) => {
  const [isOpened, setOpened] = useState(false);
  const [uri, setUri] = useState('');

  const handleShareRef = useRef(async (uri: string, type: string) => {
    await shareImage(uri, type);
  });

  const bottomSheet = useSharedValue(0);

  const bgOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(bottomSheet.value, [0, 1], [0, 0.85]),
  }));

  const translation = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          bottomSheet.value,
          [0, 1],
          [PANEL_HEIGHT, 0],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  useImperativeHandle(ref, () => ({
    toggle: (u: string) => {
      const v = bottomSheet.value === 0 ? 1 : 0;
      bottomSheet.value = withSpring(v, springConfig);

      setUri(u);
      setOpened(prev => !prev);
    },
  }));

  const Content = () => (
    <View testID={'ShareToBottomSheet_View'} style={styles.container}>
      <View style={styles.headerBlock}>
        <Pressable onPress={() => ref.current.toggle()}>
          <Icon
            name={'close-sharp'}
            type={'ionicon'}
            size={21}
            color={colors.darkTurquoise}
          />
        </Pressable>
        <Text style={styles.headerText}>Share doggo</Text>
      </View>

      <FlatList
        data={ICONS}
        horizontal={true}
        contentContainerStyle={styles.list}
        keyExtractor={item => `${item.type}_${item.name}`}
        ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => handleShareRef.current(uri, item.action)}>
            <View
              style={[styles.listItemIcon, {backgroundColor: item.bgColor}]}>
              <Icon
                type={item.type}
                name={item.name}
                size={28}
                color={item.iconColor === 'light' ? colors.white : colors.black}
              />
            </View>
            <Text style={styles.listItemPlaceholder} numberOfLines={2}>
              {item.placeholder}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <>
      <Animated.View
        ref={ref}
        style={[styles.bottomSheetContainer, translation]}>
        <Content />
      </Animated.View>
      <View
        style={styles.bottomSheetBackgroundContainer}
        pointerEvents={isOpened ? 'auto' : 'none'}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={() => ref.current.toggle()}>
          <Animated.View
            style={[styles.bottomSheetBackgroundInner, bgOpacity]}
          />
        </TouchableOpacity>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 14,
    paddingTop: 21,
    height: '100%',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    width: Dimensions.get('screen').width,
  },
  list: {
    marginTop: 21,
    paddingHorizontal: 14,
  },
  listItemSeparator: {
    width: 14,
  },
  listItemIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemPlaceholder: {
    textAlign: 'center',
    marginTop: 3.5,
    fontSize: 12,
    color: colors.darkGray,
  },
  headerBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 14,
  },
  headerText: {
    fontSize: text.m,
    fontWeight: '900',
    color: colors.darkGray,
    marginLeft: 7,
  },
  bottomSheetBackgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  bottomSheetBackgroundInner: {
    flex: 1,
    backgroundColor: colors.black,
  },
  bottomSheetContainer: {
    height: PANEL_HEIGHT,
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
  },
});

export default ShareToBottomSheet;
