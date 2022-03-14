/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/configureStore';
import Navigator from './src/layouts/Navigator/Navigator';
import {LogBox} from 'react-native';
import ShareToBottomSheet from './src/components/bottomSheets/ShareToBottomSheet';
import {notificationRef, shareBottomSheetRef} from './src/utils/constants';
import Notification from './src/components/Notification';

LogBox.ignoreLogs(['[react-native-gesture-handler]', 'Require cycle']);

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>

      <ShareToBottomSheet ref={shareBottomSheetRef} />
      <Notification ref={notificationRef} />
    </SafeAreaProvider>
  );
};

export default App;
