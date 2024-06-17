import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import HomeStyles from "../../Styles/HomeStyles";
import MyContext from "../../configs/MyContext";
import { COLOR, SHADOWS } from "../common/color";
import { Entypo, Feather } from "@expo/vector-icons";
import MyStyles from "../../Styles/MyStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import LoadingPage from "../Loading/LoadingPage";

const DetailPost = ({ route }) => {
    const [user] = useContext(MyContext);
    const { postId } = route.params;
    const [data, setData] = useState();
    const [motel, setMotel] = useState();
    const [loading, setLoading] = useState(true);

    const fetchApiDetailPost = async (postId) => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            const res = await authApi(token).get(endpoints["getDetailPost"](postId));
            console.log("Thành công");
            console.log(res.data);
            setData(res.data);
            fetchApiDetailMotel(res.data.motel);
        } catch (ex) {
            Alert.alert("Lỗi", "Hãy thử lại sau!");
            console.error(ex);
        }
    };

    const fetchApiDetailMotel = async (id) => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            const res = await authApi(token).get(endpoints["detailMotel"](id));
            console.log("Thành công");
            console.log(res.data);
            setMotel(res.data);
            setLoading(false);
        } catch (ex) {
            Alert.alert("Lỗi", "Hãy thử lại sau!");
        }
    };

    useEffect(() => {
        fetchApiDetailPost(postId);
    }, []);

    const renderImageItem = ({ item }) => (
        <Image source={{ uri: item.url }} style={styles.image} />
    );

    return (
        <View style={HomeStyles.postContainer}>
            {loading ? (
                <LoadingPage />
            ) : (
                <View style={styles.myPost}>
                    <View style={HomeStyles.postContainer}>
                        <View style={HomeStyles.userInfoContainer}>
                            <TouchableOpacity style={HomeStyles.avatarContainer}>
                                <Image source={{ uri: user.avatar }} style={HomeStyles.userAvatar} />
                            </TouchableOpacity>
                            <Text style={HomeStyles.userName}>{user.username}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 10 }}>
                            <Entypo name="location-pin" size={20} color="orange" />
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: "gray" }}>{motel ? motel.other_address : "Đang tải..."}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={HomeStyles.desc}>{data ? data.content : "Đang tải..."}</Text>
                            {motel && motel.images && motel.images.length > 0 ? (
                                <FlatList
                                    data={motel.images}
                                    renderItem={renderImageItem}
                                    keyExtractor={(item) => item.id.toString()}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            ) : (
                                <Text>Không có hình ảnh</Text>
                            )}
                        </View>
                    </View>
                    <View style={styles.iconContainer}>
                        <View style={MyStyles.flex}>
                            <Text style={{ fontWeight: "bold" }}>{data ? data.like_count : 0} </Text>
                            <TouchableWithoutFeedback>
                                <Feather style={HomeStyles.iconPost} name="heart" size={24} color="black" />
                            </TouchableWithoutFeedback>
                            <Text style={{ fontWeight: "bold" }}>{data ? data.comment_count : 0} </Text>
                            <TouchableWithoutFeedback>
                                <Feather style={HomeStyles.iconPost} name="message-circle" size={24} color="black" />
                            </TouchableWithoutFeedback>
                            <TouchableOpacity onPress={() => handleShare(postId)}>
                                <Feather name="send" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                   
                   
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    // ảnh bài đăng
    image: {
        height: 260,
        width: 260, // Thiết lập chiều rộng để phù hợp với danh sách ngang
        resizeMode: "cover",
        marginRight: 10,
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
});

export default DetailPost;
