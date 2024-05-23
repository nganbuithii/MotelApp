import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HomeStyles from '../../Styles/HomeStyles';
import MyContext from '../../configs/MyContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, endpoints } from '../../configs/API';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, dispatch] = React.useContext(MyContext); // Lấy thông tin người dùng từ context

  const goToProfileDetail = () => {
    // navigation.navigate('ProfileDetail'); // Điều hướng đến màn hình ProfileDetail
    navigation.navigate("DetailOwner", {ownerId: user.id});
    console.log("USER",user);
  };
  const goToService = () => {
    navigation.navigate('TermService'); // Điều hướng đến màn hình ProfileDetail
  };

  const logout = async () => {
    console.log("USERRR",user);
    Alert.alert(
      "Cảnh báo",
      "Bạn có chắc là muốn đăng xuất?",
      [
        {
          text: "OK",
          onPress:  async() => {
            await AsyncStorage.clear();
            navigation.navigate("Login")
          },
        },
        {
          text: "Hủy",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }
  const deleteUser = async () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa tài khoản?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("access-token");
              await authApi(token).delete(endpoints["current_user"]);
              console.log("Xóa tài khoản thành công");
              navigation.navigate("Login");
            } catch (ex) {
              console.error(ex);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text style={MyStyles.textHead}>Hồ sơ cá nhân</Text> */}

      {/* Ô thông tin user */}
      <TouchableOpacity style={HomeStyles.profileContainer} onPress={goToProfileDetail} >
        <Image
          source={{ uri: user.avatar }} // Thay đổi đường dẫn của ảnh mặc định
          style={HomeStyles.image}
        />
        <View style={HomeStyles.flex}>
          <Text style={[HomeStyles.profileName]}>{user.username}</Text>
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

      <TouchableOpacity style={HomeStyles.profileContainer} onPress={goToService} >
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
      <TouchableOpacity style={HomeStyles.profileContainer} onPress={deleteUser}>
        <View style={HomeStyles.flexInput}>
          <MaterialIcons name="delete-outline" size={24} color="black" />
          <Text> Xóa tài khoản</Text>
          <View style={HomeStyles.iconContainer}>
            <MaterialIcons name="navigate-next" size={30} color="black" />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={HomeStyles.profileContainer} onPress={logout}>
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
