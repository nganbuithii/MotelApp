import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
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

const images = [
    { id: "1", uri: require("../../assets/images/2.png") },
    { id: "2", uri: require("../../assets/images/1.jpg") },
    { id: "3", uri: require("../../assets/images/4.jpg") },
];

const DetailOwner = ({ route }) => {
    const [showHouseList, setShowHouseList] = useState(false);
    const [content, setContent] = useState("");
    const [user, dispatch] = useContext(MyContext);
    const { ownerId } = route.params;
    // Chuyển đổi ngày tham gia sang định dạng dd/mm/yyyy

    const [owner, setOwner] = useState();
    const [loading, setLoading] = useState(true);
    const [join, setJoin] = useState();
    const [motelData, setMotelData] = useState();

    const renderHouseItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <Image source={item.uri} />
        </View>
    );

    const getDetailOwner = async () => {
        try {
            let token = await AsyncStorage.getItem("access-token");
            let res = await API.get(endpoints["detailOwner"](ownerId));
            console.log("Data owner", res.data);
            setOwner(res.data);
            setLoading(false);
            const dateJoined = dateFormat(res.data.date_joined, "dd/mm/yyyy");
            setJoin(dateJoined);
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
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {loading ? <ActivityIndicator color={COLOR.PRIMARY} /> : (
                <View style={styles.container}>
                    <Image
                        source={{ uri: owner.avatar }}
                        style={styles.bgHead}
                    />
                    <View style={styles.containerProfile}>
                        <Image
                            source={{ uri: owner.avatar }} // Thay đổi đường dẫn của ảnh mặc định
                            style={styles.avatar}
                        />
                        <Text>{ownerId}</Text>
                        <View style={{ flexDirection: "row" }}>

                            <TouchableOpacity style={styles.btnFollow1}>
                                <Text style={{ color: "#fff" }}> Theo dõi</Text>
                                <Entypo name="plus" size={10} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnFollow2}>
                                <Text style={{ color: "#fff" }}> Nhắn tin</Text>
                                <Entypo name="chat" size={10} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerInfo}>
                        <Text style={styles.txtName}>{owner.username}</Text>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoText}>Người theo dõi: {owner.follower_count}</Text>
                            <Text style={styles.separator}>|</Text>
                            <Text style={styles.infoText}>Đang theo dõi: {owner.following_count}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MaterialIcons
                                style={styles.icon}
                                name="calendar-month"
                                size={20}
                                color="black"
                            />
                            <Text style={styles.infoText}>Ngày tham gia: {join}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Thông tin nhà trọ</Text>
                        {motelData && motelData.length > 0 ? (
                            motelData.map((item, index) => (
                                <View style={styles.infoContainer} key={index}>
                                    <View style={styles.infoRow}>
                                        <Octicons style={styles.icon} name="location" size={21} color="black" />
                                        <Text style={styles.infoText}>
                                            Địa chỉ: {item.other_address}, {item.ward}, {item.district}, {item.city}
                                        </Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <MaterialIcons style={styles.icon} name="calendar-month" size={20} color="black" />
                                        <Text style={styles.infoText}>Giá cả: {item.price}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <FontAwesome6 style={styles.icon} name="house-user" size={20} color="black" />
                                        <Text style={styles.infoText}>Diện tích: {item.area}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <MaterialIcons style={styles.icon} name="attach-money" size={24} color="black" />
                                        <Text style={styles.infoText}>Giá cả: {item.price}</Text>
                                    </View>
                                    <FlatList
                                        data={item.images}
                                        renderItem={({ item }) => (
                                            <Image
                                                source={{ uri: item.url }}
                                                style={[
                                                    styles.imgMotel,
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

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
    },
    bgHead: {
        width: "100%",
        height: 120,
        opacity: 0.2,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 60,
        position: "absolute",
        top: -55,
        left: 40,
        borderWidth: 3,
        borderColor: COLOR.PRIMARY,
    },
    containerProfile: {
        position: "relative",
        height: 55,
        width: "100%",
        // backgroundColor: COLOR.color6
    },
    btnFollow1: {
        flexDirection: "row",
        backgroundColor: COLOR.PRIMARY,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        // width: 70,
        marginLeft: 100, // Dịch sang trái
        position: "absolute",
        top: 8,
        left: 55,
        marginRight: 5,
    },
    btnFollow2: {
        flexDirection: "row",
        backgroundColor: COLOR.PRIMARY,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,

        marginLeft: 100, // Dịch sang trái
        position: "absolute",
        top: 8,
        left: 160,
    },
    containerInfo: {
        width: "100%",
        paddingHorizontal: 20,
        // backgroundColor: COLOR.color6,
    },
    txtName: {
        color: COLOR.PRIMARY,
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 3,
        marginLeft: 8,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    infoText: {
        marginLeft: 10,
    },
    separator: {
        marginHorizontal: 5,
        color: "#000",
    },
    icon: {
        marginLeft: 4,
        marginRight: 10,
    },
    buttonContainer: {
        marginTop: 10,
        width: "100%",
        backgroundColor: "#fff", // Màu nền mới
        padding: 10, // Padding cho các view chứa thông tin nhà trọ
        borderRadius: 8, // Bo tròn các góc
        ...SHADOWS.medium,
    },
    buttonText: {
        color: COLOR.PRIMARY,
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 30,
        marginBottom: 10,
    },
    imgMotel: {
        width: "50%",
        height: 200,
        marginRight:5,
    },
    infoContainer: {
        marginBottom: 10,
    },
});

export default DetailOwner;
