import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  size?: ActivityIndicatorProps['size'];
  style?: StyleProp<ViewStyle>;
}

export const Loading = ({size = 'large', style = {}}: Props) => {
  return (
    <View testID={'Loading_View'} style={[styles.container, style]}>
      <ActivityIndicator testID={'Loading_Indicator'} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
