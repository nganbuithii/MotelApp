import React, { useContext, useEffect, useState } from "react";
import {
    View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView,
} from "react-native";
import { COLOR, SHADOWS } from "../common/color";
import { Entypo } from "@expo/vector-icons";
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


const DetailOwner = ({ route }) => {
    // const [showHouseList, setShowHouseList] = useState(false);
    // const [content, setContent] = useState("");
    const [user, dispatch] = useContext(MyContext);
    const { ownerId } = route.params;
    // Chuyển đổi ngày tham gia sang định dạng dd/mm/yyyy

    const [owner, setOwner] = useState();
    const [loading, setLoading] = useState(true);
    const [join, setJoin] = useState();
    const [motelData, setMotelData] = useState();
    const [ownerFollowed, setOwnerFollowed] = useState(false);
    const [render, setRender] = useState();
    const [isFollowing, setIsFollowing] = useState(false);// CHƯA ai follow
    const [follow, setFollow] = useState(false); // chưa follow

    // const renderHouseItem = ({ item }) => (
    //     <View style={styles.imageContainer}>
    //         <Image source={item.uri} />
    //     </View>
    // );

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

        } catch (ex) {
            console.error(ex);
        }
    }
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
        } catch (ex) {
            console.error(ex);
        }
    }
    return (
        <ScrollView contentContainerStyle={DetailOwnerStyle.scrollViewContent}>
            {loading ? <ActivityIndicator color={COLOR.PRIMARY} /> : (
                <View style={DetailOwnerStyle.container}>
                    <Image
                        source={{ uri: owner.avatar }}
                        style={DetailOwnerStyle.bgHead}
                    />
                    <View style={DetailOwnerStyle.containerProfile}>
                        <Image
                            source={{ uri: owner.avatar }} // Thay đổi đường dẫn của ảnh mặc định
                            style={DetailOwnerStyle.avatar}
                        />
                        <Text>{ownerId}</Text>
                        <View style={{ flexDirection: "row" }}>

                            <TouchableOpacity
                                style={[DetailOwnerStyle.btnFollow1, ownerFollowed ? DetailOwnerStyle.followingButton : DetailOwnerStyle.followButton]}
                                onPress={handleFollow}>
                                {follow ? <Text style={{ color: "#fff" }}>Đang theo dõi</Text> :
                                    <Text style={{ color: "#fff" }}>Theo dõi</Text>
                                }
                                {/* <Text style={{ color: "#fff" }}>{ownerFollowed ? "Đang theo dõi" : "Theo dõi"}</Text> */}
                                <Entypo name={ownerFollowed ? "minus" : "plus"} size={10} color="#fff" />
                            </TouchableOpacity>





                            <TouchableOpacity style={DetailOwnerStyle.btnFollow2}>
                                <Text style={{ color: "#fff" }}> Nhắn tin</Text>
                                <Entypo name="chat" size={10} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={DetailOwnerStyle.containerInfo}>
                        <Text style={DetailOwnerStyle.txtName}>{owner.username}</Text>

                        <View style={DetailOwnerStyle.infoRow}>
                            <Text style={DetailOwnerStyle.infoText}>Người theo dõi: {owner.follower_count}</Text>
                            <Text style={DetailOwnerStyle.separator}>|</Text>
                            <Text style={DetailOwnerStyle.infoText}>Đang theo dõi: {owner.following_count}</Text>
                        </View>
                        <View style={DetailOwnerStyle.infoRow}>
                            <MaterialIcons
                                style={DetailOwnerStyle.icon}
                                name="calendar-month"
                                size={20}
                                color="black"
                            />
                            <Text style={DetailOwnerStyle.infoText}>Ngày tham gia: {join}</Text>
                        </View>
                    </View>

                    <View style={DetailOwnerStyle.buttonContainer}>
                        <Text style={DetailOwnerStyle.buttonText}>Thông tin nhà trọ</Text>
                        {motelData && motelData.length > 0 ? (
                            motelData.map((item, index) => (
                                <View style={DetailOwnerStyle.infoContainer} key={index}>
                                    <View style={DetailOwnerStyle.infoRow}>
                                        <Octicons style={DetailOwnerStyle.icon} name="location" size={21} color="black" />
                                        <Text style={DetailOwnerStyle.infoText}>
                                            Địa chỉ: {item.other_address}, {item.ward}, {item.district}, {item.city}
                                        </Text>
                                    </View>

                                    <View style={DetailOwnerStyle.infoRow}>
                                        <FontAwesome6 style={DetailOwnerStyle.icon} name="house-user" size={20} color="black" />
                                        <Text style={DetailOwnerStyle.infoText}>Diện tích: {item.area}</Text>
                                    </View>
                                    <View style={DetailOwnerStyle.infoRow}>
                                        <MaterialIcons style={DetailOwnerStyle.icon} name="attach-money" size={24} color="black" />
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
                            ))) : (<Text>Không có dữ liệu nhà trọ.</Text>
                        )}
                    </View>



                </View>)}
        </ScrollView>
    );
};

// const styles = StyleSheet.create({


// });

export default DetailOwner;
