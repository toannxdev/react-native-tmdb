import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const SearchContent = () => {
  const dispatch = useDispatch();
  const { movies, status } = useSelector((state) => state.movieSearch);

  return (
    <View>
      <Text style={{ color: 'white' }}>{movies.length}</Text>
    </View>
  );
};

export default SearchContent;

const styles = StyleSheet.create({});
