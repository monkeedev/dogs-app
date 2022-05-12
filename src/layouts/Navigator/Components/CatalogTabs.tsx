import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {useTheme} from '../../../assets/theme';
import {colors} from '../../../utils/constants';
import {tabs} from '../utils/tabs';
import {TabBar} from './TabBar';

const Tab = createBottomTabNavigator();

export const CatalogTabs = () => {
  const {mode} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <TabBar {...props} />}>
      {tabs.map(
        ({name, component, icon: {activeName, defaultName, type, size}}) => (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={{
              tabBarIcon: focused => (
                <Icon
                  name={focused ? activeName : defaultName}
                  color={focused ? mode.card : colors.turquoise}
                  type={type}
                  size={size}
                />
              ),
            }}
          />
        ),
      )}
    </Tab.Navigator>
  );
};
