import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AnimalSelectionScreen from '../screens/AnimalSelectionScreen';
import BreedSelectionScreen from '../screens/BreedSelectionScreen';
import AgeWeightFilterScreen from '../screens/AgeWeightFilterScreen';
import InventoryListScreen from '../screens/InventoryListScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
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
};

export default AppNavigator;

