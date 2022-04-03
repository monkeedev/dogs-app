import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/configureStore';
import Navigator from './src/layouts/Navigator/Navigator';
import {LogBox} from 'react-native';
import ShareToBottomSheet from './src/components/bottomSheets/ShareToBottomSheet';
import {notificationRef, shareBottomSheetRef} from './src/utils/constants';
import Notifications from './src/components/Notifications';
import SplashScreen from 'react-native-splash-screen';

LogBox.ignoreLogs(['[react-native-gesture-handler]']);

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
