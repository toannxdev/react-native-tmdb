import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigator from './home';
import DetailsScreen from '../screens/details';
import { useDispatch, useSelector } from 'react-redux';
import Status from '../constants/status';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './auth';
import { useEffect } from 'react';
import { getCurrentUser } from '../redux/slices/authSlice';
import LoadingModal from '../components/modal';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const { user, status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (status === Status.Initial) {
    return <View />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user == null ? (
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
      <LoadingModal />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
