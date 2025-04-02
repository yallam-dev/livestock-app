import React from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text>Breed: {item.breed}</Text>
      <Text>Weight: {item.weight}</Text>
      <Text>Age: {item.age}</Text>
      <Button title="Remove" onPress={() => removeFromCart(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <Text style={styles.total}>Total Items: {cartItems.length}</Text>
          <Button title="Checkout" onPress={() => {
            alert('Proceeding to checkout...');
            clearCart();
          }} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  empty: { fontSize: 16, fontStyle: 'italic' },
  total: { marginVertical: 15, fontWeight: 'bold', fontSize: 16 },
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
});
