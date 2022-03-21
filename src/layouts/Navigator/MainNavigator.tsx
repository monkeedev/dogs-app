import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {tabs} from './tabs';
import {animationConfig, colors} from '../../utils/constants';
import {Icon} from 'react-native-elements';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import GalleryModal from '../Gallery/GalleryModal';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {RootStackParamList} from './routes';

const RADIUS = 14;
const TAB_BAR_HEIGHT = 56;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

interface TabProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const TabBar = ({state, descriptors, navigation}: TabProps) => {
  const route = useRoute();
  const width = useSharedValue(0);
  const activeIdx = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => ({
    width: width.value - 7 * 2,
    opacity: withSpring(+(width.value !== 0)),
    transform: [
      {
        translateX: withTiming(width.value * activeIdx.value, animationConfig),
      },
    ],
  }));

  const oStyles = useAnimatedStyle(() => ({
    opacity: withSpring(+(width.value !== 0)),
  }));

  useAnimatedReaction(
    () => state.index,
    () => {
      activeIdx.value = state.index;
    },
    [state.index],
  );

  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const handlePress = () => {
          'worklet';
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          activeIdx.value = index;

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(
              {name: route.name, merge: true},
              {activeIdx: index},
            );
          }
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={handlePress}
            style={{flex: 1}}
            onLayout={e => (width.value = e.nativeEvent.layout.width)}>
            <Animated.View style={oStyles}>
              {options.tabBarIcon(isFocused)}
            </Animated.View>
          </TouchableOpacity>
        );
      })}

      <Animated.View style={[styles.box, rStyle]} pointerEvents={'none'} />
    </View>
  );
};

const CatalogTabs = () => {
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
                  color={focused ? colors.white : colors.turquoise}
                  type={type}
                  tvParallaxProperties={false}
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

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name={'CatalogTabs'} component={CatalogTabs} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}>
        <Stack.Screen name={'Gallery'} component={GalleryModal} />
      </Stack.Group>
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingHorizontal: 7,
    height: TAB_BAR_HEIGHT,
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
  },
  box: {
    borderRadius: RADIUS,
    marginHorizontal: 14,
    paddingHorizontal: 28,
    height: TAB_BAR_HEIGHT / 1.25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: TAB_BAR_HEIGHT / 2 - TAB_BAR_HEIGHT / 1.25 / 2,
    backgroundColor: colors.turquoise,
    zIndex: -1,
  },
});

export default MainNavigator;
