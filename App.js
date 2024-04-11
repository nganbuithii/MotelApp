import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Auth/Login';
import Slider from './src/components/Intro/Slider';

//Điều hướng kiểu stack
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Slider">
      <Stack.Screen
          name="Slider"
          component={Slider}
          options={{ headerShown: false }} // Tắt header cho màn hình Slider
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // Tắt header cho màn hình Login
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


