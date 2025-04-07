import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';

export default function InventoryListScreen({ route }) {
  const { animalType, breeds, weights, ages } = route.params;
  const [inventory, setInventory] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      let query = supabase
        .from('inventory')
        .select(`
          *,
          breed:breeds(name),
          weight:weights(range),
          age:ages(range),
          animal:animals(name)
        `)
        .eq('animal_id', animalType);

      if (breeds && !breeds.includes('All')) query = query.in('breed_id', breeds);
      if (weights && !weights.includes('All')) query = query.in('weight_id', weights);
      if (ages && !ages.includes('All')) query = query.in('age_id', ages);

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching inventory:', error);
        setInventory([]);
      } else {
        setInventory(data);
        const initial = {};
        data.forEach(item => (initial[item.id] = '1'));
        setQuantities(initial);
      }
      setLoading(false);
    };

    fetchInventory();
  }, [animalType, breeds, weights, ages]);

  const handleAddToCart = (item) => {
    const qty = parseInt(quantities[item.id]) || 1;
    addToCart({ ...item, quantity: qty });
    alert(`${qty} ${item.breed?.name || 'Item'}(s) added to cart!`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>Breed: {item.breed?.name}</Text>
      <Text style={styles.text}>Weight: {item.weight?.range}</Text>
      <Text style={styles.text}>Age: {item.age?.range}</Text>
      <Text style={styles.text}>In Stock: {item.stock}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantities[item.id]}
        onChangeText={(val) => setQuantities({ ...quantities, [item.id]: val })}
      />
      <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <Text style={styles.title}>Matching Inventory</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#333" />
      ) : inventory.length > 0 ? (
        <FlatList
          data={inventory}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      ) : (
        <Text style={styles.noInventory}>No inventory found for selected filters.</Text>
      )}
    </KeyboardAvoidingView>
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
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    width: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 6,
    textAlign: 'center',
    marginBottom: 10,
  },
  noInventory: {
    textAlign: 'center',
    color: '#888',
    marginTop: 50,
    fontSize: 16,
    fontStyle: 'italic',
  },
});

