import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

const UploadImgHouse = () => {
    const [images, setImages] = useState([]);

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
                setImages([...images, ...selectedImages.assets]);
            }
        } catch (error) {
            console.log("Error selecting images: ", error);
        }
    };

    const renderImageItem = ({ item }) => (
        <Image
            source={{ uri: item.uri }}
            style={styles.image}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                renderItem={renderImageItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={styles.imageContainer}
            />
            <TouchableOpacity onPress={handleAddImage} style={styles.addButton}>
                <Text style={styles.addButtonText}>Thêm ảnh</Text>
                <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const { width } = Dimensions.get("window");
const imageWidth = (width - 40) / 3; // 40 là padding của container

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    imageContainer: {
        paddingVertical: 10,
    },
    image: {
        width: imageWidth,
        height: imageWidth,
        marginHorizontal: 5,
        marginBottom: 10,
        borderRadius: 10,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        padding: 10,
        backgroundColor: "#DDDDDD",
        borderRadius: 10,
    },
    addButtonText: {
        marginRight: 10,
    },
});

export default UploadImgHouse;
