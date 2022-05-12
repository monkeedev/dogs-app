import React, {ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';
import {Preheader} from '../../../components/texts';

interface Props {
  title: string;
  children: ReactElement | ReactElement[];
}

export const List = ({title, children}: Props) => {
  return (
    <View style={styles.container}>
      <Preheader text={title} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 14,
  },
});
