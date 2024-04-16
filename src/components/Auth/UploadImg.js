import React, { useState, useEffect } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ButtonAuth from "../common/ButtonAuth";
import MyStyles from "../../Styles/MyStyles";
import { COLOR } from "../common/color";
import API, { endpoints } from "../../configs/API";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";

const UploadImg = ({ navigation, route }) => {
    const [image, setImage] = useState(null);
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
    const { user } = route.params;
    const [loading, setLoading] = useState(false);

    const [avatar, setavatar] = useState(
        require("../../assets/images/avt.gif")
    );
    const checkForCameraRollPermission = async () => {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert(
                "Please grant camera roll permissions inside your system's settings"
            );
        } else {
            console.log("Media Permissions are granted");
        }
    };

    useEffect(() => {
        checkForCameraRollPermission();
    }, []);
    const addImage = async () => {
        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(JSON.stringify(image));
        if (!image.canceled) {
            setImage(image.assets[0].uri);
            setavatar({ uri: image.assets[0].uri });
            setUploadButtonText("Change Image");
        }
    };

    // Trong handleSave
    // Trong handleSave
    const handleSave = async () => {
        if (!image) {
            Alert.alert(
                "Bạn chưa có up ảnh đại diện",
                "Hãy chọn ảnh trước khi lưu",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
            return;
        }

        const formRegister = new FormData();
        formRegister.append('first_name', user.firstName);
        formRegister.append('last_name', user.lastName);
        formRegister.append('username', user.username);
        formRegister.append('email', user.email);
        formRegister.append('password', user.password);
        formRegister.append('phone', user.phoneNumber);
        formRegister.append('gender', user.gender);

        // const fileType = imageFileName.split('.').pop();
        const uriParts = image.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const avatar = {
            uri: image,
            name: `avatar.${fileType}`,
            type: `image/${fileType}`,
        }
        console.log(avatar)
        if (image) {
            formRegister.append('avatar', avatar);
        }

        setLoading(true);
        

        try {const response = await axios.post('https://motel.pythonanywhere.com//user/', formRegister, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.info("res.data", user);
        console.log("Thành công");
        navigation.navigate("Login");
    } catch (ex) {
        Alert.alert("Lỗi", "Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
        console.error(ex.message);
        console.log(firstName, user)
        // if (error.response && error.response.data && error.response.data.username) {
        //     const errorMessage = error.response.data.username[0];
        //     Alert.alert("Lỗi", errorMessage);
        // } else {
        //     Alert.alert("Lỗi", "Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
        // }
        setLoading(false);
    }

    setLoading(false);
};


return (
    <View style={MyStyles.container}>
        <Text style={MyStyles.textHead}> Chọn ảnh đại diện</Text>
        <View style={imageUploaderStyles.container}>
            <Image source={avatar} style={{ flex: 1, aspectRatio: 1 }} />
            <View style={imageUploaderStyles.uploadBtnContainer}>
                <TouchableOpacity
                    onPress={addImage}
                    style={imageUploaderStyles.uploadBtn}
                >
                    <Text>{uploadButtonText}</Text>
                    <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
        {loading ? (<ActivityIndicator />) : (
            <ButtonAuth onPress={handleSave} title="Lưu" />)}
    </View>
);
};

const imageUploaderStyles = StyleSheet.create({
container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 20,
    marginTop: 20,
},
uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: COLOR.gray,
    width: "100%",
    height: "50%",
},
uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
},
});

export default UploadImg;