import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import {
  BottomTabBarButtonProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';

import { COLORS, SHADOWS, SIZES } from '../constants';
import { PetsScreen } from '../screens/main';
import { useContext } from 'react';
import { MainContext } from '../context/MainContext';

const Tab = createBottomTabNavigator();

const ICON_SIZE = 25;
const TAB_HEIGHT = 60;

const Tabs: React.FC = () => {
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: true,
    headerStyle: {
      backgroundColor: 'transparent',
      height: TAB_HEIGHT * 1.25,
    },
    tabBarShowLabel: false,
    tabBarStyle: {
      height: TAB_HEIGHT,
      borderTopWidth: 0,
      backgroundColor: 'transparent',
      position: 'absolute',
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="pets">
      <Tab.Screen
        name="home"
        component={PetsScreen}
        options={{
          headerTitle: () => <Header />,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={ICON_SIZE}
              color={focused ? COLORS.primary : COLORS.gray.medium}
            />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={PetsScreen}
        options={{
          headerTitle: () => <Header />,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="info"
              size={ICON_SIZE}
              color={focused ? COLORS.primary : COLORS.gray.medium}
            />
          ),
        }}
      />
      <Tab.Screen
        name="pets"
        component={PetsScreen}
        options={{
          headerTitle: () => <Header />,
          tabBarIcon: () => (
            <MaterialIcons name="pets" size={ICON_SIZE * 1.1} color={COLORS.white} />
          ),
          tabBarButton: (props) => <PetsButton {...props} />,
        }}
      />
      <Tab.Screen
        name="notifications"
        component={PetsScreen}
        options={{
          headerTitle: () => <Header />,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="notifications"
              size={ICON_SIZE}
              color={focused ? COLORS.primary : COLORS.gray.medium}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={PetsScreen}
        options={{
          headerTitle: () => <Header />,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={ICON_SIZE}
              color={focused ? COLORS.primary : COLORS.gray.medium}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const PetsButton: React.FC<BottomTabBarButtonProps> = ({
  children,
  onPress,
  accessibilityState,
}) => (
  <TouchableOpacity
    style={[
      { top: -(TAB_HEIGHT / 2) * 0.9, justifyContent: 'center', alignItems: 'center' },
      accessibilityState?.selected ? SHADOWS.medium : SHADOWS.medium,
    ]}
    activeOpacity={0.9}
    onPress={onPress}
  >
    <View
      style={[
        { width: TAB_HEIGHT * 0.95, aspectRatio: 1, borderRadius: 20 },
        accessibilityState?.selected
          ? { backgroundColor: COLORS.primary }
          : { backgroundColor: COLORS.gray.medium },
      ]}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const Header: React.FC = () => {
  const { user } = useContext(MainContext);
  return (
    <View style={styles.header}>
      <Text style={styles.hello}>Hello, {user.displayName?.split(' ')[0]}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  hello: {
    color: COLORS.gray.dark,
    fontFamily: 'semiBold',
    fontSize: SIZES.h3 + 2,
  },
});

export default Tabs;
