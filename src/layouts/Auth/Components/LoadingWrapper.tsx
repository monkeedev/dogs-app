import React, {ReactElement, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme} from '../../../assets/theme';
import {getUserStorage} from '../../../redux/rootSelector';

interface Props {
  children: ReactElement | ReactElement[];
}

export const LoadingWrapper: React.FC<Props> = ({children}) => {
  const {mode} = useTheme();
  const [height, setHeight] = useState(0);

  const {user} = useSelector(getUserStorage);

  return (
    <View
      style={[styles.container, height > 0 ? {height} : null]}
      onLayout={e => setHeight(e.nativeEvent.layout.height)}>
      {user.loading ? (
        <ActivityIndicator size={'small'} color={mode.background} />
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 21,
    marginHorizontal: 21,
  },
});
