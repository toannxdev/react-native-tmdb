import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';

const Pagination = ({ animValue, index, length, width }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const dotWidth = interpolate(animValue, {
    inputRange,
    outputRange: [10, 20, 10],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <View style={styles.pagination}>
      {Array.from({ length }).map((_, i) => {
        return (
          <Animated.View
            key={i}
            style={[styles.dot, i === index && { width: dotWidth }]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    height: 10,
  },
  dot: {
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 2,
  },
});
