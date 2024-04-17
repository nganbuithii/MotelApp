import React, { useContext, useState } from 'react';
import { View, Text , Image, StyleSheet, TextInput } from 'react-native';
import MyStyles from '../../Styles/MyStyles'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import HomeStyles from './HomeStyles';
import Logout from '../Auth/Logout';
import MyContext from '../../configs/MyContext';

const HomeIndex = () => {
  const [postContent, setPostContent] = useState('');
  const [user,dispatch] = useContext(MyContext);

  const handlePostChange = (text) => {
    setPostContent(text);
  };

  return (
    <View style={MyStyles.container}>
      <Text>Trang chủ</Text>

        <Logout />
        {/* Thanh đăng bài nằm ngang */}
        <View style={HomeStyles.postBar}>
          <Image
            source={{uri:user.avatar}} // Thay đổi đường dẫn của ảnh mặc định
            style={HomeStyles.image}
          />
          <View style={[HomeStyles.postInputContainer,MyStyles.flex]}>
            <TextInput
              style={HomeStyles.postInput}
              placeholder="Bạn muốn đăng bài?"
              value={postContent}
              multiline
              editable={false} // Vô hiệu hóa tính năng nhập liệu
            />
            <TouchableOpacity style={HomeStyles.plusButton} >
              <AntDesign name="pluscircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>
        
        </View>
      
      


    </View>
  );
};


export default HomeIndex;
