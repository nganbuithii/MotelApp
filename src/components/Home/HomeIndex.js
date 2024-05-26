import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Dimensions, TouchableWithoutFeedback, Alert, ImageBackground, } from "react-native";
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
import Modal from 'react-native-modalbox';
import { Button } from "react-native-paper";
import HomeStyles from "../../Styles/HomeStyles";
import showToast from "../common/ToastMessage";
import { FontAwesome } from '@expo/vector-icons';
import PostCreateStyle from "../../Styles/PostCreateStyle";
import LoadingPage from "../Loading/LoadingPage";
import AdsSlider from "../../components/Home/AdsSlider"

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
  const [loadData, setLoadData] = useState(true);

  const [fetchPage, setFetchPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  let newPage = 1;


  // const [showHouseList, setShowHouseList] = useState(true);
  const [modalsEdit, setModalsEdit] = useState({});
  const [content, setContent] = useState();

  const [tinTimNhaActive, setTinTimNhaActive] = useState(false);
  const [tinChoThueActive, setTinChoThueActive] = useState(true);
  const [page, setPage] = useState(1); // Trang hiện tại
  const [dataMotel, setDataMotel] = useState([]);

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
      style={[styles.image, { width: Dimensions.get("window").width - 40 }]}
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
      if (res.data.next != null) {
        setHasNextPage(true);
      }
      // setLoadData(false);
    } catch (ex) {
      console.error("lỗi fetch data get motel all post", ex);
    }
  };
  useEffect(() => {
    fetchDataGetAllPost();
    setLoading(false);
    // getAllPostForRent();



  }, [render]);

  const handleLike = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("access-token");
      await authApi(token).post(endpoints['likePost'](postId));
      console.log("like bài thành công");
      // Cập nhật trạng thái liked cho bài đăng đã được thích trong state likedState
      setLikedState(prevLikedState => ({ ...prevLikedState, [postId]: true }));

      // Cập nhật bài đăng được thích trong state posts
      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, liked: true };
        }
        return post;
      }));
      if (tinTimNhaActive == true) {
        getAllPostForRent();
      } else if (tinChoThueActive == true) {
        setRender(!render);
      }
    } catch (ex) {
      console.error(ex);
      console.log("Lỗi like bài");
    }
  }
  const handleComment = (postId) => {
    console.log(postId);
    navigation.navigate("Comment", { postId: postId });

    navigation.addListener('focus', async () => {
      if (tinTimNhaActive == true) {
        getAllPostForRent();
      } else if (tinChoThueActive == true) {
        setRender(!render);
      }

    });
  };
  const deletePost = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("access-token");
      await authApi(token).delete(endpoints["deletePost"](postId));
      console.log("Xóa bài thành công");
      if (tinTimNhaActive == true) {
        getAllPostForRent();
      } else if (tinChoThueActive == true) {
        setRender(!render);
      }
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
    if (tinTimNhaActive == true) {
      navigation.navigate("Editpost", { postId: postId, post: post });
    } else {


      setModalsEdit({ ...modalsEdit, [postId]: post });
      setShowOptions({ ...showOptions, [postId]: false });
      let motels = await getMotel();

      // Cập nhật nội dung bài đăng và nhà trọ trước đó
      setContent(post.content);
      setSelectedHouse(post.motel);
    }
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


      showToast({ type: "success", text1: "Thành công", text2: "Cập nhật thành công" });
      console.log("Cập nhật bài đăng:", postId);
      setRender(!render);
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
      console.error("Lỗi get motel", ex);
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
      console.error("Lỗi get all post for rent", ex);
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
    navigation.addListener('focus', async () => {
      if (tinTimNhaActive == true) {
        getAllPostForRent();
      } else if (tinChoThueActive == true) {
        setRender(!render);
      }

    });
  }
  // const fetchNextPagePost = async () => {
  //   try {
  //     setLoading(true); // Đánh dấu loading khi bắt đầu fetch dữ liệu
  //     const nextPage = page + 1;
  //     setPage(nextPage);
  //     console.log("PAGE:", nextPage);
  //     console.log("fetchNextPagePost được gọi khi cuộn đến cuối view");
  //     const token = await AsyncStorage.getItem("access-token");
  //     let res = await authApi(token).get(endpoints["getAllPostForOwner"], {
  //       params: { page: nextPage }
  //     });
  //     const newData = res.data.results;
  //     console.log("Data mới được fetch", res.data.results);
  //     console.log("NEW", newData);
  //     // Kiểm tra nếu newData không rỗng thì cập nhật danh sách bài đăng
  //     if (newData && newData.length > 0) {
  //       setPosts(prevPosts => [...prevPosts, ...newData]);
  //     }
  //     setFetchPage(true);
  //   } catch (ex) {
  //     console.error("lỗi fetchNextPagePost", ex);
  //   }
  // }
  // const handleScroll = (event) => {
  //   // console.log("Hàm đc gọi");
  //   const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
  //   // console.log(layoutMeasurement);
  //   // console.log(contentOffset);
  //   // console.log("CONTENT SIZE",contentSize);
  //   // Kiểm tra nếu nội dung đã cuộn đến cuối và không đang loading thì fetch dữ liệu mới
  //   if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1000 && !loading) {
  //     console.log("ok");
  //     fetchNextPagePost();
  //   }
  // };
  const handleDetail = (idMotel) => {
    console.log(idMotel);
    navigation.navigate("PostDetail", { idMotel: idMotel })
  }
  const handleShare = (id) => {
    // Tạo URL ảo dựa trên thông tin của bài viết
    const URL = `https://motel.pythonanywhere.com/posts/${id}`;

    // Hiển thị URL ảo cho người dùng
    Alert.alert('Chia sẻ liên kết ', URL);
  };
  const handleFollow = async (idUser) => {
    try {
      const token = await AsyncStorage.getItem("access-token");
      console.log(token);
      console.log("í user", idUser);
      let res = await authApi(token).post(endpoints["follow"](idUser));
      // setOwnerFollowed(true);
      console.log("follow họ thành công");
      if (tinTimNhaActive == true) {
        getAllPostForRent();
      } else if (tinChoThueActive == true) {
        setRender(!render);
      }

    } catch (ex) {
      console.error("Lỗi folloe", ex);
    }
  }

  const getAllMotel = async () => {
    try {
      const token = await AsyncStorage.getItem("access-token");
      let res = await authApi(token).get(endpoints["getMotelFilter"]);
      console.log("DATAAAAAAAA NHÀ TRỌ ALL:", res.data);

      const updatedResults = [];
      for (const motel of res.data.results) {
        const updatedMotel = await DetailMotelById(motel.id);
        updatedResults.push(updatedMotel);
      }

      setDataMotel(updatedResults);
      console.log("DATA UPDATED RESULTS:", updatedResults);
      setLoadData(false);
    } catch (ex) {
      console.error("lỗi get all motel", ex);
    }
  }

  const DetailMotelById = async (id) => {
    try {
      const token = await AsyncStorage.getItem("access-token");
      const res = await authApi(token).get(endpoints["detailMotel"](id));
      console.log(res.data);

      // Kiểm tra xem có hình ảnh được trả về hay không
      if (res.data.images && res.data.images.length > 0) {
        // Thêm các hình ảnh vào kết quả của nhà trọ
        const motelIndex = dataMotel.findIndex(motel => motel.id === id);
        if (motelIndex !== -1) {
          dataMotel[motelIndex].images = res.data.images;
        }
      }

      return res.data; // Trả về dữ liệu của nhà trọ đã được cập nhật
    } catch (ex) {
      console.error("Lỗi detail motel í", ex);
      return null;
    }
  }


  useEffect(() => {
    getAllMotel();
    console.log("DATAAAAA3J23IO23:", dataMotel);
  }, [])
  const fetchNextPagePost = async () => {
    try {
      newPage = newPage + 1;
      setLoading(true); // Đặt loading state thành true để hiển thị loading indicator
      const token = await AsyncStorage.getItem("access-token");
      // Fetch dữ liệu của trang tiếp theo
      let res = await authApi(token).get(`https://motel.pythonanywhere.com/post/for_lease/?page=${newPage}`);
      const newData = res.data.results;
      console.log("DATTTTTTTTTTAAA PAGE MỚI", newData);
      if(res.data.next==null){
        setHasNextPage(false);
      }
      // Kiểm tra nếu có dữ liệu trang tiếp theo, cập nhật state của posts
      if (newData && newData.length > 0) {
        setPosts(prevPosts => [...prevPosts, ...newData]);
      }
      console.log("Lấy page mới thành công");
      // // Đặt loading state thành false khi fetch hoàn thành
      // setLoading(false);
    } catch (ex) {
      console.error("Lỗi fetchNextPagePost", ex);
      // Xử lý lỗi nếu có
      // setLoading(false);
    }
  };
  
  return (
    <View style={MyStyles.container}>
      {loadData ? <LoadingPage /> : (
        <ScrollView style={HomeStyles.flex}

        // onScroll={handleScroll}
        // scrollEventThrottle={16} // Tần số gọi hàm khi cuộn (16ms = 60fps)
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
          <View style={{ flex: 1 }}>
            <AdsSlider />
          </View>


          <View style={{
            backgroundColor: COLOR.offWhite,
            paddingVertical: 10,
          }}>
            <Text style={[PostCreateStyle.sectionTitle, { color: COLOR.PRIMARY }]}>Khám phá phòng trọ</Text>
            <FlatList
              data={dataMotel}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => handleDetail(item.id)}>
                  <View style={HomeStyles.KhamPha}>
                    <ImageBackground
                      source={{ uri: item.images[0]?.url }}
                      style={{ width: 150, height: 180, borderRadius: 10, overflow: 'hidden' }}
                      blurRadius={7} // Đặt độ mờ ở đây
                    >
                      {/* <Text style={{ color: 'white', fontSize: 16, position: 'absolute', bottom: 10, left: 10 }}>{item.id}</Text> */}
                      <View style={HomeStyles.kpContainer}>
                        {/* <FontAwesome6 name="location-dot" size={15} color="orange" style={HomeStyles.iconPost} /> */}
                        <Text style={HomeStyles.kpText}>{item.city}</Text>
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>


          {/* <TouchableOpacity onPress={fetchNextPagePost}><Text>khfwkehf</Text></TouchableOpacity> */}
          <View style={HomeStyles.buttonContainer}>
            <TouchableOpacity style={[HomeStyles.buttonLoc, tinChoThueActive ? HomeStyles.activeButton : null]} onPress={handleTinChoThue}>
              <Text style={[HomeStyles.buttonText, tinChoThueActive ? HomeStyles.activeButtonText : null]}>Tin bài cho thuê</Text>
              <FontAwesome name="home" size={15} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={[HomeStyles.buttonLoc, tinTimNhaActive ? HomeStyles.activeButton : null,]} onPress={handleTinTimNha}>
              <Text style={[HomeStyles.buttonText, tinTimNhaActive ? HomeStyles.activeButtonText : null]}>Tin tìm nhà</Text>
              <FontAwesome5 name="search" size={15} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            {tinChoThueActive && <Text style={[PostCreateStyle.sectionTitle, { color: COLOR.PRIMARY }]}>Bảng tin bài đăng cho thuê nhà</Text>}
            {tinTimNhaActive && <Text style={[PostCreateStyle.sectionTitle, { color: COLOR.PRIMARY }]}>Bảng tin tìm nhà</Text>}
          </View>
          {posts.map((post, index) => (
            <View key={index} style={styles.myPost}>
              {/* <Text>id: {post.id}</Text> */}
              {post.user.id === user.id && (
                <TouchableWithoutFeedback onPress={() => setShowOptions({ ...showOptions, [post.id]: !showOptions[post.id] })}>
                  <Entypo name="dots-three-horizontal" style={HomeStyles.iconDetail} size={24} color="black" />
                </TouchableWithoutFeedback>
              )}

              <View style={HomeStyles.postContainer}>

                <View style={HomeStyles.userInfoContainer}>

                  <TouchableOpacity
                    style={HomeStyles.avatarContainer}
                    onPress={() => {
                      navigation.navigate("DetailOwner", { ownerId: post.user.id });
                      navigation.addListener('focus', async () => {
                        if (tinTimNhaActive == true) {
                          getAllPostForRent();
                        } else if (tinChoThueActive == true) {
                          setRender(!render);
                        }
                      });
                    }}
                  >
                    <Image
                      source={{ uri: post.user.avatar }}
                      style={HomeStyles.userAvatar}
                    />
                  </TouchableOpacity>

                  <Text style={HomeStyles.userName}>{post.user.username}</Text>
                </View>
                {post.user.id !== user.id && (
                  <TouchableOpacity
                    style={HomeStyles.btnFollow}
                    onPress={() => handleFollow(post.user.id)}
                  >
                    {post.user.followed ? (
                      <Text style={{ color: COLOR.PRIMARY, fontSize: 12 }}>Đang theo dõi</Text>
                    ) : (
                      <Text style={{ color: COLOR.PRIMARY, fontSize: 12 }}>Theo dõi</Text>
                    )}
                    <Entypo name={post.user.followed ? "minus" : "plus"} size={10} color="lightgreen" />
                  </TouchableOpacity>
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
                      {motels.map((item) => (
                        <TouchableOpacity
                          key={item.id.toString()}
                          onPress={() => selectHouse(item)}
                        >
                          <Text style={styles.houseItem}>
                            {item.title}: {item.ward}, {item.district}, {item.city}
                            {selectedHouse && selectedHouse.id === item.id && (
                              <MaterialCommunityIcons
                                name="check"
                                size={24}
                                color="green"
                                style={{ position: "absolute", right: 10 }}
                              />
                            )}
                          </Text>
                        </TouchableOpacity>
                      ))}

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

              <TouchableWithoutFeedback onPress={() => {
                // Kiểm tra nếu vai trò của người dùng là TENANT thì không thực hiện hành động chuyển trang
                if (post.user.user_role === "TENANT") {
                  return;
                }
                // Kiểm tra nếu vai trò của người dùng là MOTEL_OWNER thì thực hiện hành động chuyển trang
                if (post.user.user_role === "MOTEL_OWNER") {
                  handleDetail(post.motel.id, post.user.user_role);
                }
              }}>
                <View>
                  <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 10 }}>
                    <Entypo name="location-pin" size={20} color="orange" />
                    <View style={{ flex: 1 }}>
                      <Text>ID : {post.id}</Text>
                      <Text style={{ color: "gray" }}>
                        {post.motel ? `${post.motel.ward}, ${post.motel.district}, ${post.motel.city}` : `${post.ward}, ${post.district}, ${post.city}`}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text style={HomeStyles.desc}>{post.content}</Text>
                    {/* Ảnh bài đăng */}
                    {post.motel ? (
                      <FlatList
                        data={post.motel.images}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()} // Sử dụng index của mảng làm key
                        horizontal // Hiển thị ngang
                        pagingEnabled // Cuộn trang theo trang
                        showsHorizontalScrollIndicator={false} // Ẩn thanh trượt ngang
                        onViewableItemsChanged={onViewableItemsChanged}
                      />
                    ) : (
                      <Image
                        source={{ uri: post.image }} // Sử dụng uri từ post.image như là nguồn hình ảnh
                        style={styles.image} // Thêm style cho hình ảnh nếu cần
                      />
                    )}

                  </View>
                  {/* Hiển thị badge */}
                  {post.motel && (
                    <View style={HomeStyles.badgeContainer}>
                      <Text style={HomeStyles.badgeText}>
                        {currentIndex + 1}/{post.motel.images.length}
                      </Text>
                    </View>
                  )}

                </View>
              </TouchableWithoutFeedback>
              {/* icon */}
              <View style={styles.iconContainer}>
                <View style={MyStyles.flex}>
                  <Text style={{ fontWeight: "bold" }}>{post.like_count} </Text>
                  <TouchableWithoutFeedback onPress={() => handleLike(post.id)}>
                    {likedState[post.id] ? <AntDesign style={HomeStyles.iconPost} name="heart" size={24} color="red" /> :
                      <Feather style={HomeStyles.iconPost} name="heart" size={24} color="black" />}
                  </TouchableWithoutFeedback>
                  <Text style={{ fontWeight: "bold" }}>{post.comment_count} </Text>

                  <TouchableWithoutFeedback onPress={() => handleComment(post.id)}>
                    <Feather
                      style={HomeStyles.iconPost}
                      name="message-circle"
                      size={24}
                      color="black"
                    /></TouchableWithoutFeedback>
                  <TouchableOpacity onPress={() => handleShare(post.id)}>

                    <Feather name="send" size={24} color="black" />
                  </TouchableOpacity>

                </View>
                {/* <Feather name="bookmark" size={24} color="black" /> */}
              </View>

            </View>
          ))}
          {hasNextPage && (
            <TouchableOpacity onPress={fetchNextPagePost} style={{ padding: 20, backgroundColor: COLOR.PRIMARY, justifyContent: "center", marginHorizontal: 120,borderRadius:30, ...SHADOWS.small, marginVertical:8 }}>
              <Text style={{ color: "#fff", textAlign: "center" }}>Xem thêm</Text>
            </TouchableOpacity>
          )}


        </ScrollView>)}
    </View>
  );
};

const styles = StyleSheet.create({
  // ảnh bài đăng
  image: {
    height: 260,
    resizeMode: "cover",
    position: "relative",
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconPost: {
    marginRight: 12,
  },
  myPost: {
    backgroundColor: COLOR.offWhite,
    borderRadius: 20,
    ...SHADOWS.small,
    marginBottom: 5,
    position: "relative",
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 10,

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
    marginBottom: 10,
    height: 80,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  button: {
    width: "48%",
    marginTop: 10,
    marginRight: 10
  },
  houseItem: {
    padding: 10,
    backgroundColor: "#fff",
    marginTop: 5,
    borderRadius: 15
  },

});

export default HomeIndex;