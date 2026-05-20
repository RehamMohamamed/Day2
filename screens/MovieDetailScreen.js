import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const API_KEY = 'aa6fc65fcedb7431af3ac2fbe6484cd0';

const MovieDetailScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetail = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie detail:', error);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovieDetail();
  }, [fetchMovieDetail]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00bfff" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load movie details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Image
        source={{
          uri: movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
            : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={styles.backdrop}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>
            {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'} • {movie.runtime || 'N/A'} min
          </Text>
          <Text style={styles.rating}>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</Text>
        </View>

        <View style={styles.genres}>
          {movie.genres?.map((genre, index) => (
            <View key={index} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  scrollContent: { paddingBottom: 40 },
  backdrop: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
    marginTop: -30,
    backgroundColor: '#0a0a0a',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  meta: { color: '#aaa', fontSize: 16 },
  rating: { color: '#ffd700', fontSize: 18, fontWeight: 'bold' },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  genreTag: {
    backgroundColor: '#1f1f1f',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  genreText: { color: '#00bfff', fontSize: 14 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  overview: {
    color: '#ddd',
    fontSize: 16,
    lineHeight: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  error: { color: 'red', fontSize: 18 },
});

export default MovieDetailScreen;
