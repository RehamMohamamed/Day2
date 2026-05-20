import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const API_KEY = 'aa6fc65fcedb7431af3ac2fbe6484cd0';
const BASE_URL = 'https://api.themoviedb.org/3';

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchMovies = useCallback(async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMovies();
  };

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : 'https://via.placeholder.com/200x300/1a1a1a/ffffff?text=No+Image',
        }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.meta}>
          {item.release_date ? item.release_date.slice(0, 4) : 'N/A'} • ⭐{' '}
          {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Popular Movies</Text>

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#00bfff" style={styles.loader} />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovie}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00bfff" />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  movieCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
  },
  poster: {
    width: '100%',
    height: 260,
  },
  info: {
    padding: 12,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  meta: {
    color: '#aaa',
    fontSize: 14,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default MoviesScreen;
