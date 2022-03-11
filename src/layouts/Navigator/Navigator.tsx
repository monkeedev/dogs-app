import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MainNavigator from './MainNavigator';
// import BottomSheet from 'reanimated-bottom-sheet';
// import {shareBottomSheetRef} from '../../utils/constants';

const Navigator = () => {
  // const renderContent = () => (
  //   <View
  //     style={{
  //       backgroundColor: 'white',
  //       padding: 16,
  //       height: 450,
  //     }}>
  //     <Text>Swipe down to close</Text>
  //   </View>
  // );

  return (
    <>
      <MainNavigator />
      {/* <BottomSheet
        ref={shareBottomSheetRef}
        snapPoints={[200, 0]}
        renderContent={renderContent}
      /> */}
    </>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
