import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const KeywordSuggestions = () => {
  const dispatch = useDispatch();
  const { suggestions } = useSelector((state) => state.keyword);

  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  const onPress = (item) => {
    console.log('Pressed', item.name);
    // setSearchText(item.name);
  };

  return (
    <View>
      <Text style={styles.title}>Maybe you are also looking</Text>
      <ScrollView contentContainerStyle={styles.wrapList}>
        {suggestions
          .slice(0, 6) // Limit to 6 items
          .map((item) => TagItem({ item, onPress }))}
      </ScrollView>
    </View>
  );
};

export default KeywordSuggestions;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
  wrapList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    paddingVertical: 4,
    borderRadius: 16,
    paddingHorizontal: 12,
    marginEnd: 8,
    marginTop: 8,
  },
});

const TagItem = ({ item, onPress }) => {
  return (
    <Pressable key={item.id} onPress={() => onPress(item)}>
      <View style={styles.tag}>
        <Text style={{ color: 'white' }}>{item.name}</Text>
      </View>
    </Pressable>
  );
};
