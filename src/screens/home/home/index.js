import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../constants/colors';
import MovieHorizontalList from './components/movieHorizontalList';
import NowPlayingList from './components/nowPlaying';
import { fetchPopular } from './slices/popularSlice';
import { fetchTopRated } from './slices/topRatedSlice';
import { fetchUpcoming } from './slices/upcomingSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { movies: popularList } = useSelector((state) => state.popular);
  const { movies: topRatedList } = useSelector((state) => state.topRated);
  const { movies: upcomingList } = useSelector((state) => state.upcoming);

  useEffect(() => {
    dispatch(fetchPopular({ page: 1 }));
    dispatch(fetchTopRated({ page: 1 }));
    dispatch(fetchUpcoming({ page: 1 }));
  }, [dispatch]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <NowPlayingList />
        <MovieHorizontalList
          movies={popularList}
          title='Popular'
          onSeeAllPress={() => {
            console.log('See all pressed');
          }}
          onItemPress={(movie) => {
            console.log('Pressed', movie.title);
          }}
        />
        <MovieHorizontalList
          movies={topRatedList}
          title='Top Rated'
          onSeeAllPress={() => {
            console.log('See all pressed');
          }}
          onItemPress={(movie) => {
            console.log('Pressed', movie.title);
          }}
        />
        <MovieHorizontalList
          movies={upcomingList}
          title='Upcoming'
          onSeeAllPress={() => {
            console.log('See all pressed');
          }}
          onItemPress={(movie) => {
            console.log('Pressed', movie.title);
          }}
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 16,
  },
});
