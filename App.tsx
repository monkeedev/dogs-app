/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CatalogScreen from './src/layouts/Catalog/CatalogScreen';

const App = () => {
  return (
    <SafeAreaProvider>
      <CatalogScreen />
    </SafeAreaProvider>
  );
};

export default App;
