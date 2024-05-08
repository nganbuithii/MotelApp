import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLOR, SHADOWS } from '../common/color';
import HomeStyles from '../../Styles/HomeStyles';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ChatSc = () => {
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigation = useNavigation(); // Sử dụng hook useNavigation
  const [users, setUsers] = useState([
    { id: 1, name: 'John', avatar: require('../../assets/images/3.png') },
    { id: 2, name: 'Alice', avatar: require('../../assets/images/3.png') },
    { id: 3, name: 'Bob', avatar: require('../../assets/images/3.png') },
    { id: 4, name: 'Emma', avatar: require('../../assets/images/3.png') },
    { id: 5, name: 'Mike', avatar: require('../../assets/images/3.png') },
  ]);

  const handleSearch = (text) => {
    setSearchText(text);
    // Thực hiện tìm kiếm người dùng dựa trên text tìm kiếm ở đây
  };

  const navigateToChatDetail = (user) => {
    // Thực hiện chuyển đến trang chat detail với thông tin người dùng
    console.log('Navigate to chat detail for:', user);

  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity style={styles.userContainer} onPress={() => navigation.navigate("ChatDetail")}>
      <Image source={item.avatar} style={styles.avatar} />
      <Text style={styles.userName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={HomeStyles.tab}>
        <MaterialCommunityIcons name="wechat" size={30} color={COLOR.PRIMARY} style={HomeStyles.bellIcon} />
        <Text style={HomeStyles.textHead}>Tin nhắn của bạn</Text>

      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        iconColor={COLOR.PRIMARY} // Màu của biểu tượng tìm kiếm
        style={styles.searchBar}
      />


      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
  },
  searchBar: {
    backgroundColor: 'transparent', // Màu nền của thanh tìm kiếm
    borderTopWidth: 0, // Xóa viền trên của thanh tìm kiếm
    borderBottomWidth: 3, // Viền dưới của thanh tìm kiếm
    borderBottomColor: COLOR.PRIMARY, // Màu của viền dưới
    paddingHorizontal: 10, // Khoảng cách giữa nội dung và biên của thanh tìm kiếm
    // marginTop: 20, // Khoảng cách từ đỉnh màn hình đến thanh tìm kiếm
    elevation: 0, // Xóa bóng đổ của thanh tìm kiếm
    backgroundColor: "#fff",
    color: "#fff",
    marginBottom: 20,
    ...SHADOWS.small,
    marginTop:3
  },
});

export default ChatSc;
