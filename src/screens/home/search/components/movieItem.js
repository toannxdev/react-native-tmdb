import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import TextTile from '../../../../components/textTile';
import colors from '../../../../constants/colors';
import { getPosterUrl, movieGenreNames } from '../../../../utils/utils';

export default MovieItem = ({ item, onPress }) => {
  const voteAverage = Math.round(item.vote_average * 10) / 10;
  const genres = movieGenreNames(item.genre_ids);
  return (
    <Pressable onPress={() => onPress()}>
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 95,
    height: 125,
    borderRadius: 10,
    marginRight: 8,
  },
});
