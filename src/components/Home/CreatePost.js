import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import ButtonAuth from "../common/ButtonAuth";
import { Entypo } from '@expo/vector-icons';
import { COLOR, SHADOWS } from "../common/color";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { SimpleLineIcons } from '@expo/vector-icons';


const CreatePost = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const dummyImages = [
        require("../../assets/images/2.png"),
        require("../../assets/images/3.png"),
        require("../../assets/images/2.png"),
        require("../../assets/images/3.png"),
    ];

    const handleAddImage = async () => {
        try {
            const selectedImages = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                multiple: true,
            });
            if (!selectedImages.cancelled) {
                setSelectedImages([...selectedImages, ...selectedImages.assets]);
            }
        } catch (error) {
            console.log("Error selecting images: ", error);
        }
    };

    const removeImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.imageContainer}>
            <Image source={item} style={styles.image} />
            <TouchableOpacity onPress={() => removeImage(index)} style={styles.deleteButton}>
                <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image source={require('../../assets/images/avt.png')} style={styles.avatar} />
                <Text style={styles.username}>Ngan Bt</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput placeholder="Bạn đang nghĩ gì?" style={styles.input} multiline={true} />
            </View>

            <FlatList
                horizontal
                data={dummyImages}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.imageList}
            />

            <TouchableOpacity style={styles.imagePicker} onPress={handleAddImage}>
                <Entypo name="images" size={24} color="black" style={styles.inputIcon} />
                <Text style={styles.imagePickerText}>Thêm ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imagePicker} >
                <SimpleLineIcons name="location-pin" size={24} color="black" style={styles.inputIcon} />
                <Text style={styles.imagePickerText}>Vị trí</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imagePicker} >
                <MaterialCommunityIcons name="home-circle" size={24} color="black" style={styles.inputIcon} />
                <Text style={styles.imagePickerText}>Nhà trọ</Text>
            </TouchableOpacity>
        

            <ButtonAuth title="Đăng bài" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    inputContainer: {
        borderWidth: 0, // Tắt viền của input
        marginBottom: 10,
    },
    input: {
        padding: 10,
        fontSize: 18,
        minHeight: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.05)', // Màu nền của input
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
        marginHorizontal:10,
        ...SHADOWS.small
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
    imageContainer: {
        position: 'relative',
        marginRight: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 12,
        padding: 5,
    },
    image: {
        width: 340,
        height: 340,
        borderRadius: 10,
        marginLeft: 13
    },
    imageList: {
        marginBottom: 10,
    },
});

export default CreatePost;
