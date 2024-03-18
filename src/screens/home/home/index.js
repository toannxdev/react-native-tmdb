import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../../constants/colors';
import NowPlayingList from './components/nowPlaying';
import Popular from './components/popular';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <NowPlayingList />
      <Popular />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
