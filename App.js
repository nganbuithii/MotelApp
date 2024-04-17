import { StatusBar } from 'expo-status-bar';
import React, { useReducer } from 'react';
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
import MyUserReducer from './reducer/MyUserReducer';
import MyContext from './src/configs/MyContext';
import ProfileDetail from './src/components/Home/ProfileDetail';
import SearchFilter from './src/components/Home/SearchFilter';
import RegisterMotel from './src/components/Auth/RegisterMotel';
import UploadImgHouse from './src/components/Auth/UploadImgHouse';


//Điều hướng kiểu stack
const Stack = createStackNavigator();

export default function App() {
  // khởi gán là null, và cấp cho các con xài
  const [user, dispatch] = useReducer(MyUserReducer, null);
  return (
    <MyContext.Provider value={[user, dispatch]}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Slider">
        
          <Stack.Screen
            name="Slider"
            component={Slider}
            options={{ headerShown: false }} // Tắt header cho màn hình Slider
          />
          {/* <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }} // Tắt header cho màn hình Login
              /> */}

          <Stack.Screen name="ProfileDetail" component={ProfileDetail}
            options={{ headerTitle: 'Tài khoản của bạn' }} />
          <Stack.Screen name="SearchFilter" component={SearchFilter}
            options={{ headerTitle: 'Lọc kết quả tìm kiếm' }} />
          <Stack.Screen
            name="RegisterMotel"
            component={RegisterMotel}
            options={{ headerShown: false }} // Tắt header cho màn hình Slider
          />
          <Stack.Screen
            name="UploadImgHouse"
            component={UploadImgHouse}
            options={{ headerShown: false }} // Tắt header cho màn hình Slider
          />
          {/* <Stack.Screen
              name="Home" 
              component={Home} 
              options={{ headerShown: false }}/> */}
          
          {user === null ?
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }} // Tắt header cho màn hình Login
              />
            </> :
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ 
                  headerLeft: null, // Tắt icon back
                  headerShown: false ,
                  headerTitle: "NACA",
                  }} />
            </>
          }

          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Register2"
            component={Register2}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="TermService"
            component={TermService}
            options={{ headerTitle: 'Điều Khoản và Dịch Vụ' }}
          />
          <Stack.Screen
            name="UploadImg"
            component={UploadImg}
            options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </MyContext.Provider>
  );
}

const styleTitle = {
  fontSize: 20,
  fontWeight: 'bold',
  color: 'blue',
  // Các thuộc tính khác tùy chọn
};

