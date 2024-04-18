import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, Alert, ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { COLOR, SHADOWS } from "../common/color";
import MyContext from '../../configs/MyContext';
import API, { authApi, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UploadImgHouse = ({navigation, route}) => {
    const { idMotel } = route.params;
    const [user, dispatch] = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [showButton, setButton] = useState(false);
    const handleAddImage = async () => {
        try {
            const selectedImages = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                multiple: true,
            });
            //console.log(JSON.stringify(selectedImages));
            if (!selectedImages.canceled) {
                setImages([...images, ...selectedImages.assets]);
                // khi có ảnh hiện nút 
                setButton(true)
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
    // Khi ấn submit
    const handleComplete = async() => {
        try{
            const formData = new FormData();
            images.forEach((image, index) => {
                // console.log(`image_${index}:`, image);
                formData.append(`images`, {
                    uri: image.uri,
                    type: 'image/jpeg',
                    name: `image_${index}.jpg`,
                });
            });
            if (images.length < 3) {
                Alert.alert("Lỗi", "Vui lòng chọn ít nhất 3 ảnh trước khi hoàn tất");
                return;
            }
            // console.log("images", images)
            let token = await AsyncStorage.getItem("access-token");
            // console.log(idMotel);
            // console.log(formData);

        
            let res = await authApi(token).post(endpoints['upImgMotel'](idMotel), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log("RESDATA IMG:", res.data);
            console.log("Up ảnh thành công");
            navigation.navigate("Home");
            
            
        }catch(ex)
        {
            Alert.alert("Lỗi","Tải ảnh nhà trọ của bạn thất bại")
            console.error(ex);
        }finally {
            setLoading(false);
        }
    };
    const handleExit = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn thoát? Mọi thao tác sẽ xóa hết.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                { text: "OK", onPress: () => navigation.navigate("Login") },
            ]
        );
    };

    return (
        <View style={styles.containerImg}>
            <ImageBackground
                source={require("../../assets/images/3.png")}
                style={styles.imageBackground}
            ></ImageBackground>
            <Image
                source={require("../../assets/images/hi.gif")}
                style={styles.imageHead}
            />
            <TouchableOpacity onPress={handleAddImage} style={styles.addButton}>
                <Text style={styles.addButtonText}>Thêm ảnh</Text>
                <AntDesign name="camera" size={20} color="#fff" />
            </TouchableOpacity>
            {images.length === 0 && (
                <Text style={styles.Text}>Chọn hình ảnh về nhà trọ của bạn nhé</Text>
            )}
            <FlatList
                data={images}
                renderItem={renderImageItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={styles.imageContainer}
            />

            {showButton && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleExit} style={styles.ExitButton}>
                        <Text style={{ color: "#fff", textAlign: "center" }}>Thoát</Text>
                    </TouchableOpacity>
                    {loading ? (<ActivityIndicator />) : (
                    <TouchableOpacity onPress={handleComplete} style={styles.completeButton}>
                        <Text style={{ color: "#fff", textAlign: "center" }}>Hoàn tất</Text>
                    </TouchableOpacity>)}
                </View>


            )}

        </View>
    );
};

const { width } = Dimensions.get("window");
const imageWidth = (width - 40) / 3; // 40 là padding của container

const styles = StyleSheet.create({
    containerImg: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#fff"
    },
    imageContainer: {
        paddingVertical: 10,
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        // width:"100%",
        // height:"100%",
        position:"absolute",
        top:0,
        left:0,
        right:0,
        bottom:0,
        opacity:0.4,
        backgroundColor:COLOR.PRIMARY
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
        marginTop: 30,
        marginBottom: 20,
        padding: 10,
        backgroundColor: COLOR.PRIMARY,
        borderRadius: 10,
        ...SHADOWS.medium

    },
    addButtonText: {
        marginRight: 10,
        color: "#fff"
    },
    Text: {
        fontSize: 20,
        fontWeight: "300",
        textAlign: "center"
    },
    imageHead: {
        marginTop: 30,
        width: 150,
        height: 150
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 20,
    },
    completeButton: {
        backgroundColor: COLOR.PRIMARY,
        padding: 15,
        borderRadius: 10,
        width: "30%",
        ...SHADOWS.medium
    },
    ExitButton: {
        backgroundColor: "tomato",
        padding: 15,
        borderRadius: 10,
        width: "30%",
        ...SHADOWS.medium
    }
});

export default UploadImgHouse;
