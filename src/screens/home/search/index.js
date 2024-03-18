import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import Search from '../../../components/search';
import colors from '../../../constants/colors';
import KeywordSuggestions from './components/keywordSuggestions';
import SearchContent from './components/searchContent';
import { fetchKeywordSuggestions } from './slices/keywordSlice';
import { searchMoviesByQuery } from './slices/movieSearchSlice';

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  return (
    <View
      style={[
        styles.container,
        {
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <Search
        onChangeText={(text) => {
          dispatch(fetchKeywordSuggestions(text));
          dispatch(searchMoviesByQuery(text));
        }}
      />

      <KeywordSuggestions />
      <SearchContent />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
