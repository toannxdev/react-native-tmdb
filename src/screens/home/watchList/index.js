import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const WatchListScreen = () => {
  return (
    <View style={styles.container}>
      <Text>WatchListScreen</Text>
    </View>
  );
};

export default WatchListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
