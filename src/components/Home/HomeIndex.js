import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native';
import MyStyles from '../../Styles/MyStyles'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import HomeStyles from './HomeStyles';
import MyContext from '../../configs/MyContext';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { COLOR, SHADOWS } from '../common/color';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import API, { endpoints } from '../../configs/API';


const images = [
  { id: '1', uri: require('../../assets/images/2.png') },
  { id: '2', uri: require('../../assets/images/1.jpg') },
  { id: '3', uri: require('../../assets/images/4.jpg') },
];
const HomeIndex = ({ route }) => {
  const [postContent, setPostContent] = useState('');
  const [user, dispatch] = useContext(MyContext);
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);



  const handlePostChange = (text) => {
    setPostContent(text);
  };
  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item.url }}
      style={[styles.image, { width: Dimensions.get('window').width }]}
    />
  );
  
  
  
  const [currentIndex, setCurrentIndex] = useState(0);
  // Hàm được gọi mỗi khi người dùng thay đổi ảnh hiện tại
  const onViewableItemsChanged = ({ viewableItems }) => {
    // Lấy index của ảnh hiện tại và cập nhật state currentIndex
    const index = viewableItems[0]?.index ?? 0;
    setCurrentIndex(index);
  };

  const fetchDataGetAllPost = async () => {
    try {
      let res = await API.get(endpoints["getAllPostForOwner"]);
      console.log(res.data);
      setPosts(res.data.results);
    } catch (ex) {
      console.error(ex);
    }

  }
  useEffect(() => {
    fetchDataGetAllPost();
  }, []);

  return (
    <View style={MyStyles.container}>
      {/* Bài viết */}
      <ScrollView style={styles.scrollContainer}>
        {/* Thanh đăng bài nằm ngang */}
        <View style={HomeStyles.postBar}>
          <Image
            source={{ uri: user.avatar }} // Thay đổi đường dẫn của ảnh mặc định
            style={HomeStyles.image}
          />
          <TouchableOpacity onPress={() => navigation.navigate("CreatePost")}>
            <View style={HomeStyles.postInputContainer}>
              <TextInput
                style={HomeStyles.postInput}
                placeholder="Bạn muốn đăng bài?"
                value={postContent}
                multiline
                editable={false}
              />
              <TouchableOpacity style={HomeStyles.plusButton} onPress={() => navigation.navigate("CreatePost")} >
                <AntDesign name="pluscircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
        {/* Bài viết */}
        {posts.map((post) => (
          <View key={post.id} style={styles.myPost}>
            <TouchableOpacity>
              <View style={styles.postContainer}>
                <View style={styles.userInfoContainer}>
                  <TouchableOpacity onPress={() => navigation.navigate("DetailOwner", { userId: post.user.id })}>
                    <Image
                      source={{ uri: post.user.avatar }}
                      style={styles.userAvatar}
                    />
                  </TouchableOpacity>
                  <Text style={styles.userName}>{post.user.username}</Text>
                </View>
                <TouchableOpacity style={styles.btnFollow}>
                  <Text style={{ color: "#fff" }}> Theo dõi</Text>
                  <Entypo name="plus" size={12} color="#fff" />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.desc}>{post.content}</Text>
                {/* Ảnh bài đăng */}
                <FlatList
                  data={post.motel.images}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal // Hiển thị ngang
                  pagingEnabled // Cuộn trang theo trang
                  showsHorizontalScrollIndicator={false} // Ẩn thanh trượt ngang
                  onViewableItemsChanged={onViewableItemsChanged}
                />
              </View>
              {/* Hiển thị badge */}
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{currentIndex + 1}/{post.motel.images.length}</Text>
              </View>
              {/* icon */}
              <View style={styles.iconContainer}>
                <View style={MyStyles.flex}>
                  <Feather style={HomeStyles.iconPost} name="heart" size={24} color="black" />
                  <Feather style={HomeStyles.iconPost} name="message-circle" size={24} color="black" />
                  <Feather name="send" size={24} color="black" />
                </View>
                <Feather name="bookmark" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
  
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  userInfoContainer: {
    width: "73%",
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20, // Đặt borderRadius thành một giá trị bằng nửa của chiều rộng hoặc chiều cao
    marginRight: 10,
    borderWidth: 2, // Độ dày của viền
    borderColor: COLOR.color3, // Màu sắc của viền
  },
  userName: {
    fontWeight: 'bold',
  },
  btnFollow: {
    backgroundColor: COLOR.input_default,
    padding: 5,
    paddingVertical: 5,
    borderRadius: 25,
    flexDirection: "row",
    marginLeft: "auto"
  },
  // ảnh bài đăng
  image: {
    // width: "100%", // Chiếm full chiều rộng
    height: 300, // Đặt chiều cao cố định hoặc có thể sử dụng "auto" để tự động tính toán chiều cao dựa trên tỷ lệ khung hình
    resizeMode: "cover", // Hiển thị ảnh mà không làm méo hoặc biến dạng
    position: "relative"
  },
  //ICON POST
  //ICON POST
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Sắp xếp các icon theo hai phía
    paddingHorizontal: 15, // Khoảng cách giữa icon và mép
    borderTopWidth: 1, // Đường viền trên
    borderColor: '#e0e0e0', // Màu đường viền
    paddingVertical: 10, // Khoảng cách giữa icon và mép
  },
  iconPost: {
    marginRight: 12
  },
  myPost: {
    backgroundColor: COLOR.offWhite,
    width: "100%",
    borderRadius: 10,
    ...SHADOWS.small,
    marginBottom: 10

  },
  //mô tả
  desc: {
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  //BADGE
  badgeContainer: {
    backgroundColor: COLOR.color12,
    width: "12%",
    padding: 7,
    borderRadius: 15,
    paddingVertical: 7,
    paddingHorizontal: 10,
    position: "absolute",
    right: "4%", // Thay vị trí cố định bằng phần trăm
    top: "80%", // Thay vị trí cố định bằng phần trăm
  },
  badgeText: {
    color: "#fff"
  }


});

export default HomeIndex;
