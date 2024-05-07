import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import MyStyles from "../../Styles/MyStyles";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import HomeStyles from "./HomeStyles";
import MyContext from "../../configs/MyContext";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { COLOR, SHADOWS } from "../common/color";
import { useNavigation } from "@react-navigation/native";
import API, { authApi, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleLineIcons } from '@expo/vector-icons';

const HomeIndex = ({ route }) => {
  const [postContent, setPostContent] = useState("");
  const [user, dispatch] = useContext(MyContext);
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(false);
  const [likedState, setLikedState] = useState({});
  const [render, setRender] = useState(false);
  const [showOptions, setShowOptions] = useState({});



  const handlePostChange = (text) => {
    setPostContent(text);
  };
  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item.url }}
      style={[styles.image, { width: Dimensions.get("window").width }]}
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
  };
  useEffect(() => {
    fetchDataGetAllPost();
  }, [render]);
  // Khôi phục likedState từ AsyncStorage khi tải trang
  useEffect(() => {
    const restoreLikedState = async () => {
      try {
        const likeStateArr = await AsyncStorage.getItem("liked");
        if (likeStateArr !== null) {
          setLikedState(JSON.parse(likeStateArr));
          console.log("Khôi phục trạng thái thành công");
        }
      } catch (error) {
        console.error("Lỗi khôi phục trạng thái đã thích:", error);
      }
    };

    restoreLikedState();
  }, []);
  const handleLike = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("access-token");
      console.log(token);
      console.log(postId);
      await authApi(token).post(endpoints['likePost'](postId));
      console.log("like bài thành công");
      setRender(!render);
      // Nếu bài viết đã được like trước đó, xoá nó khỏi state likedState
      // Tạo một bản sao mới của likedState để cập nhật
      const newLikedState = { ...likedState };
      // Nếu bài viết đã được like trước đó, xoá nó khỏi newLikedState
      if (likedState[postId]) {
        delete newLikedState[postId];
      } else {
        // Nếu bài viết chưa được like trước đó, thêm nó vào newLikedState
        newLikedState[postId] = true;
      }
      setLikedState(newLikedState);
      // Lưu likedState mới vào AsyncStorage
      await AsyncStorage.setItem("liked", JSON.stringify(newLikedState));
    } catch (ex) {
      console.error(ex);
      console.log("Lỗi like bài");
    }
  }
  const handleComment = (postId) => {
    console.log(postId);
    navigation.navigate("Comment", { postId: postId });
  };
  const deletePost = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("access-token");
      await authApi(token).delete(endpoints["deletePost"](postId));
      console.log("Xóa bài thành công");
      setRender(!render);
    } catch (ex) {
      console.error(ex);
      console.log("Lỗi xóa bài");
    }
  }
  
  const handleDelete = async (postId) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xóa bài viết này?',
      [
        {
          text: 'Hủy',
          onPress: () => {
            // Ẩn modal box khi người dùng nhấn hủy
            setShowOptions({ ...showOptions, [postId]: false });
          },
          style: 'cancel'
        },
        { text: 'OK', onPress: () => deletePost(postId) }
      ],
      { cancelable: false }
    );
    
  }
  const handleEdit = async (postId) => {

  }

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
              <Text style={HomeStyles.postInputPlaceholder}>
                Bạn muốn đăng bài?
              </Text>
              <AntDesign name="pluscircleo" size={24} color="black" />
            </View>
          </TouchableOpacity>

        </View>
        {/* Bài viết */}
        {posts.map((post) => (
          <View key={post.id} style={styles.myPost}>
            <Text>id: {post.id}</Text>


            <View style={styles.postContainer}>
              <View style={styles.userInfoContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("DetailOwner", { userId: post.user.id, })} >
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
              {post.user.id === user.id && (
                <TouchableWithoutFeedback onPress={() => setShowOptions({ ...showOptions, [post.id]: !showOptions[post.id] })}>
                  <SimpleLineIcons name="options-vertical" size={20} color="black" />
                </TouchableWithoutFeedback>
              )}


            </View>
            {showOptions[post.id] && (
              <View style={styles.modalContainer}>
                <TouchableOpacity onPress={() => handleEdit(post.id)}>
                  <Text style={styles.optionText}>Sửa bài</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(post.id)}>
                  <Text style={styles.optionText}>Xóa bài</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={{ flexDirection: "row" }}>
              <Entypo name="location-pin" size={20} color="orange" />
              <Text style={{ color: "gray" }}>
                {post.motel.ward}, {post.motel.district}, {post.motel.city}
              </Text>
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
              <Text style={styles.badgeText}>
                {currentIndex + 1}/{post.motel.images.length}
              </Text>
            </View>
            {/* icon */}
            <View style={styles.iconContainer}>
              <View style={MyStyles.flex}>
                <Text>{post.like_count} </Text>
                <TouchableWithoutFeedback onPress={() => handleLike(post.id)}>
                  {likedState[post.id] ? <AntDesign name="heart" size={24} color="red" /> :
                    <Feather style={HomeStyles.iconPost} name="heart" size={24} color="gray" />}
                </TouchableWithoutFeedback>
                <Text>{post.comment_count} </Text>

                <TouchableWithoutFeedback onPress={() => handleComment(post.id)}>
                  <Feather
                    style={HomeStyles.iconPost}
                    name="message-circle"
                    size={24}
                    color="black"
                  /></TouchableWithoutFeedback>
                <Feather name="send" size={24} color="black" />
              </View>
              <Feather name="bookmark" size={24} color="black" />
            </View>

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
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  userInfoContainer: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
  },
  btnFollow: {
    backgroundColor: COLOR.input_default,
    padding: 5,
    paddingVertical: 5,
    borderRadius: 25,
    flexDirection: "row",
    // marginLeft: "auto",
  },
  // ảnh bài đăng
  image: {
    // width: "100%", // Chiếm full chiều rộng
    height: 300, // Đặt chiều cao cố định hoặc có thể sử dụng "auto" để tự động tính toán chiều cao dựa trên tỷ lệ khung hình
    resizeMode: "cover",
    position: "relative",
  },
  //ICON POST
  //ICON POST
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Sắp xếp các icon theo hai phía
    paddingHorizontal: 15, // Khoảng cách giữa icon và mép
    borderTopWidth: 1, // Đường viền trên
    borderColor: "#e0e0e0", // Màu đường viền
    paddingVertical: 10, // Khoảng cách giữa icon và mép
  },
  iconPost: {
    marginRight: 12,
  },
  myPost: {
    backgroundColor: COLOR.offWhite,
    width: "100%",
    borderRadius: 10,
    ...SHADOWS.small,
    marginBottom: 10,
  },
  //mô tả
  desc: {
    paddingHorizontal: 15,
    paddingVertical: 5,
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
    color: "#fff",
  },
  //modal box
  modalContainer: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: COLOR.bg_color1,
    // borderRadius: 10,
    padding: 10,
    zIndex: 9999,
    elevation: 5, // Độ đục của modal (Android)
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  optionText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default HomeIndex;
