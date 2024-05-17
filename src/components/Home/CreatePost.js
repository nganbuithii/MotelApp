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
import PostCreateStyle from "../../Styles/PostCreateStyle";

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
            // Lọc ra các bài đăng có cờ approved là true
        const approvedMotels = motelData.filter(motel => motel.approved === true);
        
        setMotels(approvedMotels);
        console.log("Get data nhà trọ của user:", approvedMotels);
        return approvedMotels;
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
                navigation.goBack();

            }
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <ScrollView style={PostCreateStyle.scrollView}>
            <View style={PostCreateStyle.container}>
                <View style={PostCreateStyle.userInfo}>
                    <Image
                        source={{ uri: user.avatar }} // Thay đổi đường dẫn của ảnh mặc định
                        style={PostCreateStyle.avatar} />
                    <Text style={PostCreateStyle.username}>{user.username}</Text>
                </View>
                <View style={PostCreateStyle.containerBody}>

                    <Text style={PostCreateStyle.sectionTitle}>Mô tả</Text>
                    {!!contentError && <Text style={PostCreateStyle.errorText}><Ionicons name="warning" size={12} color="red" />{contentError}</Text>}

                    <View style={PostCreateStyle.inputContainer}>
                        <TextInput placeholder="Hãy mô tả bài đăng nhà trọ của bạn?" style={PostCreateStyle.input} multiline={true} value={content} onChangeText={(text) => setContent(text)}
                            onFocus={() => setContentError("")} />
                    </View>
                    {!!houseError && <Text style={PostCreateStyle.errorText}><Ionicons name="warning" size={12} color="red" />{houseError}</Text>}

                    <TouchableOpacity style={PostCreateStyle.imagePicker} onPress={() => {
                        getMotel();
                        setHouseError(""); // Ẩn thông báo lỗi cho nhà trọ khi người dùng chọn
                    }} >
                        <MaterialCommunityIcons name="home-circle" size={24} color="black" style={PostCreateStyle.inputIcon} />
                        <Text style={PostCreateStyle.imagePickerText}>Nhà trọ</Text>
                    </TouchableOpacity>

                    {selectedHouse && (
                        <View style={PostCreateStyle.houseDetailContainer}>
                            <Text style={PostCreateStyle.houseTitle}>{selectedHouse.title}</Text>
                            <TouchableOpacity style={PostCreateStyle.houseItem} >
                                <Image source={{ uri: selectedHouse.images[0].url }} style={PostCreateStyle.thumbnail} />
                                <View style={PostCreateStyle.houseInfo}>
                                    <Text style={PostCreateStyle.ItemTitle}>Nhà trọ đã chọn <FontAwesome name="check-circle" size={20} color="green" /></Text>
                                    <Text style={PostCreateStyle.houseAddress}>Địa chỉ: {selectedHouse.ward}, {selectedHouse.district},{selectedHouse.city}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}

                    {showHouseList && (
                        <View style={PostCreateStyle.houseListContainer}>
                            {motels.map((house, index) => (
                                <TouchableOpacity key={house.id} style={PostCreateStyle.houseItem} onPress={() => selectHouse(house)}>
                                    <Image source={{ uri: house.images[0].url }} style={PostCreateStyle.thumbnail} />
                                    <View style={PostCreateStyle.houseInfo}>
                                        <Text style={PostCreateStyle.ItemTitle}>{`Nhà trọ ${index + 1}`}</Text>
                                        <Text style={PostCreateStyle.itemAddress}>Địa chỉ: {house.ward}, {house.district}, {house.city}</Text>
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


export default CreatePost;
