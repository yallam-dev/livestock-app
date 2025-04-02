import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AnimalSelectionScreen from '../screens/AnimalSelectionScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={AnimalSelectionScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Checkout" component={CheckoutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
