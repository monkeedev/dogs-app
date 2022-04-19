import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../assets/theme';

interface Props {
  size?: ActivityIndicatorProps['size'];
  style?: StyleProp<ViewStyle>;
  isFullScreen?: boolean;
}

export const Loading = ({size = 'large', style = {}, isFullScreen}: Props) => {
  const {mode} = useTheme();

  return (
    <View
      testID={'Loading_View'}
      style={{
        ...styles.container,
        ...(isFullScreen ? styles.fullscreen : {}),
        backgroundColor: mode.card,
      }}>
      <ActivityIndicator testID={'Loading_Indicator'} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  fullscreen: {position: 'absolute', width: '100%', height: '100%'},
});
