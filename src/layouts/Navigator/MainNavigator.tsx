import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {GalleryModal, SearchScreen} from '..';
import {CatalogTabs} from './Components';
import {RootStackParamList} from './utils/routes';

const Stack = createStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen name={'CatalogTabs'} component={CatalogTabs} />
          <Stack.Screen
            options={{animationEnabled: false}}
            name={'Search'}
            component={SearchScreen}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name={'Gallery'} component={GalleryModal} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
