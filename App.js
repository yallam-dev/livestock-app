// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AnimalSelectionScreen from './src/screens/AnimalSelectionScreen';
import BreedSelectionScreen from './src/screens/BreedSelectionScreen';
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
        <Stack.Navigator initialRouteName="AnimalSelectionScreen">
          <Stack.Screen name="AnimalSelectionScreen" component={AnimalSelectionScreen} />
          <Stack.Screen name="BreedSelectionScreen" component={BreedSelectionScreen} />
          <Stack.Screen name="AgeWeightFilterScreen" component={AgeWeightFilterScreen} />
          <Stack.Screen name="InventoryListScreen" component={InventoryListScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

