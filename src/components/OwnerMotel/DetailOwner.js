import React, { useContext, useEffect, useState } from "react";
import {
    View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView,
    Alert,
} from "react-native";
import { COLOR, SHADOWS } from "../common/color";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome6 } from "@expo/vector-icons";
import MyContext from "../../configs/MyContext";
import dateFormat, { masks } from "dateformat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API, { authApi, endpoints } from "../../configs/API";
import { ActivityIndicator } from "react-native-paper";
const now = new Date();
import DetailOwnerStyle from "../../Styles/DetailOwnerStyle";
import showToast from "../common/ToastMessage";
import LoadingPage from "../Loading/LoadingPage";



const DetailOwner = ({ route, navigation }) => {
    // const [showHouseList, setShowHouseList] = useState(false);
    // const [content, setContent] = useState("");
    const [user, dispatch] = useContext(MyContext);
    const { ownerId } = route.params;
    // Chuyển đổi ngày tham gia sang định dạng dd/mm/yyyy
    const [postData, setPostData] = useState([]);

    const [owner, setOwner] = useState();
    const [loading, setLoading] = useState(true);
    const [join, setJoin] = useState();
    const [motelData, setMotelData] = useState();
    const [ownerFollowed, setOwnerFollowed] = useState(false);
    const [render, setRender] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);// CHƯA ai follow
    const [follow, setFollow] = useState(false); // chưa follow
    const [role, setRole] = useState();
    const [renderPost, setRenderPost] = useState(false);

    const getDetailOwner = async () => {
        try {
            let token = await AsyncStorage.getItem("access-token");
            let res = await authApi(token).get(endpoints["detailOwner"](ownerId));
            console.log("Data owner", res.data);
            setOwner(res.data);
            setLoading(false);
            const dateJoined = dateFormat(res.data.date_joined, "dd/mm/yyyy");
            setJoin(dateJoined);
            (res.data.followed == true) ? setFollow(true) : setFollow(false);
            console.log("USERRR", res.data);

            setRole(res.data.user_role === "MOTEL_OWNER" ? "Chủ nhà trọ" : "Người thuê nhà");

        } catch (ex) {
            console.error(ex);
        }
    }
    useEffect(() => {
        if (user.user_role === "TENANT") {
            getAllPostByUser();
        }
    }, [renderPost]);


    const getAllMotelByOwner = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            let res = await authApi(token).get(endpoints["detailMotelOwner"](ownerId));
            console.log("DATA:", res.data);
            setMotelData(res.data)
        } catch (ex) {
        }
    }
    useEffect(() => {
        getDetailOwner();
        getAllMotelByOwner();
    }, [render])
    const handleFollow = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            console.log(token);
            let res = await authApi(token).post(endpoints["follow"](ownerId));
            setOwnerFollowed(true);
            console.log("follow họ thành công");
            setRender(!render);
            setIsFollowing(!isFollowing);
            if (follow == false) {
                dispatch({ type: 'update_user', payload: { ...user, following_count: user.following_count + 1 } }); // Cập nhật số người đang theo dõi
            } else {
                dispatch({ type: 'update_user', payload: { ...user, following_count: user.following_count - 1 } }); // Cập nhật số người đang theo dõi
            }

        } catch (ex) {
            console.error(ex);
        }
    }
    const getAllPostByUser = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            console.log(token);
            console.log(ownerId);
            const res = await authApi(token).get(endpoints["getPostOfUser"](ownerId));
            console.log(res.data);
            console.log("lấy ds thành công");
            setPostData(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }
    const handleEditPost = (postId, post) => {
        navigation.navigate("Editpost", { postId: postId, post: post });
        navigation.addListener('focus', async () => {

            setRenderPost(!renderPost);


        });
    }
    const handleDeletePost = async (idPost) => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            console.log("ID POST", idPost);
            await authApi(token).delete(endpoints["deletePost"](idPost));
            console.log("Xóa thành công");
            setRenderPost(!renderPost);
            showToast({ type: "success", text1: "Thành công", text2: "Xóa bài thành công" });
        } catch (ex) {
            console.error("Xóa bài thất bài", ex);
            showToast({ type: "error", text1: "Lỗi xóa bài", text2: "Hãy thử lại sau" });
        }
    }
    const confirmDeletePost = (id) => {
        Alert.alert(
            'Xác nhận xóa bài đăng',
            'Bạn có chắc chắn muốn xóa bài đăng này?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Xóa',
                    onPress: () => {
                        handleDeletePost(id);
                    },
                },
            ],
            { cancelable: true }
        );
    };
    const renderPostForTenant = () => {
        return (
            <View>
                {postData && postData.length > 0 ? (
                    postData.map((post, index) => (
                        <View style={DetailOwnerStyle.postContainer} key={index}>
                            {/* <Text style={DetailOwnerStyle.postTitle}>Bài đăng {index + 1}</Text> */}
                            {/* <Text>{post.id}</Text> */}
                            <View style={DetailOwnerStyle.userInfoContainer}>
                                <Image
                                    source={{ uri: post.user.avatar }}
                                    style={DetailOwnerStyle.userAvatar}
                                />
                                <Text style={DetailOwnerStyle.username}>{post.user.username}</Text>
                            </View>
                            <View style={DetailOwnerStyle.infoRow}>
                                <MaterialIcons name="add-location-alt" size={24} color={COLOR.PRIMARY} />

                                <Text style={DetailOwnerStyle.infoText}>Địa chỉ khác: {post.other_address}</Text>
                            </View>
                            <View style={DetailOwnerStyle.infoRow}>
                                <Octicons name="location" size={24} color={COLOR.PRIMARY} />
                                <Text style={DetailOwnerStyle.infoText}>Địa chỉ: {post.ward}, {post.district}, {post.city}</Text>
                            </View>
                            <Text style={DetailOwnerStyle.postContent}>{post.content}</Text>
                            <Image
                                source={{ uri: post.image }}
                                style={DetailOwnerStyle.postImage}
                            />
                            <View style={DetailOwnerStyle.postActions}>
                                <TouchableOpacity onPress={() => handleEditPost(post.id, post)}>
                                    <FontAwesome name="edit" size={24} color="orange" style={DetailOwnerStyle.postActionIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => confirmDeletePost(post.id)}>
                                    <FontAwesome name="trash" size={24} color="pink" style={DetailOwnerStyle.postActionIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={DetailOwnerStyle.noPostsText}>Bạn chưa có bài viết nào!</Text>
                )}
            </View>
        );
    }


    const renderMotelData = () => {
        return (
            <View>
                {motelData && motelData.length > 0 ? (
                    motelData.map((item, index) => (
                        <View style={DetailOwnerStyle.infoContainer} key={index}>
                            <Text style={DetailOwnerStyle.buttonText}>Nhà trọ {index + 1}</Text>
                            <View style={DetailOwnerStyle.infoRow}>
                                <Octicons style={DetailOwnerStyle.icon} name="location" size={24} color={COLOR.PRIMARY} />
                                <Text style={DetailOwnerStyle.infoText}>Địa chỉ khác: {item.other_address}</Text>
                            </View>
                            <View style={DetailOwnerStyle.infoRow}>
                                <Octicons style={DetailOwnerStyle.icon} name="location" size={24} color={COLOR.PRIMARY} />
                                <Text style={DetailOwnerStyle.infoText}>Địa chỉ: {item.ward}, {item.district}, {item.city}</Text>
                            </View>
                            <View style={DetailOwnerStyle.infoRow}>
                                <FontAwesome6 style={DetailOwnerStyle.icon} name="house-user" size={20} color={COLOR.PRIMARY} />
                                <Text style={DetailOwnerStyle.infoText}>Diện tích: {item.area}</Text>
                            </View>
                            <View style={DetailOwnerStyle.infoRow}>
                                <MaterialIcons style={DetailOwnerStyle.icon} name="attach-money" size={24} color={COLOR.PRIMARY} />
                                <Text style={DetailOwnerStyle.infoText}>Giá cả: {item.price}</Text>
                            </View>
                            <FlatList
                                data={item.images}
                                renderItem={({ item }) => (
                                    <Image
                                        source={{ uri: item.url }}
                                        style={[
                                            DetailOwnerStyle.imgMotel,
                                            { width: Dimensions.get("window").width / 2 },
                                        ]}
                                    />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                            />
                        </View>
                    ))
                ) : (
                    <Text>Không có dữ liệu nhà trọ.</Text>
                )}
            </View>
        );
    };
    const chatUser = (id) => {
        navigation.navigate("ChatDetail", { ownerId: id });
    }


    return (
        <ScrollView contentContainerStyle={DetailOwnerStyle.scrollViewContent}>
            {loading ? <LoadingPage/> : (
                <View style={DetailOwnerStyle.container}>
                    <Image
                        source={{ uri: owner.avatar }}
                        style={DetailOwnerStyle.bgHead}
                    />
                    {/* Thông tin hình ảnh, tên */}
                    <View style={DetailOwnerStyle.containerProfile}>
                        <Image
                            source={{ uri: owner.avatar }} // Thay đổi đường dẫn của ảnh mặc định
                            style={DetailOwnerStyle.avatar}
                        />
                        {/* <Text>{ownerId}</Text> */}
                        {/* <TouchableOpacity onPress={getAllPostByUser}>
                            <Text> bài đăng</Text>
                        </TouchableOpacity> */}
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            {/* Ẩn nút nhắn tin và nút theo dõi nếu ownerId trùng với user.id */}
                            {ownerId !== user.id && (
                                <>
                                    <TouchableOpacity style={DetailOwnerStyle.btnFollow1} onPress={() => chatUser(owner.id)}>
                                        <Text style={{ color: "#fff" }}> Nhắn tin</Text>
                                        <Entypo name="chat" size={10} color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[DetailOwnerStyle.btnFollow2, ownerFollowed ? DetailOwnerStyle.followingButton : DetailOwnerStyle.followButton]}
                                        onPress={handleFollow}>
                                        {follow ? <Text style={{ color: "#fff" }}>Đang theo dõi</Text> :
                                            <Text style={{ color: "#fff" }}>Theo dõi</Text>
                                        }
                                        <Entypo name={ownerFollowed ? "minus" : "plus"} size={10} color="#fff" />
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                    <View style={DetailOwnerStyle.containerInfo}>
                        <Text style={DetailOwnerStyle.txtName}>{owner.username}</Text>

                        <View style={DetailOwnerStyle.infoRow}>
                            <Text style={DetailOwnerStyle.infoTxt}>Người theo dõi: {owner.follower_count}</Text>
                            <Text style={DetailOwnerStyle.separator}>|</Text>
                            <Text style={DetailOwnerStyle.infoTxt}>Đang theo dõi: {owner.following_count}</Text>
                        </View>
                        <View style={DetailOwnerStyle.infoRow}>
                            <FontAwesome6 style={DetailOwnerStyle.icon} name="user-check" size={24} color={COLOR.PRIMARY} />
                            <Text style={DetailOwnerStyle.infoText}>{role}</Text>
                        </View>
                        <View style={DetailOwnerStyle.infoRow}>
                            <MaterialIcons
                                style={DetailOwnerStyle.icon}
                                name="calendar-month"
                                size={24}
                                color={COLOR.PRIMARY} />
                            <Text style={DetailOwnerStyle.infoText}>Ngày tham gia: {join}</Text>
                        </View>
                    </View>
                    {role === "Chủ nhà trọ" && (
                        <View style={DetailOwnerStyle.buttonContainer}>
                            <View style={DetailOwnerStyle.containerOption}>
                                {/* Các thông tin khác */}
                                {/* Button "Bài đăng của bạn" */}
                                <TouchableOpacity style={DetailOwnerStyle.btnOption} onPress={getAllMotelByOwner}>
                                    <Text style={{ color: "#fff" }}>Thông tin nhà trọ</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style={DetailOwnerStyle.btnOption} onPress={getAllPostByUser}>
                                    <Text style={{ color: "#fff" }}>Bài đăng của bạn</Text>
                                </TouchableOpacity> */}
                            </View>
                            {role === "Chủ nhà trọ" && renderMotelData()}

                        </View>)}

                    {role === "Người thuê nhà" && (
                        <View style={DetailOwnerStyle.buttonContainer}>
                            <Text style={DetailOwnerStyle.buttonText}>Bài đăng của bạn</Text>
                            {role === "Người thuê nhà" && renderPostForTenant()}
                        </View>
                    )}



                </View>)}
        </ScrollView>
    );
};

// const styles = StyleSheet.create({


// });

export default DetailOwner;
