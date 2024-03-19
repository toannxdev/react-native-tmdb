import { createRef, useEffect } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ShimmerPlaceholder from '../../../../components/shimmerPlaceholder';
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

export const MovieLoadingItem = () => {
  // Handle animation
  const avatarRef = createRef();
  const firstLineRef = createRef();
  const secondLineRef = createRef();
  const thirdLineRef = createRef();
  const fouthLineRef = createRef();

  useEffect(() => {
    const animated = Animated.stagger(400, [
      avatarRef.current.getAnimated(),
      Animated.parallel([
        firstLineRef.current.getAnimated(),
        secondLineRef.current.getAnimated(),
        thirdLineRef.current.getAnimated(),
        fouthLineRef.current.getAnimated(),
      ]),
    ]);
    Animated.loop(animated).start();
  }, []);

  const randomHeight = () => Math.floor(Math.random() * 100) + 50;

  return (
    <View style={styles.container}>
      <ShimmerPlaceholder style={styles.image} ref={avatarRef} />
      <View>
        <ShimmerPlaceholder
          style={[styles.textHolder, { width: randomHeight() }]}
          ref={firstLineRef}
          stopAutoRun
        />
        <ShimmerPlaceholder
          style={[styles.textHolder, { width: randomHeight() }]}
          ref={secondLineRef}
          stopAutoRun
        />
        <ShimmerPlaceholder
          style={[styles.textHolder, { width: randomHeight() }]}
          ref={thirdLineRef}
          stopAutoRun
        />
        <ShimmerPlaceholder
          style={[styles.textHolder, { width: randomHeight() }]}
          ref={fouthLineRef}
          stopAutoRun
        />
      </View>
    </View>
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
  textHolder: {
    marginTop: 4,
    borderRadius: 2,
    height: 16,
  },
});
