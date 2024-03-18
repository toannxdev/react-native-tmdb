import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../../../constants/colors';
import { fetchNowPlaying } from '../slices/nowPlayingSlice';
import PaginationItem from './paginationItem';

const width = Dimensions.get('window').width;

export const CarouselItem = ({ item, index }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri: `http://image.tmdb.org/t/p/w780/${item.poster_path}`,
        }}
        resizeMode='cover'
        style={styles.itemContainer}
      />
    </View>
  );
};

const NowPlayingList = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.nowPlaying);
  const [currentIndex, setCurrentIndex] = useState(0);
  const progressValue = useSharedValue(0);

  useEffect(() => {
    dispatch(fetchNowPlaying({ page: 1 }));
  }, [dispatch]);

  return (
    <View style={{ alignItems: 'center' }}>
      {movies && movies.length > 0 && (
        <Image
          source={{
            uri: `http://image.tmdb.org/t/p/w300/${movies[currentIndex].backdrop_path}`,
            cache: 'force-cache',
          }}
          resizeMode='cover'
          style={StyleSheet.absoluteFillObject}
          blurRadius={10}
        />
      )}
      <LinearGradient
        colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)', colors.background]}
        style={StyleSheet.absoluteFillObject}
      />
      <Carousel
        vertical={false}
        width={width}
        height={560}
        autoPlay={false}
        data={movies}
        mode='parallax'
        style={{ height: 500 }}
        modeConfig={{
          parallaxScrollingScale: 0.7,
          parallaxScrollingOffset: 150,
        }}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ index }) =>
          CarouselItem({ item: movies[index], index: index })
        }
      />
      {movies && movies.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: movies.length * 10 * 1.35, // 1.35 is the width of the pagination item
            alignSelf: 'center',
          }}
        >
          {movies.map((_, index) => {
            return (
              <PaginationItem
                activeColor={colors.primary}
                inactiveColor={colors.gray}
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={false}
                length={movies.length}
                width={10}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

export default NowPlayingList;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
  },
});
