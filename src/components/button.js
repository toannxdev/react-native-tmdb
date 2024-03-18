import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Button = (props) => {
  const { label, onPress } = props;
  return (
    <View style={styles.container}>
      <Text>Button</Text>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    borderRadius: 6,
  },
});
