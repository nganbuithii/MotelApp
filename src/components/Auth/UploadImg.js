import React, { useState, useEffect } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ButtonAuth from "../common/ButtonAuth";
import MyStyles from "../../Styles/MyStyles";
import { COLOR } from "../common/color";
import defaultImage from "../../assets/images/avt.gif"; // Import ảnh mặc định
import API from "../../configs/API";

const UploadImg = () => {
    const [image, setImage] = useState(null);
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
    const [register, setRegister] = useState(null);

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
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(JSON.stringify(_image));
        if (!_image.cancelled) {
            setImage(_image.assets[0].uri);
            setUploadButtonText("Change Image");
        }
    };

    // Chưa chọn ảnh
    const handleSave =() => {
        if (!image) {
            Alert.alert(
                "Bạn chưa có up ảnh đại diện",
                "Hãy chọn ảnh trước khi lưu",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
            return;
        } 
    }
    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.textHead}> Chọn ảnh đại diện</Text>
            <View style={imageUploaderStyles.container}>
                {image ? (
                    <Image source={{ uri: image }} style={{ flex: 1, aspectRatio: 1 }} />
                ) : (
                    <Image source={defaultImage} style={{ width: 200, height: 200 }} /> // Sử dụng biến defaultImage
                )}

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
            <ButtonAuth  onPress={handleSave} title="Lưu" />
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
