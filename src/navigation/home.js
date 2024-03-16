import { Feather } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/home/home';
import SearchScreen from '../screens/home/search';
import WatchListScreen from '../screens/home/watchList';

// export const HomeStackParamList = {
//   Home: undefined,
//   Details: { itemId: null, otherParam: null },
// };

const Tab = createMaterialBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='home' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='search' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='WatchList'
        component={WatchListScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name='bookmark' color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
