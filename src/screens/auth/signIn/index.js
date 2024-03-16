import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Colors from '../../../constants/colors';
import { signIn, signInAsGuest } from '../../../redux/slices/authSlice';

const SignInScreen = () => {
  const refInput2 = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onSignIn = () => {
    const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!usernameRegex.test(username)) {
      Alert.alert('Invalid email', 'Please enter a valid email.');
      return;
    }

    const credentials = {
      username: username,
      password: password,
    };
    dispatch(signIn(credentials));
  };

  const onContinue = () => {
    dispatch(signInAsGuest());
  };

  const onGoToSignUp = async () => {
    await WebBrowser.openBrowserAsync(
      'https://www.themoviedb.org/signup?language=en'
    );
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ImageBackground
        source={require('../../../assets/background.webp')}
        style={styles.background}
      />

      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.75)', 'rgba(0,0,0,1)']}
        style={styles.container}
      >
        <View style={styles.content}>
          <Image
            source={require('../../../assets/tmdbq.webp')}
            resizeMode='contain'
            style={styles.image}
          />
          <TextInput
            placeholder='Username'
            returnKeyType='next'
            onSubmitEditing={() => refInput2.current.focus()}
            blurOnSubmit={false}
            style={[styles.textInput, { marginTop: 100 }]}
            onChangeText={setUsername}
          />

          <View style={[styles.passwordInput, { marginTop: 12 }]}>
            <TextInput
              ref={refInput2}
              placeholder='Password'
              returnKeyType='done'
              secureTextEntry={!showPassword}
              style={{ flex: 1 }}
              onSubmitEditing={onSignIn}
              onChangeText={setPassword}
            />

            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color='black'
              style={styles.icon}
              onPress={toggleShowPassword}
            />
          </View>
          <Button
            title='Sign In'
            buttonStyle={styles.button}
            containerStyle={{
              width: '80%',
              marginTop: 60,
            }}
            onPress={onSignIn}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Text style={styles.text}>Don't have an account?</Text>
            <Pressable onPress={onGoToSignUp}>
              <Text style={styles.textSignUp}>Sign Up</Text>
            </Pressable>
          </View>
          <Button
            title='Continue'
            buttonStyle={styles.button}
            containerStyle={{
              width: '80%',
              marginTop: 60,
            }}
            onPress={onContinue}
          />
        </View>
      </LinearGradient>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 120,
    width: 180,
    borderColor: Colors.outlined,
    borderWidth: 1,
    backgroundColor: Colors.background,
    marginTop: 80,
  },
  textInput: {
    height: 48,
    width: '80%',
    borderColor: Colors.outlined,
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  passwordInput: {
    flexDirection: 'row',
    height: 48,
    width: '80%',
    borderColor: Colors.outlined,
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.background,
    borderRadius: 2,
    borderColor: Colors.outlined,
    borderWidth: 1,
    height: 48,
  },
  text: {
    color: 'white',
  },
  textSignUp: {
    color: Colors.primary,
    fontSize: 16,
    marginLeft: 8,
  },
});
