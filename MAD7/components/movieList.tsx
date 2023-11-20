import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme';

var { width, height } = Dimensions.get('window');

interface MovieListProps {
  title: string;
  data: any[]; // Replace 'any[]' with the actual type of your data
  hideSeeAll?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ title, data, hideSeeAll }) => {
  let movieName = 'Ant-Man and the Wasp: Quantumania';
  const navigation = useNavigation();

  return (
    <View style={{ marginBottom: 8, marginTop: 8 }}>
      <View style={{ marginHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18 }}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={[styles.text, { fontSize: 16 }]}>
              See all
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Movie', item)}>
              <View style={{ marginVertical: 8, marginRight: 16 }}>
                <Image
                  source={{ uri: 'data:image/jpeg;base64,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' }} // Add the actual source for the Image
                  style={{ width: width * 0.33, height: height * 0.22, borderRadius: 16 }}
                />
                <Text style={{ color: 'white', marginLeft: 4, fontSize: 14 }}>
                  {movieName.length > 14 ? movieName.slice(0, 14) + '...' : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
