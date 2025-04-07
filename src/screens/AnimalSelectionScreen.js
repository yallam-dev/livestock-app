import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';

export default function AnimalSelectionScreen() {
  const [animals, setAnimals] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAnimals = async () => {
      const { data, error } = await supabase.from('animals').select('*');
      if (error) {
        console.error('Error fetching animals:', error);
      } else {
        console.log('🐔 Animal data from Supabase:', data); // ✅ DEBUG LOG
        setAnimals(data);
      }
    };
    fetchAnimals();
  }, []);

  const handleAnimalPress = (animal) => {
    console.log('➡️ Navigating to BreedSelectionScreen with:', animal.id); // ✅ DEBUG LOG
    navigation.navigate('BreedSelectionScreen', { animalType: animal.id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleAnimalPress(item)}
    >
      <Image
        source={{
          uri: `https://zbpkanclylupxxfxtbwu.supabase.co/storage/v1/object/public/animal-images/${item.name}V2.png`,
        }}
        style={styles.image}
      />
      <Text style={styles.animalName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an Animal</Text>
      <FlatList
        data={animals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  animalName: {
    fontSize: 18,
    fontWeight: '600',
  },
});
