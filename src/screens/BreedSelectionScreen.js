import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

export default function BreedSelectionScreen({ route }) {
  const { animalType } = route.params;
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('breeds')
        .select('*')
        .eq('animal_id', animalType);

      if (error) {
        console.error('Error fetching breeds:', error);
        setBreeds([]);
      } else {
        // Include "All" option at the top
        const allOption = {
          id: 'all',
          name: 'All Breeds',
          image_url: 'https://via.placeholder.com/300x150.png?text=All+Breeds',
          description: 'Browse all available breeds for this animal.',
        };
        setBreeds([allOption, ...data]);
      }

      setLoading(false);
    };

    fetchBreeds();
  }, [animalType]);

  const handleBreedSelect = (breedId) => {
    const selectedBreeds = breedId === 'all' ? ['All'] : [breedId];
    navigation.navigate('AgeWeightFilterScreen', {
      animalType,
      selectedBreeds,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleBreedSelect(item.id)}
    >
      <Image
        source={{ uri: item.image_url || 'https://via.placeholder.com/300x150.png?text=No+Image' }}
        style={styles.image}
      />
      <Text style={styles.breedName}>{item.name}</Text>
      <Text numberOfLines={2} style={styles.description}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Breed</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={breeds}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  breedName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});
