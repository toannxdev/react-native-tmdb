import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from '../components/modal';
import Status from '../constants/status';
import { getCurrentUser } from '../redux/slices/authSlice';
import DetailsScreen from '../screens/details';
import AuthNavigator from './auth';
import HomeNavigator from './home';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  console.log('Build MainNavigator');
  const { session, status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (status === Status.Initial) {
    return (
      <View>
        <StatusBar style='light' />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!session ? (
            <Stack.Screen
              name='auth'
              component={AuthNavigator}
              options={{ headerShown: false, animation: 'fade' }}
            />
          ) : (
            <>
              <Stack.Screen
                name='main'
                component={HomeNavigator}
                options={{ headerShown: false, animation: 'fade' }}
              />
              <Stack.Screen
                name='details'
                component={DetailsScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
        <StatusBar style='light' />
        <LoadingModal />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
