import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ShareToBottomSheet} from './src/components/bottomSheets';
import Notifications from './src/components/Notifications';
import Navigator from './src/layouts/Navigator/Navigator';
import {persistor, store} from './src/redux/configureStore';
import {notificationRef, shareBottomSheetRef} from './src/utils/constants';

LogBox.ignoreLogs([
  '[react-native-gesture-handler]',
  'EventEmitter.removeListener',
]);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>

      <ShareToBottomSheet ref={shareBottomSheetRef} />
      <Notifications ref={notificationRef} />
    </SafeAreaProvider>
  );
};

export default App;
