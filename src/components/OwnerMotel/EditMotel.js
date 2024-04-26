import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator, Modal, } from "react-native";
import HomeStyles from "../Home/HomeStyles";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { COLOR } from "../common/color";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import EditMotelStyle from "../../Styles/EditMotelStyle";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import Toast from "react-native-toast-message";
import InputEditMotel from "../common/InputEditMotel";
import { Button } from "react-native-paper";
import ButtonAuth from "../common/ButtonAuth";
const EditMotel = ({ navigation, route }) => {
    const defaultServices = [
        { label: "Điện", value: "Giá điện", period: "Tháng" },
        { label: "Nước", value: "Giá nước", period: "m3" },
        { label: "Internet", value: "Giá mạng", period: "Tháng" },
    ];
    const [editingService, setEditingService] = useState(null);
    const [newPrice, setNewPrice] = useState('');

    // Hàm này được gọi khi người dùng ấn vào biểu tượng chỉnh sửa
    const handleEdit = (service) => {
        setEditingService(service);
        setNewPrice(''); // Đặt giá mới về trạng thái ban đầu
    };
    const { idMotel } = route.params;
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [desc, setDesc] = useState("");
    const [maxpeople, setMaxpeople] = useState("");
    const [ward, setWard] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [other, setOther] = useState("");
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [prices, setPrices] = useState([]);
    const [render, setRender] = useState(false);

    const savePrice = () => {

    }
    const exitModal = () => {
        setEditingService("");
    }
    const canDeleteImage = (index) => {
        return images.length > 3;
    };
    const fetchApiDeleteImg = async (idImage) => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            console.log("token", token);
            //const imageId = images[index].id; // Lấy ID của ảnh từ mảng images
            console.log("ID ẢNH", idImage);
            const formData = new FormData();
            formData.append("id", idImage); // Thêm ID của ảnh vào formData
            console.log(idMotel);

            const response = await authApi(token).delete(endpoints["deleteImgMotel"](idMotel), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Xóa ảnh thành công");
            //setRender(!render);
        } catch (ex) {
            console.log("xóa ảnh thất bại");
            console.error(ex);
        }

    }
    const handleDeleteImage = (idImage) => {
        //console.log("id ảnh xóa:", index);
        if (!canDeleteImage()) {
            Alert.alert(
                "Thông báo",
                "Phải có ít nhất 3 ảnh, không thể xóa.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                "Xóa ảnh",
                "Bạn có chắc chắn muốn xóa ảnh này?",
                [
                    { text: "Hủy", onPress: () => console.log("Cancel Pressed") },
                    {
                        text: "Xóa",
                        onPress: () => fetchApiDeleteImg(idImage),
                        style: "destructive",
                    },
                ],
                { cancelable: false }
            );
        }
    };


    useEffect(() => {
        // Gọi hàm để lấy dữ liệu từ API khi component được render

        loadDetailMotel();
        console.log("USE EFFECT ĐƯỢC GỌI LẠI");
    }, [render]);

    const loadDetailMotel = async () => {
        try {
            // Gọi API để lấy dữ liệu chi tiết của nhà trọ với idMotel
            const token = await AsyncStorage.getItem("access-token");
            const res = await authApi(token).get(endpoints["detailMotel"](idMotel));

            console.log("DATA API:", res.data);
            console.log("Lấy thông tin nhà trọ thanhfc ông");
            console.log(res.data.area);
            // setLoading(true);

            setWard(res.data.ward);
            setDistrict(res.data.district);
            setCity(res.data.city);
            setOther(res.data.other_address);
            setPrice(String(res.data.price));
            setArea(String(res.data.area));
            setMaxpeople(String(res.data.max_people));
            setDesc(res.data.description);

            console.log("Mảng ảnh:", res.data.motel_images);
            console.log("Mảng prices:", res.data.prices);
            setPrices(res.data.prices);
            setImages(res.data.motel_images);
        } catch (error) {
            console.error("Error fetching motel detail:", error);
            // Xử lý lỗi nếu có
            Alert.alert(
                "Error",
                "Failed to load motel detail. Please try again later."
            );
        }
    };

    const showToast1 = () => {
        Toast.show({
            type: "success",
            text1: "Thành công",
            text2: "Cập nhật thông tin thành công.",
            visibilityTime: 3000, // Thời gian tồn tại của toast (milliseconds)
            autoHide: true, // Tự động ẩn toast sau khi hết thời gian tồn tại
        });
    };
    const showToast2 = () => {
        Toast.show({
            type: "error",
            text1: "Cảnh báo",
            text2: "Không có thông tin mới để cập nhật.",
            visibilityTime: 3000, // Thời gian tồn tại của toast (milliseconds)
            autoHide: true, // Tự động ẩn toast sau khi hết thời gian tồn tại
        });
    };
    const handleExit = () => {
        console.log("Thoát");
        console.log("dỮ LIỆU KHI THOÁT");
        // console.log(motel.images);
        console.log("id", idMotel);
        //console.log(motel.images)
        Alert.alert(
            "Thông báo",
            "Bạn có chắc chắn thoát không?",
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "Thoát", onPress: () => navigation.goBack() },
            ],
            { cancelable: false }
        );
    };
    const addPrice = async () => {
        navigation.navigate("AddPrice", { idMotel });
        setRender(!render);

        navigation.addListener('focus', async () => {
            await loadDetailMotel();
        });
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
                const newImages = selectedImages.assets.filter((asset) => asset.uri);
                // Upload new images to the server
                await uploadImages(newImages);
            }
        } catch (error) {
            console.log("Error selecting images: ", error);
        }
    };
    const uploadImages = async (newImages) => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            const formData = new FormData();
            newImages.forEach((image, index) => {
                formData.append(`images`, {
                    uri: image.uri,
                    type: 'image/jpeg',
                    name: `image_${index}.jpg`,
                });
            });
            const res = await authApi(token).post(endpoints['upImgMotel'](idMotel), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("UP ANH MOI THANH CONG :", res.data);
            console.log("Uploaded images successfully");
            setRender(!render);
        } catch (ex) {
            console.error(ex);
        }

    };

    const renderImageItem = ({ item }) => {
        if (item.url) {
            // console.log("id ảnh:", item.id);
            // Nếu có thuộc tính url, giả sử đây là ảnh từ URL
            return (
                <View style={{ position: "relative" }}>
                    <Image source={{ uri: item.url }} style={EditMotelStyle.imageMotel} />
                    <TouchableOpacity
                        onPress={() => handleDeleteImage(item.id)} // Truyền id của ảnh vào hàm handleDeleteImage
                        style={EditMotelStyle.deleteButton}
                    >
                        <AntDesign name="close" size={10} color="white" />
                    </TouchableOpacity>
                </View>
            );
        }
    };

    const handleUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            const formData = new FormData();
            formData.append("ward", ward);
            formData.append("district", district);
            formData.append("city", city);
            formData.append("other_address", other);
            formData.append("price", price);
            formData.append("area", area);
            formData.append("max_people", maxpeople);
            formData.append("description", desc);
            const response = await authApi(token).patch(endpoints["updateMotel"](idMotel), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Update thành công");
            console.log(response.data);
            // Hiển thị thông báo thành công
            showToast1();
            // Bật cờ render để render lại component
            setRender(!render);
        } catch (ex) {
            console.error(ex);
            showToast2();
        }

    }

    return (
        <View style={EditMotelStyle.container}>
            <View style={HomeStyles.tab}>
                <AntDesign
                    name="home"
                    size={24}
                    color={COLOR.PRIMARY}
                    style={HomeStyles.bellIcon}
                />
                <Text style={HomeStyles.textHead}>Thông Tin Nhà Trọ</Text>
            </View>
            <ScrollView
                contentContainerStyle={EditMotelStyle.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={EditMotelStyle.infoContainer}>
                    {/* <Text>Thông tin phòng</Text> */}

                    <Text style={EditMotelStyle.labelService}> Thông tin phòng</Text>
                    <Text style={EditMotelStyle.label}>Xã/Phường</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome5 name="location-arrow" style={EditMotelStyle.icon} size={24} color="green" />
                        <InputEditMotel value={ward} placeholder="Xã/Phường" onChangeText={(text) => setWard(text)} />
                    </View>
                    <Text style={EditMotelStyle.label}> Quận/Huyện</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome5 name="location-arrow" style={EditMotelStyle.icon} size={24} color="green" />
                        <InputEditMotel placeholder="Quận/Huyện" value={district} onChangeText={(text) => setDistrict(text)} />
                    </View>
                    <Text style={EditMotelStyle.label}>Tỉnh/Thành phố</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome5 name="location-arrow" style={EditMotelStyle.icon} size={24} color="green" />
                        <InputEditMotel value={city} placeholder="Tỉnh/Thành phố" onChangeText={(text) => setCity(text)} />
                    </View>
                    <Text style={EditMotelStyle.label}> Địa chỉ khác</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome6 name="location-dot" style={EditMotelStyle.icon} size={24} color="green"
                        />
                        <InputEditMotel onChangeText={(text) => setOther(text)} value={other} placeholder="Địa chỉ khác" />

                    </View>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome5 name="map-marked-alt" style={EditMotelStyle.icon} size={24} color="green" />
                    </View>
                    <Text style={EditMotelStyle.label}> Tiền phòng</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome
                            name="money"
                            style={EditMotelStyle.icon}
                            size={24}
                            color="green"
                        />
                        <InputEditMotel onChangeText={(text) => setPrice(text)} value={price} placeholder="Giá phòng" />

                    </View>
                    <Text style={EditMotelStyle.label}> Diện tích</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome6 name="house" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput
                            onChangeText={(text) => setArea(text)}
                            value={area}
                            style={EditMotelStyle.input}
                            placeholder="Diện tích"
                        />
                    </View>
                    <Text style={EditMotelStyle.label}> Mô tả</Text>

                    <View style={EditMotelStyle.inputContainer}>
                        <Entypo
                            name="pencil"
                            style={EditMotelStyle.icon}
                            size={24}
                            color="green"
                        />
                        <InputEditMotel onChangeText={(text) => setDesc(text)} value={desc} placeholder="Mô tả" />
                    </View>
                    <Text style={EditMotelStyle.label}> Số người</Text>

                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome5
                            name="users"
                            style={EditMotelStyle.icon}
                            size={24}
                            color="green"
                        />
                        <InputEditMotel onChangeText={(text) => setMaxpeople(text)} value={maxpeople} placeholder="Số người" />
                    </View>
                </View>

                <View style={EditMotelStyle.serviceInfo}>
                    <Text style={EditMotelStyle.labelService}>Thông tin dịch vụ</Text>
                    <TouchableOpacity onPress={addPrice}>
                        <AntDesign
                            style={{ marginLeft: "auto", paddingRight: 20 }}
                            name="pluscircleo"
                            size={24}
                            color={COLOR.PRIMARY}
                        />
                    </TouchableOpacity>
                    {/* Hiển thị popup chỉ nhập giá tiền */}
                    <Modal visible={!!editingService} transparent={true} animationType="slide">
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: "80%" }}>
                                <Text>Nhập giá tiền dịch vụ {editingService?.label}</Text>
                                <TextInput
                                    placeholder="Nhập giá mới"
                                    value={newPrice}
                                    onChangeText={setNewPrice}
                                    style={{ borderWidth: 1, borderColor: 'gray', marginTop: 10, padding: 8, borderRadius: 5 }}
                                />
                                <ButtonAuth title="Thoát" onPress={exitModal} />
                                <ButtonAuth title="Lưu dịch vụ" onPress={savePrice} />
                            </View>
                        </View>
                    </Modal>
                    <View style={EditMotelStyle.serviceRow}>
                        {/* Hiển thị các dịch vụ mặc định */}
                        {defaultServices.map((item, index) => (
                            <View key={index} style={EditMotelStyle.serviceIt}>
                                {item.period === "Tháng" && (
                                    <MaterialIcons name="event" size={24} color="green" />
                                )}
                                {item.period === "m3" && (
                                    <MaterialIcons name="local-drink" size={24} color="green" />
                                )}
                                <Text>{item.label}</Text>
                                <Text>
                                    {item.value} đ/{item.period}
                                </Text>
                                <TouchableOpacity onPress={() => handleEdit(item)}>
                                    <AntDesign style={EditMotelStyle.iconEdit} name="edit" size={24} color="black" />
                                </TouchableOpacity>

                            </View>
                        ))}
                        {/* Hiển thị các dịch vụ từ mảng prices */}
                        {prices.map((item, index) => (
                            <View key={index} style={EditMotelStyle.serviceIt}>
                                {/* Thay đổi icon tùy thuộc vào loại dịch vụ */}
                                {item.type === "electricity" && (
                                    <MaterialCommunityIcons
                                        name="power-plug"
                                        size={24}
                                        color="green"
                                    />
                                )}
                                {item.type === "water" && (
                                    <MaterialCommunityIcons
                                        name="water"
                                        size={24}
                                        color="green"
                                    />
                                )}
                                {item.type === "internet" && (
                                    <FontAwesome name="wifi" size={24} color="green" />
                                )}
                                <Text>{item.label}</Text>
                                <Text>
                                    {item.value} đ/{item.period}
                                </Text>
                                <TouchableOpacity onPress={() => handleEdit(item)}>
                                    <AntDesign style={EditMotelStyle.iconEdit} name="edit" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        ))}
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

                    <TouchableOpacity
                        style={EditMotelStyle.addButton}
                        onPress={handleAddImage}
                    >
                        <Text style={EditMotelStyle.addButtonText}>Thêm</Text>
                        <AntDesign name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={EditMotelStyle.containerBtn}>
                    <TouchableOpacity style={EditMotelStyle.button} onPress={handleExit}>
                        <Text style={EditMotelStyle.buttonText}> Thoát</Text>
                    </TouchableOpacity>
                    {loading ? (
                        <ActivityIndicator color={COLOR.PRIMARY} />
                    ) : (
                        <TouchableOpacity
                            style={[EditMotelStyle.button, EditMotelStyle.saveButton]}
                            onPress={handleUpdate}
                        >
                            <Text style={EditMotelStyle.buttonText}> Lưu thông tin</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default EditMotel;
