import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NoItemFound from '../../../../components/no_item_found';
import TextTile from '../../../../components/textTile';
import colors from '../../../../constants/colors';
import Status from '../../../../constants/status';
import { getPosterUrl, movieGenreNames } from '../../../../utils/utils';
import { searchMoviesByQuery } from '../slices/movieSearchSlice';
import KeywordSuggestions from './keywordSuggestions';

const SearchContent = () => {
  const dispatch = useDispatch();
  const { movies, status, query, page } = useSelector(
    (state) => state.movieSearch
  );

  const onMoviePress = (item) => {
    console.log('Pressed', item.title);
  };

  const onEndReached = () => {
    console.log('end reached');
    if (status === Status.Succeeded) {
      dispatch(searchMoviesByQuery({ query, page: page + 1 }));
    }
  };

  const onRefresh = () => {
    console.log('onRefresh');
    dispatch(searchMoviesByQuery({ query, page: 1 }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1, marginHorizontal: 16 }}
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          MovieItem({
            item,
            onPress: () => onMoviePress(item),
          })
        }
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        refreshing={status === 'loading'}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        ListHeaderComponent={() => {
          return (
            <View style={{ marginBottom: 16 }}>
              <KeywordSuggestions />
            </View>
          );
        }}
        ListEmptyComponent={() => {
          console.log('status:', status, query);
          if (status === Status.InProgress) {
            return <Text style={styles.text}>Shimmer Loading...</Text>;
          }
          if (
            status === Status.Initial ||
            (status === Status.Succeeded && query === '')
          ) {
            return <Text style={styles.text}>Search history</Text>;
          }
          return <NoItemFound />;
        }}
      />
    </View>
  );
};

export default SearchContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  itemContainer: {
    flexDirection: 'row',
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

const MovieItem = ({ item, onPress }) => {
  const voteAverage = Math.round(item.vote_average * 10) / 10;
  const genres = movieGenreNames(item.genre_ids);
  return (
    <Pressable onPress={() => onPress()}>
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: getPosterUrl(item.poster_path, 'w300') }}
          defaultSource={require('../../../../assets/movie-placeholder.png')}
          style={styles.image}
        />
        <View>
          <Text style={{ color: colors.onBackground }}>{item.title}</Text>
          {item.release_date && (
            <TextTile text={item.release_date} iconName='calendar-outline' />
          )}
          {item.vote_count > 0 && (
            <TextTile
              text={`${voteAverage} (${item.vote_count.toLocaleString()})`}
              iconName='star-outline'
              styles={{ marginTop: 14 }}
            />
          )}
          {genres && <TextTile text={genres} iconName='basketball-outline' />}
        </View>
      </View>
    </Pressable>
  );
};
