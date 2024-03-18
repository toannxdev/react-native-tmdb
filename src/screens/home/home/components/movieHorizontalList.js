import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

const MovieHorizontalList = (props) => {
  const { title, movies, onSeeAllPress, onItemPress } = props;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Title style={styles.title}>{title}</Title>
        <Pressable
          onPress={onSeeAllPress}
          children={<Ionicons name='arrow-forward' size={24} color='white' />}
        />
      </View>
      {movies && movies.length > 0 && (
        <FlatList
          style={styles.list}
          horizontal
          data={movies}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onItemPress(item)}
              children={MovieItem(item)}
            />
          )}
        />
      )}
    </View>
  );
};

export default MovieHorizontalList;

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

const MovieItem = (item) => {
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
