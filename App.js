import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Auth/Login';
import Slider from './src/components/Intro/Slider';
import Register from './src/components/Auth/Register';
import Register2 from './src/components/Auth/Register2';
import TermService from './src/components/Auth/TermService';
import UploadImg from './src/components/Auth/UploadImg';
import Home from './src/components/Home/Home';
//Điều hướng kiểu stack
const Stack = createStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Slider">
        <Stack.Screen
            name="Home" 
            component={Home} 
            options={{ headerShown: false }}/>
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
          <Stack.Screen 
          name="Register" 
          component={Register}
          options={{ headerShown: false }}/>
          <Stack.Screen 
          name="Register2" 
          component={Register2}
          options={{ headerShown: false }}/>
          <Stack.Screen 
          name="TermService" 
          component={TermService}
          options={{ headerTitle: 'Điều Khoản và Dịch Vụ' }}
          />
          <Stack.Screen 
          name="UploadImg" 
          component={UploadImg}
          options={{ headerShown: false }}/>
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}


