import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator, Modal, } from "react-native";
import HomeStyles from "../../Styles/HomeStyles";
import { Entypo, Foundation, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLOR, SHADOWS } from "../common/color";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EditMotelStyle from "../../Styles/EditMotelStyle";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import showToast from "../common/ToastMessage";
import RNPickerSelect from "react-native-picker-select";
import PostStyle from "../Tenant/PostStyle";
import axios from 'axios';
import SearchStyle from "../../Styles/SearchStyle";

const EditMotel = ({ navigation, route }) => {


    const { idMotel } = route.params;
    const [price, setPrice] = useState("");
    const [area, setArea] = useState("");
    const [desc, setDesc] = useState("");
    const [maxpeople, setMaxpeople] = useState("");
    const [ward, setWard] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [other, setOther] = useState("");
    // const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [prices, setPrices] = useState([]);
    const [render, setRender] = useState(false);
    const [cities, setCities] = useState([]); // State để lưu trữ danh sách các tỉnh/thành phố
    const [districts, setDistricts] = useState([]); // State để lưu trữ danh sách các quận/huyện
    const [wards, setWards] = useState([]);
    let lon = route.params?.lon;
    let lat = route.params?.lat;
    let nameLoc = route.params?.nameLoc;
    useEffect(() => {
        console.log("Route params:", route.params);
        console.log("Lon", lon);
        console.log("lat", lat);
        if (route.params?.nameLoc) {
            console.log("Here", route.params.nameLoc);
            setOther(route.params.nameLoc);
        }
    }, [route.params?.nameLoc]);
    const [loading, setLoading] = useState(true);
    const [initialState, setInitialState] = useState({
        ward: "",
        district: "",
        city: "",
        other: "",
        price: "",
        area: "",
        maxpeople: "",
        desc: ""
    });

    // Hàm để lấy danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
    const fetchDistricts = async (cityId) => {
        try {
            const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${cityId}.htm`);
            if (response.data.error === 0) {
                setDistricts(response.data.data); // Cập nhật state với danh sách quận/huyện
            }
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    // Hàm để lấy danh sách xã/phường dựa trên quận/huyện được chọn
    const fetchWards = async (districtId) => {
        try {
            const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
            if (response.data.error === 0) {
                setWards(response.data.data); // Cập nhật state với danh sách xã/phường
            }
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };
    // Hàm xử lý khi tỉnh/thành phố được chọn
    const handleCityChange = (cityId) => {
        fetchDistricts(cityId); // Gọi hàm để lấy danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
    };

    // Hàm xử lý khi quận/huyện được chọn
    const handleDistrictChange = (districtId) => {
        fetchWards(districtId); // Gọi hàm để lấy danh sách xã/phường dựa trên quận/huyện được chọn
    };

    // Lấy danh sách tỉnh/thành phố khi component được render
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                if (response.data.error === 0) {
                    setCities(response.data.data); // Cập nhật state với danh sách tỉnh/thành phố
                }
                // console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchCities();
    }, []);
    // Tạo bảng dữ liệu ánh xạ ID và tên của tỉnh/thành phố, quận/huyện
    const cityMapping = {};
    cities.forEach(city => {
        cityMapping[city.id] = city.full_name;
    });
    const cityIdMapping = {};
    cities.forEach(city => {
        cityIdMapping[city.full_name] = city.id;
    });
    const districtIdMapping = {};
    districts.forEach(district => {
        districtIdMapping[district.full_name] = district.id;
    });
    const wardIdMapping = {};
    wards.forEach(ward => {
        wardIdMapping[ward.full_name] = ward.id;
    });

    const districtMapping = {};
    districts.forEach(district => {
        districtMapping[district.id] = district.full_name;
    });

    // Hàm để chuyển đổi ID thành tên tỉnh/thành phố, quận/huyện
    const getCityNameById = (cityId) => {
        return cityMapping[cityId] || '';
    };

    const getDistrictNameById = (districtId) => {
        return districtMapping[districtId] || '';
    };
    // Tạo bảng dữ liệu ánh xạ ID và tên của xã/phường
    const wardMapping = {};
    wards.forEach(ward => {
        wardMapping[ward.id] = ward.full_name;
    });

    const getWardIdByName = (wardName) => {
        const foundWard = wards.find(ward => ward.full_name === wardName);
        return foundWard ? foundWard.id : null;
    };
    const getCityIdByName = (cityName) => {
        const foundCity = cities.find(city => city.full_name === cityName);
        return foundCity ? foundCity.id : null;
    };


    // Hàm để lấy ID của quận/huyện dựa trên tên của nó
    const getDistrictIdByName = (districtName) => {
        const foundDistrict = districts.find(district => district.full_name === districtName);
        return foundDistrict ? foundDistrict.id : null;
    };

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
            const formData = new FormData();
            formData.append("id", idImage); // Thêm ID của ảnh vào formData
            console.log(idMotel);
            console.log(" ẢNH CẦN XÓA:", idImage);

            await authApi(token).delete(endpoints["deleteImgMotel"](idImage));
            setRender(!render);
            showToast({ type: "success", text1: "Thành công", text2: "Xóa ảnh thành công" });
            console.log("Xóa ảnh thành công");
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
    // Hàm này được gọi khi người dùng ấn vào biểu tượng chỉnh sửa
    const handleEdit = async (prices) => {
        // setEditingService(service);
        // setEditingPrice(service.value);
        // setNewPrice(service.value); // Cập nhật giá trị mới cho newPrice khi mở modal
        console.log("Thông tin truyền qua:", prices);
        navigation.navigate("DetailPrices", { infoPrice: prices, idMotel: idMotel });
        // setRender(!render);
        navigation.addListener('focus', async () => {
            await loadDetailMotel();
        });
    };
    const loadDetailMotel = async () => {
        try {
            // Gọi API để lấy dữ liệu chi tiết của nhà trọ với idMotel
            let token = await AsyncStorage.getItem("access-token");
            console.log("token:", token);
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

            // console.log("Mảng ảnh:", res.data.motel_images);
            // console.log("Mảng prices:", res.data.prices);
            setPrices(res.data.prices);
            setImages(res.data.images);
            setInitialState({
                ward: res.data.ward,
                district: res.data.district,
                city: res.data.city,
                other: res.data.other_address,
                price: String(res.data.price),
                area: String(res.data.area),
                maxpeople: String(res.data.max_people),
                desc: res.data.description
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching motel detail:", error);
            // Xử lý lỗi nếu có
            Alert.alert(
                "Error",
                "Failed to load motel detail. Please try again later."
            );
        }
    };
    const fetchApiDeletePrice = async (item) => {
        try {
            let token = await AsyncStorage.getItem("access-token");
            const formData = new FormData();
            formData.append("id", idMotel);
            console.log(token);
            console.log("ID MOTEL:", idMotel);
            const priceId = item.id; // Lấy id của giá cần xóa
            console.log("id giá xóa:", priceId);
            await authApi(token).delete(endpoints.deletePrice(priceId), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Xóa thành công prices");
            console.log("xóa thành công prices");

            setRender(!render);
            // showToast1();
            showToast({ type: "success", text1: "Thành công", text2: "Xóa thành công" });



        } catch (ex) {
            console.error(ex);
        }
    }
    const deletePrices = async (item) => {
        console.log("ID:", item.id);
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn xóa không?",
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Hủy xóa"),
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: async () => {
                        // Gọi API xóa ở đây
                        await fetchApiDeletePrice(item);

                    }
                }
            ]
        );
    }

    const handleExit = () => {
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
                console.log("NEW IMG:", newImages);
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
            console.log("new img 2:", newImages);

            // Loop through each new image and append it to formData
            newImages.forEach((image) => {
                formData.append('images', {
                    uri: image.uri,
                    type: image.mimeType, // Sử dụng mimeType từ ảnh đã chọn
                    name: 'image.jpg',
                });
            });
            console.log("FORM DTAA:", formData);


            // Chỉ gửi formData nếu có ảnh mới được thêm vào
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
            console.log("ID MOTEL", idMotel)

            // So sánh giá trị hiện tại với giá trị ban đầu
            if (ward !== initialState.ward) { formData.append("ward", ward); }
            if (district !== initialState.district) { formData.append("district", district); }
            if (city !== initialState.city) { formData.append("city", city); }
            if (other !== initialState.other) { formData.append("other_address", other); }
            if (price !== initialState.price) { formData.append("price", price); }
            if (area !== initialState.area) { formData.append("area", area); }
            if (maxpeople !== initialState.maxpeople) { formData.append("max_people", maxpeople); }
            if (desc !== initialState.desc) { formData.append("description", desc); }
            if (ward == initialState.ward && district == initialState.district &&
                city == initialState.city && other == initialState.other && maxpeople == initialState.maxpeople
                && desc == initialState.desc
            ) {
                Alert.alert(
                    "Thông báo",
                    "Không có thông tin mới để cập nhật.",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
                return;
            }
            const response = await authApi(token).patch(endpoints["updateMotel"](idMotel), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Update thành công");
            console.log(response.data);
            // Hiển thị thông báo thành công
            showToast({ type: "success", text1: "Thành công", text2: "Cập nhật thành công" });
            // Bật cờ render để render lại component
            setRender(!render);
        } catch (ex) {
            // console.error(ex);
            showToast({ type: "error", text1: "Lỗi", text2: "Lỗi cập nhật" });
        }

    }
    const nextMap = () => {
        const selectedCityName = getCityNameById(city);
        const selectedDistrictName = getDistrictNameById(district);
        const selectedWardName = wardMapping[ward];


        navigation.navigate('MapSearch', {
            previousScreen: 'EditMotel',
            selectedCity: selectedCityName,
            selectedDistrict: selectedDistrictName,
            selectedWard: selectedWardName,
            other: other,
            idMotel: idMotel
        });
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
            {loading ? (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator size="large" color={COLOR.PRIMARY} />
                </View>
            ) : (


                <ScrollView
                    contentContainerStyle={EditMotelStyle.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={EditMotelStyle.infoContainer}>
                        <Text style={EditMotelStyle.labelService}> Thông tin phòng</Text>
                        {/* <Text> {idMotel}</Text> */}


                        <Text style={EditMotelStyle.label}>Tỉnh/Thành phố</Text>
                        <View style={[PostStyle.selectContainer, { marginHorizontal: 20, borderRadius: 20, }]}>
                            {/* <Text>Chọn tỉnh/thành phố:</Text> */}
                            <RNPickerSelect
                                value={getCityIdByName(city)}
                                onValueChange={(value) => {
                                    setCity(value);
                                    handleCityChange(value);
                                }}
                                placeholder={{ label: 'Chọn tỉnh/thành phố', value: city }}
                                items={cities.map(city => ({ label: city.full_name, value: city.id }))}
                            />
                        </View>
                        <Text style={EditMotelStyle.label}> Quận/Huyện</Text>
                        <View style={[PostStyle.selectContainer, { marginHorizontal: 20, borderRadius: 20, }]}>
                            <RNPickerSelect
                                value={getDistrictIdByName(district)}
                                onValueChange={(value) => {
                                    setDistrict(value);
                                    handleDistrictChange(value);
                                }}
                                placeholder={{ label: 'Chọn quận/huyện', value: district }}
                                items={districts.map(district => ({ label: district.full_name, value: district.id }))}
                            />
                        </View>
                        <Text style={EditMotelStyle.label}>Xã/Phường</Text>
                        <View style={[PostStyle.selectContainer, { marginHorizontal: 20, borderRadius: 20, }]}>
                            <RNPickerSelect
                                value={getWardIdByName(ward)}
                                onValueChange={(value) => setWard(value)}
                                placeholder={{ label: 'Chọn xã/phường', value: ward, placeholderTextColor: 'black' }}
                                items={wards.map(ward => ({ label: ward.full_name, value: ward.id }))}
                            />
                        </View>
                        <Text style={EditMotelStyle.label}> Địa chỉ khác</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons
                                style={SearchStyle.icon}
                                name="location-sharp"
                                size={24}
                                color="black"
                            />
                            <TextInput
                                style={SearchStyle.input}
                                value={other}
                                onChangeText={setOther}
                                placeholder="Địa chỉ khác"
                            />
                            <TouchableOpacity style={{ marginLeft: "auto" }} onPress={nextMap} >
                                <Entypo style={{ backgroundColor: COLOR.PRIMARY, padding: 10, borderRadius: 10, }} name="map" size={24} color="#fff" />
                            </TouchableOpacity>

                        </View>

                        <Text style={EditMotelStyle.label}> Tiền phòng</Text>
                        <View style={styles.inputContainer}>
                            <Foundation style={styles.icon} name="dollar" size={24} color="black" />

                            <TextInput style={styles.input} value={price} onChangeText={setPrice}
                                placeholder="Tiền phòng" />
                        </View>
                        <Text style={EditMotelStyle.label}> Diện tích</Text>
                        <View style={styles.inputContainer}>
                            <AntDesign style={styles.icon} name="areachart" size={24} color="black" />
                            <TextInput style={styles.input} value={area} onChangeText={setArea}
                                placeholder="Diện tích" />
                        </View>
                        <Text style={EditMotelStyle.label}> Mô tả</Text>

                        <View style={styles.inputContainer}>
                            <MaterialIcons style={styles.icon} name="mode-edit-outline" size={24} color="black" />
                            <TextInput style={styles.input} value={desc} onChangeText={setDesc}
                                placeholder="Mô tả" />
                        </View>
                        <Text style={EditMotelStyle.label}> Số người</Text>

                        <View style={styles.inputContainer}>
                            <MaterialIcons style={styles.icon} name="supervised-user-circle" size={24} color="black" />
                            <TextInput style={styles.input} value={maxpeople} onChangeText={setMaxpeople}
                                placeholder="Số người ở" />
                        </View>
                    </View>

                    <View style={EditMotelStyle.serviceInfo}>
                        <Text style={EditMotelStyle.labelService}>Thông tin dịch vụ</Text>
                        <TouchableOpacity onPress={addPrice}>
                            <AntDesign
                                style={{ marginLeft: "auto", paddingRight: 20 }}
                                name="pluscircleo"
                                size={30}
                                color={COLOR.PRIMARY}
                            />
                        </TouchableOpacity>

                        <View style={EditMotelStyle.serviceRow}>
                            {prices.map((item, index) => (
                                <View key={index} style={EditMotelStyle.serviceIt}>
                                    <Text>{item.label}</Text>
                                    <Text>{item.name}</Text>
                                    <Text>
                                        {item.value} đ/{item.period}
                                    </Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => handleEdit(item)}>
                                            <AntDesign style={EditMotelStyle.iconEdit} name="edit" size={24} color="green" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deletePrices(item)}>
                                            <MaterialCommunityIcons style={EditMotelStyle.iconEdit} name="delete-circle-outline" size={24} color="red" />
                                        </TouchableOpacity>
                                    </View>

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
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: COLOR.bg_color1,
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#fff",
        ...SHADOWS.small,
        width: "90%",
        marginLeft: 20,
        alignContent: "center",
        // justifyContent:"center"
    },
    icon: {
        width: 45,
        color: COLOR.PRIMARY,
    },
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
export default EditMotel;
