import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/auth/onboarding';
import SignInScreen from '../screens/auth/signIn';
import SignUpScreen from '../screens/auth/signUp';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName='onboarding'>
      <Stack.Screen
        name='onboarding'
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='signIn'
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='signUp'
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
