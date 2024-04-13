import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HomeStyles from './HomeStyles';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const goToProfileDetail = () => {
    navigation.navigate('ProfileDetail'); // Điều hướng đến màn hình ProfileDetail
  };
  const goToService = () => {
    navigation.navigate('TermService'); // Điều hướng đến màn hình ProfileDetail
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {/* <Text style={MyStyles.textHead}>Hồ sơ cá nhân</Text> */}

    {/* Ô thông tin user */}
    <TouchableOpacity style={HomeStyles.profileContainer} onPress={goToProfileDetail} >
      <Image
        source={require('../../assets/images/avt.png')} // Thay đổi đường dẫn của ảnh mặc định
        style={HomeStyles.image}
      />
      <View style={HomeStyles.flex}>
        <Text style={[HomeStyles.profileName]}>Bùi Thị Ngân</Text>
        <Text style={HomeStyles.detailLink}> Xem chi tiết </Text>
      </View>
      <View>
        <MaterialIcons name="navigate-next" size={30} color="black" />
      </View>
      
    </TouchableOpacity>

    {/* Bảo mật */}
    <Text style={HomeStyles.txtSmall}>Về ứng dụng</Text>
    <TouchableOpacity style={HomeStyles.profileContainer}>
      
      <View style={HomeStyles.flexInput}>
        <AntDesign name="infocirlceo" size={24} color="black" />
        <Text> Giới thiệu</Text>
        <View style={HomeStyles.iconContainer}>
          <MaterialIcons name="navigate-next" size={30} color="black" />
        </View>
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={HomeStyles.profileContainer} onPress={goToService} >
      <View style={HomeStyles.flexInput}>
        <MaterialIcons name="security" size={24} color="black" />
        <Text> Chính sách bảo mật</Text>
        <View style={HomeStyles.iconContainer}>
          <MaterialIcons name="navigate-next" size={30} color="black" />
        </View>
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={HomeStyles.profileContainer}  onPress={goToService} >
      <View style={HomeStyles.flexInput}>
      <AntDesign name="customerservice" size={24} color="black" />
        <Text> Điều khoản & Dịch vụ</Text>
        <View style={HomeStyles.iconContainer}>
          <MaterialIcons name="navigate-next" size={30} color="black" />
        </View>
      </View>
    </TouchableOpacity>

    <Text style={HomeStyles.txtSmall}>Về tài khoản</Text>
    <TouchableOpacity style={HomeStyles.profileContainer}>
      <View style={HomeStyles.flexInput}>
      <MaterialCommunityIcons name="key-change" size={24} color="black" />
        <Text> Đổi mật khẩu</Text>
        <View style={HomeStyles.iconContainer}>
          <MaterialIcons name="navigate-next" size={30} color="black" />
        </View>
      </View>

    </TouchableOpacity>
    <TouchableOpacity style={HomeStyles.profileContainer}>
      <View style={HomeStyles.flexInput}>
        <MaterialIcons name="delete-outline" size={24} color="black" />
          <Text> Xóa tài khoản</Text>
          <View style={HomeStyles.iconContainer}>
            <MaterialIcons name="navigate-next" size={30} color="black" />
          </View>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={HomeStyles.profileContainer}>
      <View style={HomeStyles.flexInput}>
      <MaterialIcons name="logout" size={24} color="black" />
        <Text> Đăng xuất</Text>
        <View style={HomeStyles.iconContainer}>
          <MaterialIcons name="navigate-next" size={30} color="black" />
        </View>
      </View>
    </TouchableOpacity>


  </View>
  )
}

// const styles = StyleSheet.create({
  
// });

export default ProfileScreen;
