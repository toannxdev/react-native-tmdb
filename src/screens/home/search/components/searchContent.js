import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NoItemFound from '../../../../components/no_item_found';
import colors from '../../../../constants/colors';
import Status from '../../../../constants/status';
import { searchMoviesByQuery } from '../slices/movieSearchSlice';
import KeywordSuggestions from './keywordSuggestions';
import MovieItem from './movieItem';

let lastQuery = null;
let onEndReachedCalledDuringMomentum = false;

const SearchContent = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const { movies, status, query, page } = useSelector(
    (state) => state.movieSearch
  );

  const onMoviePress = (item) => {
    console.log('Pressed', item.title);
  };

  const onEndReached = () => {
    if (
      status === Status.Succeeded &&
      onEndReachedCalledDuringMomentum === false
    ) {
      lastQuery = query;
      dispatch(searchMoviesByQuery({ query, page: page + 1 }));
      onEndReachedCalledDuringMomentum = true;
    }
  };

  const onRefresh = () => {
    console.log('onRefresh');
    setRefreshing(true);
    dispatch(searchMoviesByQuery({ query, page: 1, forceRefresh: true }));
    onEndReachedCalledDuringMomentum = true;
  };

  if (refreshing && status !== Status.InProgress) {
    setRefreshing(false);
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flexGrow: 1, marginHorizontal: 16 }}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          MovieItem({
            item,
            onPress: () => onMoviePress(item),
          })
        }
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum = false;
        }}
        contentContainerStyle={styles.listContentContainer}
        ListHeaderComponent={() => (
          <View style={{ marginBottom: 16 }}>
            <KeywordSuggestions />
          </View>
        )}
        ListEmptyComponent={() => {
          if (status === Status.InProgress) {
            return <Text style={styles.text}>Shimmer Loading...</Text>;
          }
          if (
            status === Status.Initial ||
            (status === Status.Succeeded && query === '')
          ) {
            return <InitialMovie />;
          }
          return <NoItemFound />;
        }}
      />
    </View>
  );
};

export default SearchContent;

const styles = StyleSheet.create({
  listContentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  emptyItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  image: {
    width: 95,
    height: 125,
    borderRadius: 10,
    marginRight: 8,
  },
  text: {
    color: colors.onBackground,
  },
});

const InitialMovie = () => {
  return (
    <View style={styles.emptyItemContainer}>
      <Image
        source={require('../../../../assets/movie-placeholder.png')}
        style={styles.image}
      />
    </View>
  );
};
