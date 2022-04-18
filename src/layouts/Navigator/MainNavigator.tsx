import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import {GalleryModal, SearchScreen} from '..';
import {useTheme} from '../../assets/theme';
import {getUserStorage} from '../../redux/rootSelector';
import {CatalogTabs} from './Components';
import {RootStackParamList} from './utils/routes';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const {theme} = useSelector(getUserStorage);
  const {mode} = useTheme();

  return (
    <NavigationContainer
    // theme={{dark: theme === 'dark', colors: mode}}
    >
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

export default MainNavigator;
