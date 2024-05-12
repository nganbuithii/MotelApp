import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Dimensions, TouchableWithoutFeedback, Alert, } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import MyStyles from "../../Styles/MyStyles";
import { FlatList, ScrollView, TouchableOpacity, } from "react-native-gesture-handler";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import MyContext from "../../configs/MyContext";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { COLOR, SHADOWS } from "../common/color";
import { useNavigation } from "@react-navigation/native";
import API, { authApi, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleLineIcons } from '@expo/vector-icons';
import Modal from 'react-native-modalbox';
import { Button } from "react-native-paper";
import HomeStyles from "../../Styles/HomeStyles";
import showToast from "../common/ToastMessage";
import { FontAwesome } from '@expo/vector-icons';
import RentPostsList from "./RentPostList";

const HomeIndex = ({ route }) => {
  const [postContent, setPostContent] = useState("");
  const [user, dispatch] = useContext(MyContext);
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [likedState, setLikedState] = useState({});
  const [render, setRender] = useState(false);
  const [showOptions, setShowOptions] = useState({});
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [showHouseList, setShowHouseList] = useState(true);
  const [modalsEdit, setModalsEdit] = useState({});
  const [content, setContent] = useState();

  const [tinTimNhaActive, setTinTimNhaActive] = useState(false);
  const [tinChoThueActive, setTinChoThueActive] = useState(true);
  const [page, setPage] = useState(1); // Trang hiện tại

  const [motels, setMotels] = useState([]);
  // const [liked, setLiked] = useState(false);
  const [displayRentPosts, setDisplayRentPosts] = useState(false); // State để kiểm soát việc hiển thị bài đăng thuê
  const selectHouse = (house) => {
    setSelectedHouse(house);
    console.log("Selected House:", house); // Log house thay vì selectedHouse
  };

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
      const token = await AsyncStorage.getItem("access-token");
      let res = await authApi(token).get(endpoints["getAllPostForOwner"]);
      // console.log(res.data);
      setPosts(res.data.results);
      console.log(res.data.results);
      // Cập nhật likedState dựa trên dữ liệu bài đăng
      const newLikedState = {};
      res.data.results.forEach(post => {
        if (post.liked) {
          newLikedState[post.id] = true;
        }
      });
      setLikedState(newLikedState);
    } catch (ex) {
      console.error(ex);
    }
  };
  useEffect(() => {
    fetchDataGetAllPost();
  }, [render]);
  // Khôi phục likedState từ AsyncStorage khi tải trang
  // useEffect(() => {
  //   const restoreLikedState = async () => {
  //     try {
  //       const likeStateArr = await AsyncStorage.getItem("liked");
  //       if (likeStateArr !== null) {
  //         setLikedState(JSON.parse(likeStateArr));
  //         console.log("Khôi phục trạng thái thành công");
  //       }
  //     } catch (error) {
  //       console.error("Lỗi khôi phục trạng thái đã thích:", error);
  //     }
  //   };

  //   restoreLikedState();
  // }, []);
  const handleLike = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("access-token");
      // console.log(token);
      // console.log(postId);
      await authApi(token).post(endpoints['likePost'](postId));
      // console.log("like bài thành công");
      setRender(!render);
      // Cập nhật likedState sau khi thay đổi trạng thái like
      const newLikedState = { ...likedState };
      newLikedState[postId] = !newLikedState[postId];
      setLikedState(newLikedState);
    } catch (ex) {
      console.error(ex);
      console.log("Lỗi like bài");
    }
  }
  const handleComment = (postId) => {
    console.log(postId);
    navigation.navigate("Comment", { postId: postId });

    navigation.addListener('focus', async () => {
      setRender(!render);
    });
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
  const handleEdit = async (postId, post) => {
    // Lưu thông tin về bài đăng được chọn vào state modalsEdit
    setModalsEdit({ ...modalsEdit, [postId]: post });
    setShowOptions({ ...showOptions, [postId]: false });
    let motels = await getMotel();

    // Cập nhật nội dung bài đăng và nhà trọ trước đó
    setContent(post.content);
    setSelectedHouse(post.motel);

  };

  const handleModalClose = () => {
    // Đặt modalsEdit thành một đối tượng rỗng khi đóng modal box
    setModalsEdit({});

  };

  const handleUpdatePost = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("access-token");
      console.log(token);
      console.log(postId);
      // Kiểm tra xem có sự thay đổi nào không
      const currentPost = posts.find(post => post.id === postId);
      const formData = new FormData();

      // Kiểm tra sự thay đổi trong nội dung và thêm trường content vào formData nếu có
      if (currentPost.content !== content) {
        formData.append('content', content);
      }

      // Kiểm tra sự thay đổi trong nhà trọ và thêm trường motel vào formData nếu có
      if (currentPost.motel.id !== selectedHouse.id) {
        formData.append('motel', selectedHouse.id);
      }
      if (currentPost.content === content && currentPost.motel.id === selectedHouse.id) {
        showToast({ type: "error", text1: "Cảnh báo", text2: "Chưa có thông tin mới " });
        handleModalClose();
        return;
      }
      // Nếu có sự thay đổi, gọi API cập nhật
      let res = await authApi(token).patch(endpoints["updatePost"](postId), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setRender(!render);
      showToast({ type: "success", text1: "Thành công", text2: "Cập nhật thành công" });
      console.log("Cập nhật bài đăng:", postId);
      handleModalClose();

    } catch (error) {
      console.error("Lỗi khi cập nhật bài đăng:", error);
    }
  };

  const getMotel = async () => {
    try {
      const token = await AsyncStorage.getItem("access-token");
      let response = await authApi(token).get(endpoints['detailMotelOwner'](user.id));
      let motelData = response.data;
      setMotels(response.data);
      console.log("Get data nhà trọ của user:", response.data);
      setMotels(response.data);
      return motelData;
    } catch (ex) {
      console.error(ex);
    }
  }
  const getAllPostForRent = async () => {
    try {
      const token = await AsyncStorage.getItem("access-token");
      let res = await authApi(token).get(endpoints["getAllPostForRent"]);
      console.log("Bài đăng forr rent", res.data);
      setPosts(res.data.results);
      console.log(res.data.results);
      // Cập nhật likedState dựa trên dữ liệu bài đăng
      const newLikedState = {};
      res.data.results.forEach(post => {
        if (post.liked) {
          newLikedState[post.id] = true;
        }
      });
      setLikedState(newLikedState);
    } catch (ex) {
      console.error("Lỗi", ex);
    }
  }
  const handleTinTimNha = async () => {
    await getAllPostForRent();
    setDisplayRentPosts(false);
    setTinTimNhaActive(true);
    setTinChoThueActive(false);

  }
  const handleTinChoThue = async () => {
    await fetchDataGetAllPost();
    setTinTimNhaActive(false);
    setTinChoThueActive(true);
  }
  const handleCreatePost = async () => {
    user.user_role == "MOTEL_OWNER" ? navigation.navigate("CreatePost") : navigation.navigate("CreatePostRent");
  }
  const fetchNextPagePost = async () => {
    try {
      setLoading(true); // Đánh dấu loading khi bắt đầu fetch dữ liệu
      const nextPage = page + 1;
      setPage(nextPage);
      console.log("PAGE:", nextPage);
      console.log("fetchNextPagePost được gọi khi cuộn đến cuối view");
      const token = await AsyncStorage.getItem("access-token");
      let res = await authApi(token).get(endpoints["getAllPostForOwner"], {
        params: { page: nextPage}
      });
      const newData = res.data.results;
      console.log("Data mới được fetch",res.data.results);
      console.log("NEW",newData);
      // Kiểm tra nếu newData không rỗng thì cập nhật danh sách bài đăng
      if (newData && newData.length > 0) {
        setPosts(prevPosts => [...prevPosts, ...newData]);
      }
    } catch (ex) {
      console.error(ex);
    }
  }
  const handleScroll = (event) => {
    console.log("Hàm đc gọi");
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    // console.log(layoutMeasurement);
    // console.log(contentOffset);
    // console.log("CONTENT SIZE",contentSize);
    // Kiểm tra nếu nội dung đã cuộn đến cuối và không đang loading thì fetch dữ liệu mới
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height-1000 && !loading) {
      console.log("ok");
      fetchNextPagePost();
    }
  };
  return (
    <View style={MyStyles.container}>

      {/* Bài viết */}
      <ScrollView style={styles.scrollContainer}
      
      onScroll={handleScroll}
      scrollEventThrottle={16} // Tần số gọi hàm khi cuộn (16ms = 60fps)
      >
        {/* Thanh đăng bài nằm ngang */}
      
        <View style={HomeStyles.postBar}>
          <Image
            source={{ uri: user.avatar }} // Thay đổi đường dẫn của ảnh mặc định
            style={HomeStyles.image}
          />
          <TouchableOpacity onPress={handleCreatePost}>
            <View style={HomeStyles.postInputContainer}>
              <Text style={HomeStyles.postInputPlaceholder}>
                Bạn muốn đăng bài?
              </Text>
              <AntDesign name="pluscircleo" size={24} color="black" />
            </View>
          </TouchableOpacity>
          

        </View>
        <TouchableOpacity onPress={fetchNextPagePost}><Text>khfwkehf</Text></TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.buttonLoc, tinChoThueActive ? styles.activeButton : null]} onPress={handleTinChoThue}>
            <Text style={[styles.buttonText, tinChoThueActive ? styles.activeButtonText : null]}>Tin bài cho thuê<FontAwesome name="home" size={15} color="#fff" /></Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonLoc, tinTimNhaActive ? styles.activeButton : null]} onPress={handleTinTimNha}>
            <Text style={[styles.buttonText, tinTimNhaActive ? styles.activeButtonText : null]}>Tin tìm nhà<FontAwesome5 name="search" size={15} color="#fff" /></Text>
          </TouchableOpacity>
        </View>
        {posts.map((post, index) => (
          <View key={index} style={styles.myPost}>
            <Text>id: {post.id}</Text>

            <View style={styles.postContainer}>
              <View style={styles.userInfoContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("DetailOwner", { ownerId: post.user.id })}
                >
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
              <View style={HomeStyles.modalContainer}>
                <TouchableOpacity onPress={() => handleEdit(post.id, post)}>
                  <Text style={HomeStyles.optionText}>Sửa bài</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(post.id)}>
                  <Text style={HomeStyles.optionText}>Xóa bài</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Ẩn hiện Modal chỉnh sửa */}
            {modalsEdit[post.id] && (
              <Modal
                isOpen={true}
                onClosed={handleModalClose}
                style={styles.modal}
              >
                <View>
                  <Text style={{ color: "#fff" }}>Mô tả</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setContent(text)}
                    value={content}
                    placeholder="Nội dung mới"
                  />
                  <Text style={{ color: "#fff" }}>Chọn nhà trọ khác</Text>
                  <View style={styles.container}>
                    {displayRentPosts ? (
                      // Dành cho bài đăng thuê
                      post.motel && (
                        <TouchableOpacity
                          key={post.motel.id.toString()}
                          onPress={() => selectHouse(post.motel)}
                        >
                          <Text style={styles.houseItem}>
                            {post.motel.title}: {post.motel.ward}, {post.motel.district}, {post.motel.city}
                            {selectedHouse && selectedHouse.id === post.motel.id && (
                              <MaterialCommunityIcons
                                name="check"
                                size={24}
                                color="green"
                                style={{ position: "absolute", right: 10 }}
                              />
                            )}
                          </Text>
                        </TouchableOpacity>
                      )
                    ) : (
                      // Dành cho bài đăng tìm nhà
                      <Text style={styles.houseItem}>
                        {post.ward}, {post.district}, {post.city}
                      </Text>
                    )}
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Button mode="contained" onPress={() => handleUpdatePost(post.id)} style={styles.button}>
                      Cập nhật
                    </Button>
                    <Button mode="outlined" onPress={handleModalClose} style={styles.button} >
                      Hủy
                    </Button>
                  </View>
                </View>
              </Modal>
            )}

            <TouchableWithoutFeedback onPress={() => navigation.navigate("PostDetail")}>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Entypo name="location-pin" size={20} color="orange" />
                  <Text style={{ color: "gray" }}>
                    <View>
                      <Text style={{ color: "gray" }}>
                        {post.motel ? `${post.motel.ward}, ${post.motel.district}, ${post.motel.city}` : `${post.ward}, ${post.district}, ${post.city}`}
                      </Text>
                    </View>

                  </Text>
                </View>
                <View>
                  <Text style={HomeStyles.desc}>{post.content}</Text>
                  {/* Ảnh bài đăng */}
                  <FlatList
                    data={post.motel ? post.motel.images : []}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal // Hiển thị ngang
                    pagingEnabled // Cuộn trang theo trang
                    showsHorizontalScrollIndicator={false} // Ẩn thanh trượt ngang
                    onViewableItemsChanged={onViewableItemsChanged}
                  />
                </View>
                {/* Hiển thị badge */}
                <View style={HomeStyles.badgeContainer}>
                  <Text style={HomeStyles.badgeText}>
                    {currentIndex + 1}/{post.motel ? post.motel.images.length : 0}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            {/* icon */}
            <View style={styles.iconContainer}>
              <View style={MyStyles.flex}>
                <Text>{post.like_count} </Text>
                <TouchableWithoutFeedback onPress={() => handleLike(post.id)}>
                  {likedState[post.id] ? <AntDesign style={HomeStyles.iconPost} name="heart" size={24} color="red" /> :
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
    height: 300,
    resizeMode: "cover",
    position: "relative",
  },
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
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Mờ mờ
    padding: 20, // Thêm padding để tạo khoảng cách với mép của Modal
    width: "100%",
  },
  input: {
    // flex: 1,

    marginBottom: 10,
    height: 80, // Hoặc một giá trị phù hợp
    // paddingVertical:20,
    paddingHorizontal: 20,
    // height:50,
    // padding: 5,
    backgroundColor: "#fff",
  },

  button: {
    width: "48%", // Sử dụng một phần trăm của chiều rộng của Modal
    marginTop: 10,
    marginRight: 10
  },
  houseItem: {
    padding: 10,
    backgroundColor: "#fff",
    marginTop: 5,
    borderRadius: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: "center",
    marginTop: 10,

  },
  buttonLoc: {
    backgroundColor: COLOR.bg_color1,
    paddingVertical: 12,
    marginLeft: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 30
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  activeButton: {
    backgroundColor: COLOR.PRIMARY, // Màu xanh khi active
  },
  activeButtonText: {
    fontWeight: 'bold', // In đậm khi active
  },
});

export default HomeIndex;