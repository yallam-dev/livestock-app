import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';

const AgeWeightFilterScreen = ({ route, navigation }) => {
  const { animalType, breed } = route.params;
  const [ageOptions, setAgeOptions] = useState([]);
  const [weightOptions, setWeightOptions] = useState([]);
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');

  useEffect(() => {
    const loadOptions = async () => {
      const { data } = await supabase
        .from('inventory')
        .select('age_range, weight_range')
        .eq('animal', animalType)
        .eq('breed', breed);

      setAgeOptions([...new Set(data.map((item) => item.age_range))]);
      setWeightOptions([...new Set(data.map((item) => item.weight_range))]);
    };
    loadOptions();
  }, []);

  const handleSearch = () => {
    navigation.navigate('InventoryList', {
      animalType,
      breed,
      age_range: selectedAge,
      weight_range: selectedWeight,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Age & Weight</Text>
      <Text style={styles.subtitle}>Age Range</Text>
      {ageOptions.map((age) => (
        <TouchableOpacity
          key={age}
          style={[styles.option, selectedAge === age && styles.selected]}
          onPress={() => setSelectedAge(age)}
        >
          <Text>{age}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.subtitle}>Weight Range</Text>
      {weightOptions.map((weight) => (
        <TouchableOpacity
          key={weight}
          style={[styles.option, selectedWeight === weight && styles.selected]}
          onPress={() => setSelectedWeight(weight)}
        >
          <Text>{weight}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
        disabled={!selectedAge || !selectedWeight}
      >
        <Text style={styles.searchText}>View Inventory</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 18, marginTop: 16, marginBottom: 6 },
  option: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 8,
  },
  selected: {
    backgroundColor: '#cde',
  },
  searchButton: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  searchText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default AgeWeightFilterScreen;
