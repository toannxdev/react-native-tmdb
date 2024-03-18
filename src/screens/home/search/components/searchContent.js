import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TextTile from '../../../../components/textTile';
import colors from '../../../../constants/colors';
import { getPosterUrl, movieGenreNames } from '../../../../utils/utils';

const SearchContent = () => {
  const dispatch = useDispatch();
  const { movies, status } = useSelector((state) => state.movieSearch);

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => MovieItem({ item })}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        style={{ marginHorizontal: 16 }}
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
});

const MovieItem = ({ item }) => {
  const voteAverage = Math.round(item.vote_average * 10) / 10;
  const genres = movieGenreNames(item.genre_ids);
  return (
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
  );
};
