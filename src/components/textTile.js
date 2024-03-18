import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TextTile = (props) => {
  const { iconName, text, iconSize = 16 } = props;
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={iconSize} color='white' />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  text: {
    marginLeft: 6,
    fontSize: 13,
    color: 'white',
    flexShrink: 1,
  },
});

export default TextTile;
