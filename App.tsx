/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CatalogScreen from './src/layouts/Catalog/CatalogScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/configureStore';
import Navigator from './src/layouts/Navigator/Navigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
