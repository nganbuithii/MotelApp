import React, { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import HomeStyles from "../../Styles/HomeStyles";
import MyContext from "../../configs/MyContext";
import { COLOR, SHADOWS } from "../common/color";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import MyStyles from "../../Styles/MyStyles";

const DetailPost = () => {
    const [user] = useContext(MyContext);

    return (
        <View style={HomeStyles.postContainer}>
            <View style={styles.myPost}>
                <View style={HomeStyles.postContainer}>
                    <View style={HomeStyles.userInfoContainer}>
                        <TouchableOpacity
                            style={HomeStyles.avatarContainer}                                                    >
                            <Image source={{ uri: user.avatar }} style={HomeStyles.userAvatar} />
                        </TouchableOpacity>
                        <Text style={HomeStyles.userName}>{user.username}</Text>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 10 }}>
                        <Entypo name="location-pin" size={20} color="orange" />
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: "gray" }}>371 Nguyen kiem</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={HomeStyles.desc}>hgwdqd</Text>
                        <Image source={{ uri: user.avatar }} style={styles.image} />
                    </View>
                </View>
                <View style={styles.iconContainer}>
                    <View style={MyStyles.flex}>
                        <Text style={{ fontWeight: "bold" }}>0 </Text>
                        <TouchableWithoutFeedback>
                            <Feather style={HomeStyles.iconPost} name="heart" size={24} color="black" />
                        </TouchableWithoutFeedback>
                        <Text style={{ fontWeight: "bold" }}>0 </Text>

                        <TouchableWithoutFeedback >
                            <Feather style={HomeStyles.iconPost} name="message-circle" size={24} color="black"
                            /></TouchableWithoutFeedback>
                        <TouchableOpacity onPress={() => handleShare(post.id)}>

                            <Feather name="send" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* bình luận */}
                <View>
                    <View style={HomeStyles.userInfoContainer}>
                        <TouchableOpacity
                            style={HomeStyles.avatarContainer}                                                    >
                            <Image source={{ uri: user.avatar }} style={HomeStyles.userAvatar} />
                        </TouchableOpacity>
                        <View>
                            <Text style={HomeStyles.userName}>{user.username}</Text>
                            <Text> đẹp qáu</Text>
                        </View>

                    </View>
                    <View style={HomeStyles.userInfoContainer}>
                        <TouchableOpacity
                            style={HomeStyles.avatarContainer}                                                    >
                            <Image source={{ uri: user.avatar }} style={HomeStyles.userAvatar} />
                        </TouchableOpacity>
                        <View>
                            <Text style={HomeStyles.userName}>{user.username}</Text>
                            <Text> đẹp qáu</Text>
                        </View>

                    </View>
                    <View style={HomeStyles.userInfoContainer}>
                        <TouchableOpacity
                            style={HomeStyles.avatarContainer}                                                    >
                            <Image source={{ uri: user.avatar }} style={HomeStyles.userAvatar} />
                        </TouchableOpacity>
                        <View>
                            <Text style={HomeStyles.userName}>{user.username}</Text>
                            <Text> đẹp qáu</Text>
                        </View>

                    </View>
                </View>
            </View>
        </View >
    );
}
export default DetailPost;
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





});