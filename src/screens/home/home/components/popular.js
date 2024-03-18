import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopular } from '../slices/popularSlice';

const Popular = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.popular);

  useEffect(() => {
    dispatch(fetchPopular({ page: 1 }));
  }, [dispatch]);

  console.log('Popular movies:', movies.length);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title style={styles.title}>Popular</Title>
        <Ionicons name='arrow-forward' size={24} color='white' />
      </View>
      {movies && movies.length > 0 && (
        <FlatList
          style={styles.list}
          horizontal
          data={movies}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          renderItem={({ item }) => PopularItemView(item)}
        />
      )}
    </View>
  );
};

export default Popular;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
  },
  list: {
    marginTop: 4,
  },
});

const PopularItemView = (item) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri: `http://image.tmdb.org/t/p/w300/${item.poster_path}`,
        }}
        resizeMode='cover'
        style={styles.itemContainer}
        width={100}
        height={150}
      />
    </View>
  );
};
