/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import CatalogScreen from './src/layouts/Catalog/CatalogScreen';

const App = () => {
  return (
    <SafeAreaView>
      <CatalogScreen />
    </SafeAreaView>
  );
};

export default App;
