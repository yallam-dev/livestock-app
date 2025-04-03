import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AnimalSelectionScreen from './src/screens/AnimalSelectionScreen';
import BreedSelectionScreen from './src/screens/BreedSelectionScreen';
import AgeWeightFilterScreen from './src/screens/AgeWeightFilterScreen';
import InventoryListScreen from './src/screens/InventoryListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AnimalSelection">
        <Stack.Screen name="AnimalSelection" component={AnimalSelectionScreen} />
        <Stack.Screen name="BreedSelection" component={BreedSelectionScreen} />
        <Stack.Screen name="AgeWeightFilter" component={AgeWeightFilterScreen} />
        <Stack.Screen name="InventoryList" component={InventoryListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
