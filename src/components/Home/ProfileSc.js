import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import HomeStyles from './HomeStyles';
import { COLOR, SHADOWS } from '../common/color';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MyStyles from '../../Styles/MyStyles';
const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={MyStyles.textHead}>Hồ sơ cá nhân</Text>

    {/* Ô thông tin user */}
    <TouchableOpacity style={styles.profileContainer}>
      <Image
        source={require('../../assets/images/avt.png')} // Thay đổi đường dẫn của ảnh mặc định
        style={HomeStyles.image}
      />
      <View style={HomeStyles.flex}>
        <Text style={[styles.profileName]}>Bùi Thị Ngân</Text>
        <Text style={styles.detailLink}> Xem chi tiết </Text>
      </View>
      <View>
        <MaterialIcons name="navigate-next" size={30} color="black" />
      </View>
      
    </TouchableOpacity>

    {/* Bảo mật */}
    <Text style={styles.txtSmall}>Về ứng dụng</Text>
    <TouchableOpacity style={styles.profileContainer}>
      
      <View style={HomeStyles.flexInput}>
        <AntDesign name="infocirlceo" size={24} color="black" />
        <Text> Giới thiệu</Text>
        <View style={styles.iconContainer}>
          <MaterialIcons name="navigate-next" size={30} color="black" />
        </View>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.profileContainer}>
      
      <View style={HomeStyles.flexInput}>
        <MaterialIcons name="security" size={24} color="black" />
        <Text> Chính sách bảo mật</Text>
        <View style={styles.iconContainer}>
          <MaterialIcons name="navigate-next" size={30} color="black" />
        </View>
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.profileContainer}>
      <View style={HomeStyles.flexInput}>
      <AntDesign name="customerservice" size={24} color="black" />
        <Text> Điều khoản & Dịch vụ</Text>
        <View style={styles.iconContainer}>
          <MaterialIcons name="navigate-next" size={30} color="black" />
        </View>
      </View>
    </TouchableOpacity>

    <Text style={styles.txtSmall}>Về tài khoản</Text>
    <TouchableOpacity style={styles.profileContainer}>
      <View style={HomeStyles.flexInput}>
      <MaterialCommunityIcons name="key-change" size={24} color="black" />
        <Text> Đổi mật khẩu</Text>
        <View style={styles.iconContainer}>
          <MaterialIcons name="navigate-next" size={30} color="black" />
        </View>
      </View>

    </TouchableOpacity>
    <TouchableOpacity style={styles.profileContainer}>
      <View style={HomeStyles.flexInput}>
      <MaterialIcons name="delete-outline" size={24} color="black" />
        <Text> Xóa tài khoản</Text>
        <View style={styles.iconContainer}>
          <MaterialIcons name="navigate-next" size={30} color="black" />
        </View>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.profileContainer}>
      <View style={HomeStyles.flexInput}>
      <MaterialIcons name="logout" size={24} color="black" />
        <Text> Đăng xuất</Text>
        <View style={styles.iconContainer}>
          <MaterialIcons name="navigate-next" size={30} color="black" />
        </View>
      </View>
    </TouchableOpacity>


  </View>
);

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    elevation: 3,
    width:"100%",
    ...SHADOWS.medium
  },
  // image: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   marginRight: 10,
  // },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.color_1,
  },
  detailLink: {
    color: COLOR.secondary,
  },
  iconContainer: {
    padding:15,
    marginLeft: 'auto', // Sử dụng marginLeft: 'auto' để đẩy phần tử này ra cuối hàng ngang
  },
  txtSmall:{
    marginRight:"auto",
    marginHorizontal:20,
    marginVertical:10,
    color:COLOR.color_1,
    fontWeight:"bold"
  }
});

export default ProfileScreen;
