import React, { useContext, useState, useEffect } from "react";
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator,
    Alert,
} from "react-native";
import { COLOR, SHADOWS } from "../common/color";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import ButtonAuth from "../common/ButtonAuth";
import MyContext from '../../configs/MyContext';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import showToast from "../common/ToastMessage";

const CreatePostRent = ({ navigation }) => {
    const [cities, setCities] = useState([]); // State để lưu trữ danh sách các tỉnh/thành phố
    const [districts, setDistricts] = useState([]); // State để lưu trữ danh sách các quận/huyện
    const [wards, setWards] = useState([]);

    const [user, dispatch] = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [desc, setDesc] = useState(null);
    const [ward, setWard] = useState(null);
    const [district, setDistrict] = useState(null);
    const [city, setCity] = useState(null);
    const [other, setOther] = useState(null);
    const [content, setContent] = useState();


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

    // Hàm để chuyển đổi ID thành tên xã/phường
    const getWardNameById = (wardId) => {
        return wardMapping[wardId] || '';
    };
    const handleSubmit = async () => {
        try {
            let token = await AsyncStorage.getItem("access-token");
            const formData = new FormData();
            let res = await authApi(token).post(endpoints["createPostForRent"], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Đăng bài thành công");
            
            navigation.navigate("HomeIndex",{myPost: res.data})
        } catch (ex) {
            console.error(ex);
            showToast({ type: "error", text1: "Lỗi Đăng bài", text2: "Hãy thử lại sau " });

        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/green.jpg")}
                style={styles.backgroundImage}
            />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: user.avatar }} // Thay đổi đường dẫn của ảnh mặc định
                        style={styles.avatar} />
                    <Text style={styles.username}>{user.username}</Text>
                </View>


                <View>

                    <Text style={styles.sectionTitle}>Mô tả</Text>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Hãy viết nội dung cho bài viết của bạn?" style={styles.input} multiline={true} value={content} onChangeText={(text) => setContent(text)}
                            onFocus={() => setContentError("")} />
                    </View>
                    <TouchableOpacity style={styles.uploadButton}>
                        <Ionicons name="camera" size={24} color="lightgreen" />
                        <Text style={styles.uploadText}>Thêm hình ảnh</Text>
                    </TouchableOpacity>
                    <Text style={styles.sectionTitle}>Vị trí muốn tìm trọ</Text>
                    <TouchableOpacity style={styles.uploadButton}>
                        <Feather name="map-pin" size={24} color="lightgreen" />
                        <Text style={styles.uploadText}>Thêm vị trí</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.selectContainer}>
                    {/* <Text>Chọn tỉnh/thành phố:</Text> */}
                    <RNPickerSelect
                        value={city}
                        onValueChange={(value) => {
                            setCity(value);
                            handleCityChange(value); // Gọi hàm xử lý khi tỉnh/thành phố được chọn
                        }}
                        placeholder={{ label: 'Chọn tỉnh/thành phố', value: null }}
                        items={cities.map(city => ({ label: city.full_name, value: city.id }))}
                    />
                </View>

                <View style={styles.selectContainer}>
                    <RNPickerSelect
                        value={district}
                        onValueChange={(value) => {
                            setDistrict(value);
                            handleDistrictChange(value); // Gọi hàm xử lý khi quận/huyện được chọn
                        }}
                        placeholder={{ label: 'Chọn quận/huyện', value: null }}
                        items={districts.map(district => ({ label: district.full_name, value: district.id }))}
                    />
                </View>

                <View style={styles.selectContainer}>
                    <RNPickerSelect
                        value={ward}
                        onValueChange={(value) => setWard(value)}
                        placeholder={{ label: 'Chọn xã/phường', value: null }}
                        items={wards.map(ward => ({ label: ward.full_name, value: ward.id }))}
                    />
                </View>
                <View style={styles.inputContainer}>

                    <TextInput
                        style={styles.input}
                        value={other}
                        onChangeText={setOther}
                        placeholder="Địa chỉ khác (Nếu có)"
                    />
                </View>

                <View style={styles.buttonContainer}>
                    {loading ? (<ActivityIndicator />) : (
                        <ButtonAuth title="Đăng bài" onPress={handleSubmit} />)}
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.6,

    },


    selectContainer: {
        marginBottom: 5,
        backgroundColor: "#fff",
        marginVertical: 5,
        borderColor: "#fff",
        borderRadius: 5,
        ...SHADOWS.medium
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 20,
    },



    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 30,
        paddingBottom: 30
    },
    input: {
        padding: 10,
        fontSize: 18,
        minHeight: 100,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 20,
        ...SHADOWS.medium
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        alignSelf: 'flex-start',
        marginLeft: 12,
        marginTop: 15
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
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        ...SHADOWS.medium,
        marginTop:10,
    },

    uploadText: {
        marginLeft: 10,
        fontSize: 16,
        color: "lightgreen",
    },


});


export default CreatePostRent;
