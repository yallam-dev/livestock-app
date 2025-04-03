import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { supabase } from '../lib/supabase';

const BreedSelectionScreen = ({ route, navigation }) => {
  const { animalType } = route.params;
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const loadBreeds = async () => {
      const { data, error } = await supabase
        .from('inventory')
        .select('breed')
        .eq('animal', animalType);
      if (data) {
        const uniqueBreeds = [...new Set(data.map((item) => item.breed))];
        setBreeds(uniqueBreeds);
      }
    };
    loadBreeds();
  }, []);

  const handleSelect = (breed) => {
    navigation.navigate('AgeWeightFilter', { animalType, breed });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Breed for {animalType}</Text>
      <FlatList
        data={breeds}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  option: {
    padding: 16,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 12,
  },
  optionText: { fontSize: 18 },
});

export default BreedSelectionScreen;
