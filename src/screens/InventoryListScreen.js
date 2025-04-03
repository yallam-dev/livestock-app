import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';

const InventoryListScreen = ({ route, navigation }) => {
  const { animalType, breed, age_range, weight_range } = route.params;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const { data } = await supabase
        .from('inventory')
        .select('*')
        .eq('animal', animalType)
        .eq('breed', breed)
        .eq('age_range', age_range)
        .eq('weight_range', weight_range);

      setItems(data || []);
    };
    loadItems();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image_url || 'https://placekitten.com/300/200' }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.breed}</Text>
      <Text>Age: {item.age_range}</Text>
      <Text>Weight: {item.weight_range}</Text>
      <Text>Price: ${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {animalType} → {breed} → {age_range} → {weight_range}
      </Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('AnimalSelection')}>
        <Text style={styles.backText}>⬅ Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  card: {
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: { height: 160, width: '100%', borderRadius: 6, marginBottom: 8 },
  title: { fontSize: 18, fontWeight: 'bold' },
  backBtn: { marginTop: 20 },
  backText: { color: '#007AFF', fontWeight: '600' },
});

export default InventoryListScreen;
