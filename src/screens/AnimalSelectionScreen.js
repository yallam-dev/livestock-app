import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  FlatList,
  Image,
  ScrollView, // ✅ make screen scrollable
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useCart } from '../context/CartContext';

export default function AnimalSelectionScreen() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [inventoryResults, setInventoryResults] = useState([]);

  const { addToCart } = useCart();

  const animalOptions = ['Chicken', 'Turkey', 'Goat', 'Lamb'];
  const breedsByAnimal = {
    Chicken: ['Desi', 'Broiler'],
    Turkey: ['White', 'Bronze'],
    Goat: ['Boer', 'Nubian', 'Kiko'],
    Lamb: ['Dorper', 'Katahdin', 'Merino'],
  };

  const createPickerItems = (items) =>
    items.map((item) => ({ label: item, value: item }));

  const handleSearch = () => {
    const mockInventory = [
      {
        id: Math.random().toString(),
        animal: selectedAnimal,
        breed,
        weight,
        age,
        image: 'https://placekitten.com/200/200',
      },
      {
        id: Math.random().toString(),
        animal: selectedAnimal,
        breed,
        weight,
        age,
        image: 'https://placekitten.com/201/200',
      },
    ];
    setInventoryResults(mockInventory);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    console.log('Added to cart:', item);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.cardText}>Breed: {item.breed}</Text>
      <Text style={styles.cardText}>Weight: {item.weight}</Text>
      <Text style={styles.cardText}>Age: {item.age}</Text>
      <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select an Animal</Text>

      {animalOptions.map((animal) => (
        <TouchableOpacity
          key={animal}
          style={[
            styles.option,
            selectedAnimal === animal && styles.selectedOption,
          ]}
          onPress={() => {
            setSelectedAnimal(animal);
            setBreed('');
            setWeight('');
            setAge('');
            setInventoryResults([]);
          }}
        >
          <Text style={styles.optionText}>{animal}</Text>
        </TouchableOpacity>
      ))}

      {selectedAnimal && (
        <View style={styles.selects}>
          <Text style={styles.subheading}>Breed:</Text>
          <RNPickerSelect
            onValueChange={setBreed}
            placeholder={{ label: 'Select breed...', value: '' }}
            items={createPickerItems(breedsByAnimal[selectedAnimal])}
            value={breed}
          />

          <Text style={styles.subheading}>Weight Range:</Text>
          <RNPickerSelect
            onValueChange={setWeight}
            placeholder={{ label: 'Select weight...', value: '' }}
            items={createPickerItems(['1-2 lbs', '2-4 lbs', '4-6 lbs', '6+ lbs'])}
            value={weight}
          />

          <Text style={styles.subheading}>Age Range:</Text>
          <RNPickerSelect
            onValueChange={setAge}
            placeholder={{ label: 'Select age...', value: '' }}
            items={createPickerItems(['1-2 months', '2-4 months', '4-6 months', '6+ months'])}
            value={age}
          />

          <View style={{ marginTop: 20 }}>
            <Button
              title="Search Inventory"
              onPress={handleSearch}
              disabled={false}
            />
          </View>
        </View>
      )}

      {inventoryResults.length > 0 && (
        <View style={styles.results}>
          <Text style={styles.subheading}>Matching Inventory:</Text>
          <FlatList
            data={inventoryResults}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false} // 🔒 FlatList won't fight ScrollView
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    padding: 15,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#cce5ff',
  },
  optionText: {
    fontSize: 18,
  },
  selects: {
    marginTop: 30,
  },
  subheading: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  results: {
    marginTop: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardText: {
    marginBottom: 5,
  },
});



