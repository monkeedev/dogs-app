import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface Props {
  size?: ActivityIndicatorProps['size'];
  style?: StyleProp<ViewStyle>;
}

const Loading = (props: Props) => {
  return (
    <View style={[styles.container, props.style]}>
      <ActivityIndicator size={props.size ?? 'large'} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
