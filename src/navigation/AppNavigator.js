import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AnimalSelectionScreen from './src/screens/AnimalSelectionScreen';
import BreedSelectionScreen from './src/screens/BreedSelectionScreen';
import WeightSelectionScreen from './src/screens/WeightSelectionScreen'; // ✅ Add this line
import AgeWeightFilterScreen from './src/screens/AgeWeightFilterScreen';
import InventoryListScreen from './src/screens/InventoryListScreen';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';

import { CartProvider } from './src/context/CartContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AnimalSelection">
          <Stack.Screen name="AnimalSelection" component={AnimalSelectionScreen} />
          <Stack.Screen name="BreedSelection" component={BreedSelectionScreen} />
          <Stack.Screen name="WeightSelectionScreen" component={WeightSelectionScreen} /> {/* ✅ NEW */}
          <Stack.Screen name="AgeWeightFilter" component={AgeWeightFilterScreen} />
          <Stack.Screen name="InventoryList" component={InventoryListScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
