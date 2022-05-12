import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getUserStorage} from '../../redux/rootSelector';
import {notificationRef} from '../../utils/constants';
import {LoginScreen, SignUpScreen} from '../Auth';
import {RootStackParamList} from './utils/routes';

const Stack = createStackNavigator<RootStackParamList>();

export function AuthNavigator() {
  const {user} = useSelector(getUserStorage);

  useEffect(() => {
    if (user.error !== '') {
      notificationRef.current?.show(user.error, 'error');
    }
  }, [user.error]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Group>
          <Stack.Screen name={'Login'} component={LoginScreen} />
          <Stack.Screen name={'SignUp'} component={SignUpScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
