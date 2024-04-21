import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from "react-native"
import HomeStyles from "../Home/HomeStyles";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { COLOR } from "../common/color";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import EditMotelStyle from '../../Styles/EditMotelStyle'
import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import MyContext from "../../configs/MyContext";
const EditMotel = ({ navigation, route }) => {
    const { motel } = route.params;
    const [price, setPrice] = useState(motel.price.toString() || "");
    const [area, setArea] = useState(motel.area.toString() || "");
    const [desc, setDesc] = useState(motel.description || "");
    const [maxpeople, setMaxpeople] = useState(motel.max_people.toString() || "");
    const [ward, setWard] = useState(motel.ward || "");
    const [district, setDistrict] = useState(motel.district || "");
    const [city, setCity] = useState(motel.city || "");
    const [other, setOther] = useState(motel.other_address || "");
    const [images, setImages] = useState(motel.images || []);
    const [loading, setLoading] = useState(false);
    const [user, dispatch] = useContext(MyContext);
    const [updatedMotel, setUpdatedMotel] = useState(route.params.motel);
    const [motelData, setMotelData] = useState(route.params.motel);
    const handleDeleteImage = (index) => {
        Alert.alert(
            "Xóa ảnh",
            "Bạn có chắc chắn muốn xóa ảnh này?",
            [
                { text: "Hủy", onPress: () => console.log("Cancel Pressed") },
                {
                    text: "Xóa",
                    onPress: () => deleteImage(index),
                    style: "destructive"
                }
            ],
            { cancelable: false }
        );
    };

    const deleteImage = (index) => {
        const updatedImages = [...images]; // Tạo một bản sao của mảng images
        updatedImages.splice(index, 1); // Xóa ảnh khỏi bản sao
        setImages(updatedImages); // Cập nhật state images với bản sao đã xóa ảnh
        console.log(updatedImages);
    };


    const handleAddImage = async () => {
        try {
            const selectedImages = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                multiple: true,
            });
            console.log(JSON.stringify(selectedImages));
            if (!selectedImages.canceled) {
                const newImages = selectedImages.assets.filter(asset => asset.uri);
                // Thêm uri của từng asset mới vào mảng images
                const imagesWithUri = newImages.map(asset => ({ uri: asset.uri }));
                setImages([...images, ...imagesWithUri]);
            }
        } catch (error) {
            console.log("Error selecting images: ", error);
        }
    };
    const handleSaveInfo = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            const idMotel = updatedMotel.id; // Sử dụng updatedMotel thay vì motel

            console.log(idMotel);
            console.log(token);
            Alert.alert(
                'Xác nhận ',
                'Bạn muốn cập nhật thông tin?',
                [
                    {
                        text: 'Hủy',
                        onPress: () => console.log('Hủy update'), // Xử lý khi người dùng nhấn Hủy
                        style: 'cancel',
                    },
                    {
                        text: 'Cập nhật',
                        onPress: async () => {
                            const formData = new FormData();
                            console.log("Giá trị other_address được gửi đi:", other);

                            if (price !== motel.price) formData.append("price", price);
                            if (area !== motel.area) formData.append("area", area);
                            if (desc !== motel.description) formData.append("description", desc);
                            // if (maxpeople !== motel.max_people) formData.append("max_people", maxpeople);
                            if (ward !== motel.ward) formData.append("ward", ward);
                            if (district !== motel.district) formData.append("district", district);
                            if (city !== motel.city) formData.append("city", city);
                            if (other !== motel.onther) formData.append("other_address", other)

                            const res = await authApi(token).patch(endpoints['updateMotel'](idMotel), formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            });
                            console.log("Data returned from API:", res.data);
                            // Cập nhật state updatedMotel với dữ liệu mới từ res.data
                            // Cập nhật state updatedMotel với dữ liệu mới từ res.data
                            setUpdatedMotel(res.data);
                            console.log("Cập nhật thành công");
                            // Cập nhật các state với dữ liệu mới từ res.data
                            setPrice(res.data.price.toString());
                            setArea(res.data.area.toString());
                            setDesc(res.data.description);
                            // //setMaxpeople(res.data.max_people.toString());
                            setWard(res.data.ward);
                            setDistrict(res.data.district);
                            setCity(res.data.city);
                            setOther(res.data.other_address);
                            // Cập nhật route.params.motel
                            navigation.setParams({
                                motel: res.data,
                            });
                            const updatedMotel = { /* Thông tin nhà trọ sau khi cập nhật */ };
                            dispatch({ type: 'update_motel', payload: updatedMotel });

                            //showToast();
                        },
                    },
                ],
                { cancelable: true }
            );
        } catch (ex) {
            console.error(ex);
            setLoading(false);
        }
    }
    useEffect(() => {
        console.log("Gia trị gửi đến effect:", updatedMotel);
    }, [updatedMotel]);
    



    // useEffect(() => {
    //     if (!loading) {
    //         // Cập nhật lại các state của các ô input
    //         setPrice(motel.price.toString());
    //         setArea(motel.area.toString());
    //         setDesc(motel.description);
    //         setMaxpeople(motel.max_people.toString());
    //         setWard(motel.ward);
    //         setDistrict(motel.district);
    //         setCity(motel.city);
    //         setOther(motel.other_address);
    //     }
    // }, [loading]);
    const handleExit = () => {
        
        console.log("Thoát");console.log("dỮ LIỆU KHI THOÁT",motel);
        //console.log(motel.images)
        Alert.alert("Thông báo", "Bạn có chắc chắn thoát không?",
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Thoát", onPress: () => navigation.goBack() }
            ],
            { cancelable: false })
    }
    const renderImageItem = ({ item, index }) => {
        if (item.url) {
            // Nếu có thuộc tính url, giả sử đây là ảnh từ URL
            return (
                <View style={{ position: "relative" }}>
                    <Image source={{ uri: item.url }} style={EditMotelStyle.imageMotel} />
                    <TouchableOpacity onPress={() => handleDeleteImage(index)} style={EditMotelStyle.deleteButton}>
                        <AntDesign name="close" size={10} color="white" />
                    </TouchableOpacity>
                </View>
            );
        } else if (item.uri) {
            // Nếu có thuộc tính uri, giả sử đây là ảnh từ thiết bị
            return (
                <View style={{ position: "relative" }}>
                    <Image source={{ uri: item.uri }} style={EditMotelStyle.imageMotel} />
                    <TouchableOpacity onPress={() => handleDeleteImage(index)} style={EditMotelStyle.deleteButton}>
                        <AntDesign name="close" size={10} color="white" />
                    </TouchableOpacity>
                </View>
            );
        } else {
            // Nếu không có cả thuộc tính url và uri, không render gì cả
            return null;
        }
    };


    return (
        <View style={EditMotelStyle.container}>
            <View style={HomeStyles.tab}>
                <AntDesign name="home" size={24} color={COLOR.PRIMARY} style={HomeStyles.bellIcon} />
                <Text style={HomeStyles.textHead}>Thông Tin Nhà Trọ</Text>
            </View>
            <ScrollView contentContainerStyle={EditMotelStyle.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={EditMotelStyle.infoContainer}>
                    {/* <Text>Thông tin phòng</Text> */}


                    <Text style={EditMotelStyle.labelService}> Thông tin phòng</Text>
                    <Text style={EditMotelStyle.label}>Xã/Phường</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome5 name="location-arrow" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput onChangeText={text => setWard(text)} value={ward} style={EditMotelStyle.input} placeholder="Xã/Phường" />
                    </View>
                    <Text style={EditMotelStyle.label}> Quận/Huyện</Text>
                    <View style={EditMotelStyle.inputContainer}>

                        <FontAwesome5 name="location-arrow" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput onChangeText={text => setDistrict(text)} value={district} style={EditMotelStyle.input} placeholder="Quận/Huyện" />
                    </View>
                    <Text style={EditMotelStyle.label}>Tỉnh/Thành phố</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome5 name="location-arrow" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput onChangeText={text => setCity(text)} value={city} style={EditMotelStyle.input} placeholder="Tỉnh/Thành phố" />
                    </View>
                    <Text style={EditMotelStyle.label}> Địa chỉ khác</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome6 name="location-dot" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput onChangeText={text => setOther(text)} value={other} style={EditMotelStyle.input} placeholder="Địa chỉ khác" />
                    </View>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome5 name="map-marked-alt" style={EditMotelStyle.icon} size={24} color="green" />

                    </View>
                    <Text style={EditMotelStyle.label}> Tiền phòng</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome name="money" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput onChangeText={text => setPrice(text)} value={price} style={EditMotelStyle.input} placeholder="Giá phòng" />
                    </View>
                    <Text style={EditMotelStyle.label}> Diện tích</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome6 name="house" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput onChangeText={text => setArea(text)} value={area} style={EditMotelStyle.input} placeholder="Diện tích" />
                    </View>
                    <Text style={EditMotelStyle.label}> Mô tả</Text>

                    <View style={EditMotelStyle.inputContainer}>
                        <Entypo name="pencil" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput onChangeText={text => setDesc(text)} value={desc} style={EditMotelStyle.input} placeholder="Mô tả" />
                    </View>
                    <Text style={EditMotelStyle.label}> Số người</Text>

                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome5 name="users" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput onChangeText={text => setMaxpeople(text)} value={maxpeople} style={EditMotelStyle.input} placeholder="Số người" />
                    </View>
                </View>

                <View style={EditMotelStyle.serviceInfo}>
                    <Text style={EditMotelStyle.labelService}> Thông tin dịch vụ</Text>
                    <AntDesign style={{ marginLeft: "auto", paddingRight: 20, }} name="pluscircleo" size={24} color={COLOR.PRIMARY} />

                    <View style={EditMotelStyle.serviceRow} >
                        <View style={EditMotelStyle.serviceIt}>
                            <MaterialIcons name="electric-bolt" size={24} color="green" />
                            <Text>Điện</Text>
                            <Text>3.000 đ/Kwh</Text>
                            <AntDesign style={EditMotelStyle.iconEdit} name="edit" size={24} color="black" />
                        </View>
                        <View style={EditMotelStyle.serviceIt}>
                            <MaterialIcons name="electric-bolt" size={24} color="green" />
                            <Text>Mạng</Text>
                            <Text>100.000 đ/ Phòng</Text>
                            <AntDesign style={EditMotelStyle.iconEdit} name="edit" size={24} color="black" />
                        </View>
                        <View style={EditMotelStyle.serviceIt}>
                            <MaterialIcons name="electric-bolt" size={24} color="green" />
                            <Text>Nước</Text>
                            <Text>20.000 đ/m3</Text>
                            <AntDesign style={EditMotelStyle.iconEdit} name="edit" size={24} color="black" />
                        </View>
                    </View>
                </View>
                <View style={EditMotelStyle.serviceInfo}>
                    <Text style={EditMotelStyle.labelService}> Ảnh phòng</Text>
                    <FlatList
                        data={images}
                        renderItem={renderImageItem}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    {/* <Image
                        source={require("../../assets/images/hi.gif")}
                        style={EditMotelStyle.imageMotel}
                    /> */}
                    <TouchableOpacity onPress={handleAddImage} style={EditMotelStyle.addButton}>
                        <Text style={EditMotelStyle.addButtonText}>Thêm</Text>
                        <AntDesign name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={EditMotelStyle.containerBtn}>
                    <TouchableOpacity style={EditMotelStyle.button} onPress={handleExit}>
                        <Text style={EditMotelStyle.buttonText}> Thoát</Text>
                    </TouchableOpacity>
                    {loading ? (<ActivityIndicator color={COLOR.PRIMARY} />) : (
                        <TouchableOpacity onPress={handleSaveInfo} style={[EditMotelStyle.button, EditMotelStyle.saveButton]}>
                            <Text style={EditMotelStyle.buttonText}> Lưu thông tin</Text>
                        </TouchableOpacity>)}
                </View>
            </ScrollView>
        </View>
    )
}


export default EditMotel;