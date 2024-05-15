import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import ButtonAuth from "../common/ButtonAuth";
import { COLOR, SHADOWS } from "../common/color";
import MyContext from "../../configs/MyContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import { Ionicons } from '@expo/vector-icons';

const CreatePost = ({ navigation }) => {
    const [motels, setMotels] = useState([]);
    const [user, dispatch] = useContext(MyContext);

    const [selectedHouse, setSelectedHouse] = useState(null);
    const [showHouseList, setShowHouseList] = useState(true);
    const [content, setContent] = useState("");
    const [contentError, setContentError] = useState("");
    const [houseError, setHouseError] = useState("");


    const getMotel = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            let response = await authApi(token).get(endpoints['detailMotelOwner'](user.id));
            let motelData = response.data;
            setMotels(response.data);
            console.log("Get data nhà trọ của user:", response.data);
            return motelData;
        } catch (ex) {
            console.error(ex);
        }
    }

    const selectHouse = (house) => {
        setSelectedHouse(house);
        setShowHouseList(false);
    };

    const handleSubmit = async () => {
        try {
            if (!content) { setContentError("Vui lòng nhập mô tả"); }
            else { setContentError(""); }
            if (!selectedHouse) { setHouseError("Vui lòng chọn nhà trọ"); }
            else { setHouseError(""); }
            // Kiểm tra xem tất cả các trường đều đã hợp lệ
            if (content && selectedHouse) {
                const token = await AsyncStorage.getItem("access-token");
                const formData = new FormData();
                // formData.append("title", title);
                formData.append("content", content);
                formData.append("motel", selectedHouse.id);
                console.log("ID", selectedHouse.id);
                console.log("form", formData);
                console.log(token);
                let res = await authApi(token).post(endpoints['createPost'], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log("Đăng bài thành công");
                console.log("res daata post:", res.data);
                navigation.navigate("HomeIndex", { myPost: res.data })

            }
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: user.avatar }} // Thay đổi đường dẫn của ảnh mặc định
                        style={styles.avatar} />
                    <Text style={styles.username}>{user.username}</Text>
                </View>
                <View style={styles.containerBody}>

                    <Text style={styles.sectionTitle}>Mô tả</Text>
                    {!!contentError && <Text style={styles.errorText}><Ionicons name="warning" size={12} color="red" />{contentError}</Text>}

                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Hãy mô tả bài đăng nhà trọ của bạn?" style={styles.input} multiline={true} value={content} onChangeText={(text) => setContent(text)}
                            onFocus={() => setContentError("")} />
                    </View>
                    {!!houseError && <Text style={styles.errorText}><Ionicons name="warning" size={12} color="red" />{houseError}</Text>}

                    <TouchableOpacity style={styles.imagePicker} onPress={() => {
                        getMotel();
                        setHouseError(""); // Ẩn thông báo lỗi cho nhà trọ khi người dùng chọn
                    }} >
                        <MaterialCommunityIcons name="home-circle" size={24} color="black" style={styles.inputIcon} />
                        <Text style={styles.imagePickerText}>Nhà trọ</Text>
                    </TouchableOpacity>

                    {selectedHouse && (
                        <View style={styles.houseDetailContainer}>
                            <Text style={styles.houseTitle}>{selectedHouse.title}</Text>
                            <TouchableOpacity style={styles.houseItem} >
                                <Image source={{ uri: selectedHouse.images[0].url }} style={styles.thumbnail} />
                                <View style={styles.houseInfo}>
                                    <Text style={styles.ItemTitle}>Nhà trọ đã chọn <FontAwesome name="check-circle" size={20} color="green" /></Text>
                                    <Text style={styles.houseAddress}>Địa chỉ: {selectedHouse.ward}, {selectedHouse.district},{selectedHouse.city}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}

                    {showHouseList && (
                        <View style={styles.houseListContainer}>
                            {motels.map((house, index) => (
                                <TouchableOpacity key={house.id} style={styles.houseItem} onPress={() => selectHouse(house)}>
                                    <Image source={{ uri: house.images[0].url }} style={styles.thumbnail} />
                                    <View style={styles.houseInfo}>
                                        <Text style={styles.ItemTitle}>{`Nhà trọ ${index + 1}`}</Text>
                                        <Text style={styles.itemAddress}>Địa chỉ: {house.ward}, {house.district}, {house.city}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <ButtonAuth title="Đăng bài" onPress={handleSubmit} />
                </View></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: COLOR.bg_color1,
    },
    container: {
        flex: 1,
        padding: 10,

        alignItems: 'center',

    },
    containerBody: {
        backgroundColor: COLOR.offWhite,
        // padding:10,
        borderRadius: 15,
        marginTop: 20,
        width: "100%",
        paddingBottom: 20,
        alignContent: "center",
        alignItems: "center",
        ...SHADOWS.medium
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 'auto'
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 40,
        marginRight: 10,
        borderWidth: 2,
        borderColor: COLOR.PRIMARY
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    inputContainer: {
        borderWidth: 0,
        marginBottom: 10,
        width: "100%",
    },
    input: {
        padding: 10,
        fontSize: 18,
        minHeight: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 10,
        marginHorizontal: 12
    },
    input1: {
        padding: 10,
        fontSize: 18,
        minHeight: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 10,
        marginHorizontal: 12
    },
    imagePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        marginBottom: 8,
        marginHorizontal: 10,
        ...SHADOWS.small,
        width: "94%"
    },
    imagePickerText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    inputIcon: {
        marginRight: 10,
        color: COLOR.PRIMARY
    },
    houseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.bg_color1,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        ...SHADOWS.small,
        width: "94%",
        alignContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10,
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    houseInfo: {
        flex: 1,
    },
    ItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemAddress: {
        fontSize: 16,
        color: '#333333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        alignSelf: 'flex-start',
        marginLeft: 12,
        marginTop: 15
    },
    errorText: {
        color: "red",
        fontWeight: "500",
        textAlign: "right"
    }
});

export default CreatePost;
