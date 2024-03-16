import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../../../redux/slices/authSlice';

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const onSignIn = () => {
    const credentials = {
      email: '',
      password: '',
    };
    dispatch(signIn(credentials));
  };

  const onGoToSignUp = () => {
    navigation.navigate('signUp');
  };

  return (
    <View style={styles.container}>
      <Text>SignInScreen</Text>
      <Button title='Sign In' onPress={onSignIn} />
      <Button title='Go to Sign Up' onPress={onGoToSignUp} />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
