import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface Props {
  size?: ActivityIndicatorProps['size'];
  style?: StyleProp<ViewStyle>;
}

const Loading = ({size = 'large', style = {}}: Props) => {
  return (
    <View testID={'Loading_View'} style={[styles.container, style]}>
      <ActivityIndicator testID={'Loading_Indicator'} size={size} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
