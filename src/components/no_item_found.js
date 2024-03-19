import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

const NoItemFound = () => {
  return (
    <View styles={styles.container}>
      <Image
        style={{ width: '100%', height: 200 }}
        resizeMode='contain'
        source={require('../assets/tmdbq.webp')}
      />
      <Text style={styles.title}>
        We are sorry, we can not find the movie :(
      </Text>
      <Text style={styles.description}>
        Find your movie by Type title, categories, years, etc
      </Text>
    </View>
  );
};

export default NoItemFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.onBackground,
    alignSelf: 'center',
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: colors.gray,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
