// Connected to GitHub
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const animals = [
  {
    type: 'Chicken',
    image: 'https://zbpkanclylupxxfxtbwu.supabase.co/storage/v1/object/public/animal-images//Chicken.png',
  },
  {
    type: 'Turkey',
    image: 'https://zbpkanclylupxxfxtbwu.supabase.co/storage/v1/object/public/animal-images//Turkey.png',
  },
  {
    type: 'Goat',
    image: 'https://zbpkanclylupxxfxtbwu.supabase.co/storage/v1/object/public/animal-images//Goat.png',
  },
  {
    type: 'Lamb',
    image: 'https://zbpkanclylupxxfxtbwu.supabase.co/storage/v1/object/public/animal-images//Lamb.png',
  },
  
];

export default function AnimalSelectionScreen({ navigation }) {
  const handleAnimalPress = (animalType) => {
    navigation.navigate('BreedSelection', { animalType });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleAnimalPress(item.type)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.label}>{item.type}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an Animal</Text>
      <FlatList
        data={animals}
        renderItem={renderItem}
        keyExtractor={(item) => item.type}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const cardSize = (screenWidth - 48) / 2;

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
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    width: cardSize,
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: cardSize,
    height: cardSize,
  },
  label: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

