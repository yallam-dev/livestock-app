import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

export default function WeightSelectionScreen({ route }) {
  const { animalType, selectedBreeds } = route.params;
  const [weights, setWeights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchWeights = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('weights')
        .select('*')
        .eq('animal_id', animalType);

      if (error) {
        console.error('Error fetching weights:', error);
        setWeights([]);
      } else {
        setWeights(data);
      }
      setLoading(false);
    };

    fetchWeights();
  }, [animalType]);

  const handleWeightSelect = (weightId) => {
    navigation.navigate('AgeWeightFilter', {
      animalType,
      selectedBreeds,
      selectedWeights: [weightId],
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleWeightSelect(item.id)}>
      <Text style={styles.weightText}>{item.range}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Weight Range</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={weights}
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
  },
  card: {
    backgroundColor: '#e0f0ff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  weightText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
