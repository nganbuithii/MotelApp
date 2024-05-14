import React, { useContext, useState, useEffect } from "react";
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator,
    Alert,
} from "react-native";
import { COLOR, SHADOWS } from "../common/color";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ButtonAuth from "../common/ButtonAuth";
import { AntDesign } from '@expo/vector-icons';
import API, { authApi, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from '../../configs/MyContext';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RegisterMotel = ({ navigation, route }) => {
    const [cities, setCities] = useState([]); // State để lưu trữ danh sách các tỉnh/thành phố
    const [districts, setDistricts] = useState([]); // State để lưu trữ danh sách các quận/huyện
    const [wards, setWards] = useState([]);

    const [user, dispatch] = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState(null);
    const [people, setPeople] = useState(null);
    const [ward, setWard] = useState(null);
    const [district, setDistrict] = useState(null);
    const [city, setCity] = useState(null);
    const [area, setArea] = useState(null);
    const [other, setOther] = useState(null);
    const [cabinet, setCabinet] = useState(null);
    // const { latitude, longitude, locationName } = route.params;
    const lon = route.params?.lon;
    const lat = route.params?.lat;
    const nameLoc = route.params?.nameLoc;

    // const {latt, setLatt} = useState();


    const [error, setError] = useState({
        price: '',
        desc: '',
        people: '',
        ward: '',
        district: '',
        city: '',
        area: '',
        cabinet: ''
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
            const newErrors = {};
            if (!price) { newErrors.price = "Vui lòng nhập giá phòng"; }
            else if (price && price <= 0) { newErrors.price = "Vui lòng nhập giá lớn hơn 0"; }
            if (!people) { newErrors.people = "Vui lòng nhập số lượng người ở"; }
            else if (people && people <= 0) { newErrors.people = "Vui lòng nhập số lượng lớn hơn 0"; }
            if (!area) { newErrors.area = "Vui lòng nhập diện tích nhà"; }
            else if (area && area < 100) { newErrors.area = "Vui lòng nhập diện tích lớn hơn 100 m2"; }
            if (!desc) { newErrors.ward = "Vui lòng nhập xã/phường"; }
            if (!district) { newErrors.district = "Vui lòng nhập quận/huyện"; }
            if (!city) { newErrors.city = "Vui lòng nhập tỉnh/thành phố"; }
            if (!cabinet) { newErrors.cabinet = "Vui lòng nhập thông tin nội thất" }
            // if(lat){setLatt(lat);
            // }
            // if(lon){setLonn(lon);};


            try {
                let token = await AsyncStorage.getItem("access-token");
                console.log(user.id);
                const formData = new FormData();
                formData.append('price', price);
                formData.append('description', desc);
                formData.append('max_people', people);
                formData.append('ward', getWardNameById(ward));
                formData.append('district', getDistrictNameById(district));
                formData.append('city', getCityNameById(city));
                formData.append('area', area);
                formData.append('other_address', other);
                formData.append('lat', lat);
                formData.append('lon', lon);
                formData.append('furniture', cabinet);
                console.log("form data:", formData);
                // console.log(token);
                // console.log("FORM DATA TRO", formData);
                let res = await authApi(token).post(endpoints['postMotel'], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // Lưu dữ liệu vào AsyncStorage
                let currentMotels = await AsyncStorage.getItem("motels");
                currentMotels = currentMotels ? JSON.parse(currentMotels) : [];

                // Bước 2: Thêm dữ liệu mới từ res.data vào mảng nhà trọ
                currentMotels.push(res.data);

                // Bước 3: Cập nhật mảng nhà trọ đã được cập nhật vào AsyncStorage
                await AsyncStorage.setItem("motels", JSON.stringify(currentMotels));
                const motels = await AsyncStorage.getItem("motels");
                console.log("MOTEL Ở ĐK: ", motels);
                console.info("TRỌ RES DATA đã được lưu vào AsyncStorage");

                // const infoMotel = await AsyncStorage.getItem("infoMotel");
                // console.log("INFOMOTELS", infoMotel);

                console.info("TRỌ RES DATA", res.data);
                console.log("Thành công tạo trọ");
                navigation.navigate("UploadImgHouse", { idMotel: res.data.id });


            } catch (ex) {
                Alert.alert("lỗi", "Tạo trọ không thành công")
                console.error(ex);
            } finally {
                setLoading(false);
            }




            setError(newErrors);

        } catch (ex) {
            console.error("Lỗi trong quá trình xử lý form:", ex);
        }
    };
    // const test = () => {
    //     console.log(lon);
    //     console.log(lat);
    //     console.log(nameLoc);
    // }
    const nextMap = () => {

        navigation.navigate("MapSearch");
        if (nameLoc) {
            navigation.addListener('focus', async () => {
                setOther(nameLoc);
            });
        } else {
            console.log("no")
        }


    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/3.png")}
                style={styles.backgroundImage}
            />

            {/* <View style={styles.formContainer}> */}
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../assets/images/a1.png")}
                    style={styles.a1Image}
                />
                <Text style={styles.txtHead}>Đăng ký nhà trọ của bạn</Text>
            </View>
            {/* <TouchableOpacity onPress={test}>
                <Text> He4k4</Text>
            </TouchableOpacity> */}
            <ScrollView contentContainerStyle={styles.scrollView}>
                {error.price && <Text style={styles.errorMsg}><AntDesign name="exclamation" size={13} color="red" />{error.price}</Text>}
                <View style={styles.inputContainer}>
                    <MaterialIcons
                        style={styles.icon}
                        name="attach-money"
                        size={24}
                        color="black"
                    />
                    <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="Giá phòng" />
                </View>

                {error.area && <Text style={styles.errorMsg}><AntDesign name="exclamation" size={13} color="red" />{error.area}</Text>}
                <View style={styles.inputContainer}>
                    <FontAwesome5
                        style={styles.icon}
                        name="house-user"
                        size={24}
                        color="black"
                    />
                    <TextInput style={styles.input} value={area} onChangeText={setArea} placeholder="Diện tích" />
                </View>

                {error.people && <Text style={styles.errorMsg}><AntDesign name="exclamation" size={13} color="red" />{error.people}</Text>}
                <View style={styles.inputContainer}>
                    <FontAwesome5 style={styles.icon} name="user-friends" size={24} color="black" />
                    <TextInput style={styles.input} value={people} onChangeText={setPeople} placeholder="Số lượng người " />
                </View>

                {error.cabinet && <Text style={styles.errorMsg}><AntDesign name="exclamation" size={13} color="red" />{error.cabinet}</Text>}
                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons style={styles.icon} name="file-cabinet" size={24} color="black" />
                    <TextInput style={styles.input} value={cabinet} onChangeText={setCabinet} placeholder="Nội thất " />
                </View>


                {error.desc && <Text style={styles.errorMsg}><AntDesign name="exclamation" size={13} color="red" />{error.desc}</Text>}
                <View style={styles.inputContainer}>
                    <Entypo
                        style={styles.icon}
                        name="pencil"
                        size={24}
                        color="black"
                    />
                    <TextInput value={desc} style={styles.input} onChangeText={setDesc} placeholder="Mô tả" />
                </View>





                {error.city && <Text style={styles.errorMsg}><AntDesign name="exclamation" size={13} color="red" />{error.city}</Text>}
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
                {error.district && <Text style={styles.errorMsg}><AntDesign name="exclamation" size={13} color="red" />{error.district}</Text>}
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
                {error.ward && <Text style={styles.errorMsg}><AntDesign name="exclamation" size={13} color="red" />{error.ward}</Text>}
                <View style={styles.selectContainer}>
                    <RNPickerSelect
                        value={ward}
                        onValueChange={(value) => setWard(value)}
                        placeholder={{ label: 'Chọn xã/phường', value: null }}
                        items={wards.map(ward => ({ label: ward.full_name, value: ward.id }))}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons
                        style={styles.icon}
                        name="location-sharp"
                        size={24}
                        color="black"
                    />
                    <TextInput
                        style={styles.input}
                        value={other}
                        onChangeText={setOther}
                        placeholder="Địa chỉ khác (Nếu có)"
                    />
                </View>
                <TouchableOpacity style={{ padding: 10, borderRadius: 20, backgroundColor: COLOR.PRIMARY, flexDirection: "row" }} onPress={nextMap} >
                    <Entypo name="map" size={24} color="#fff" />
                    <Text style={{ color: "#fff", marginLeft: 20 }}> Tìm kiếm nhanh hơn trên bản đồ</Text>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                    {loading ? (<ActivityIndicator />) : (
                        <ButtonAuth title="Đăng kí nhà trọ" onPress={handleSubmit} />)}
                </View>
            </ScrollView>
            {/* </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    txtHead: {
        color: "#fff",
        fontSize: 23,
        fontWeight: "500",
    },
    input: {
        width: "85%",
        padding: 5
    },
    container: {
        flex: 1,
        backgroundColor: COLOR.color3,
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.6,

    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#fff"
    },
    icon: {
        width: 45,
        color: COLOR.PRIMARY,
    },
    selectContainer: {
        marginBottom: 5,
        backgroundColor: "#fff",
        marginVertical: 5,
        borderColor: "#fff",
        borderRadius: 5,
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    a1Image: {
        width: 120,
        height: 102,
    },
    errorMsg: {
        fontWeight: "300",
        color: "red",
        fontSize: 10,
        textAlign: "left",
        fontWeight: "500"
    },
    formContainer: {
        paddingHorizontal: 30,
        paddingBottom: 20,
        color: COLOR.offWhite,
    },
    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 30,
        paddingBottom: 30
    },
});


export default RegisterMotel;
