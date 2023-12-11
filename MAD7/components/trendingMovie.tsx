import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface TrendingMoviesProps {
  data: any[]; // Replace 'any[]' with the actual type of your data
}

const TrendingMovies: React.FC<TrendingMoviesProps> = ({ data }) => {
  const navigation = useNavigation();
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);
        const apiKey = '02221cab5de67332d75ff25ccc44e871'; // Replace with your actual API key
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        );
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ color: 'white', fontSize: 18, marginLeft: 16, marginBottom: 5 }}>Trending</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {loading ? (
          <Text style={{ color: 'white' }}>Loading...</Text>
        ) : (
          trendingMovies.map((item, index) => (
            <View key={index} style={{ marginVertical: 3, marginRight: 16 }}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={{
                  width: Dimensions.get('window').width * 0.6,
                  height: Dimensions.get('window').height * 0.5,
                  borderRadius: 16,
                }}
              />
              <Text style={{ color: 'white', marginLeft: 1 }}>
                {item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default TrendingMovies;
