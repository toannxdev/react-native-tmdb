import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>OnboardingScreen</Text>
      <Pressable onPress={() => navigation.replace('signIn')}>
        <Text>Skip</Text>
      </Pressable>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
