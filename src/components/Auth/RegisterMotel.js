import React, { useContext, useState, useEffect } from "react";
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator,
    Alert,
} from "react-native";
import { COLOR, SHADOWS } from "../common/color";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
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
import SearchStyle from "../../Styles/SearchStyle";
import Modal from "react-native-modalbox";
import { Button, Checkbox } from "react-native-paper";

const RegisterMotel = ({ navigation, route }) => {
    const [cities, setCities] = useState([]); // State để lưu trữ danh sách các tỉnh/thành phố
    const [districts, setDistricts] = useState([]); // State để lưu trữ danh sách các quận/huyện
    const [wards, setWards] = useState([]);
    // const [showModal, setShowModal] = useState(false);
    const [user] = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState(null);
    const [people, setPeople] = useState(null);
    const [ward, setWard] = useState(null);
    const [district, setDistrict] = useState(null);
    const [city, setCity] = useState(null);
    const [area, setArea] = useState(null);
    const [other, setOther] = useState(null);
    // const [cabinet, setCabinet] = useState(null);
    const [furniture, setFurniture] = useState(null);
    // const [modalsEdit, setModalsEdit] = useState({});
    // const { latitude, longitude, locationName } = route.params;
    const lon= route.params?.lon;
    const lat = route.params?.lat;
    const nameLoc = route.params?.nameLoc;
    useEffect(() => {
        console.log("Route params:", route.params);
        if (route.params?.nameLoc) {
            console.log("Here", route.params.nameLoc);
            setOther(route.params.nameLoc);
        }
    }, [route.params?.nameLoc]);

    const [priceErr, setPriceErr] = useState("");
    const [descErr, setDescErr] = useState("");
    const [peopleErr, setPeopleErr] = useState("");
    const [wardErr, setWardErr] = useState("");
    const [districtErr, setDistrictErr] = useState("");
    const [cityErr, setCityErr] = useState("");
    const [areaErr, setAreaErr] = useState("");
    const [cabinetErr, setCabinetErr] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFurniture, setSelectedFurniture] = useState([]);
    // const [furniture, setFurniture] = useState("");

    // Hàm để mở modal:
    const openModal = () => {
        setIsModalVisible(true);
    };

    // Hàm để đóng modal:
    const closeModal = () => {
        setIsModalVisible(false);
    };
    const handleFurnitureChange = (text) => {
        setFurniture(text);
    };
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
            if(lon==undefined && lat ==undefined){
                Alert.alert("Thông báo", " Bạn hãy nhấn vào bản đồ để xác nhận vị trí.")
                return;
            }
            if (!price) { setPriceErr("Vui lòng nhập giá phòng"); }
            else if (price && price <= 0) { setPriceErr("Vui lòng nhập giá lớn hơn 0"); }
            if (!people) { setPeopleErr("Vui lòng nhập số lượng người ở"); }
            else if (people && people <= 0) { setPeopleErr("Vui lòng nhập số lượng lớn hơn 0"); }
            if (!area) { setAreaErr("Vui lòng nhập diện tích nhà"); }
            else if (area && area < 100) { setAreaErr("Vui lòng nhập diện tích lớn hơn 100 m2"); }
            if (!desc) { setDescErr("Vui lòng nhập mô tả"); }
            if (!district) { setDistrictErr("Vui lòng chọn quận/huyện"); }
            if (!ward) { setWardErr("Vui lòng chọn xã/phường"); }
            if (!city) { setCityErr("Vui lòng chọn tỉnh/thành phố"); }
            if (!furniture) { setCabinetErr("Vui lòng nhập thông tin nội thất"); }

            if (price && people && area && desc && district && furniture && city && ward && other) {
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
                    formData.append('furniture', furniture);
                    console.log("form data:", formData);
        
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

                    await AsyncStorage.setItem("motels", JSON.stringify(currentMotels));
                    const motels = await AsyncStorage.getItem("motels");
                    console.log("MOTEL Ở ĐK: ", motels);

                    console.info("TRỌ RES DATA", res.data);
                    console.log("Thành công tạo trọ");
                    navigation.navigate("UploadImgHouse", { idMotel: res.data.id });


                } catch (ex) {
                    Alert.alert("lỗi", "Tạo trọ không thành công")
                    // console.error(ex);
                } finally {
                    setLoading(false);
                }
            }

        } catch (ex) {
            console.error("Lỗi trong quá trình xử lý form:", ex);
        }
    };

    const nextMap = () => {
        const selectedCityName = getCityNameById(city);
        const selectedDistrictName = getDistrictNameById(district);
        const selectedWardName = wardMapping[ward];


        navigation.navigate('MapSearch', {
            previousScreen: 'RegisterMotel',
            selectedCity: selectedCityName,
            selectedDistrict: selectedDistrictName,
            selectedWard: selectedWardName,
            other:other
        });
    }
    const furnitureOptions = ["Tủ lạnh", "Máy giặt", "Máy lạnh", "Bàn ăn", "Bàn làm việc", "Ghế sofa", "Ghế ăn", "Giường ngủ", "Tủ quần áo", "Bàn trà","Không có nội thất"];

    const handleCheckboxChange = (option) => {
        let updatedFurniture = [...selectedFurniture];
        if (updatedFurniture.includes(option)) {
            // Nếu tùy chọn đã được chọn, loại bỏ nó khỏi mảng
            updatedFurniture = updatedFurniture.filter(item => item !== option);
        } else {
            // Nếu tùy chọn chưa được chọn, thêm nó vào mảng
            updatedFurniture.push(option);
        }
        setSelectedFurniture(updatedFurniture); // Cập nhật trạng thái của selectedFurniture
        setFurniture(updatedFurniture.join(", ")); // Cập nhật giá trị của furniture
    };


    const handleModalClose = () => {
        // Đặt modalsEdit thành một đối tượng rỗng khi đóng modal box
        setIsModalVisible(false);
    };
    const handleOkPress = () => {
        setFurniture(selectedFurniture.join(", "));
        setIsModalVisible(false);
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
                {!!priceErr && <Text style={styles.errorText}><Ionicons name="warning" size={12} color="red" />{priceErr}</Text>}
                <View style={styles.inputContainer}>
                    <MaterialIcons
                        style={styles.icon}
                        name="attach-money"
                        size={24}
                        color="black"
                    />
                    <TextInput style={styles.input} value={price} onChangeText={setPrice}
                        onFocus={() => setPriceErr("")}
                        placeholder="Giá phòng" />
                </View>

                {!!areaErr && <Text style={styles.errorText}><Ionicons name="warning" size={12} color="red" />{areaErr}</Text>}
                <View style={styles.inputContainer}>
                    <FontAwesome5
                        style={styles.icon}
                        name="house-user"
                        size={24}
                        color="black"
                    />
                    <TextInput style={styles.input} onFocus={() => setAreaErr("")} value={area} onChangeText={setArea} placeholder="Diện tích" />
                </View>

                {!!peopleErr && <Text style={styles.errorText}><Ionicons name="warning" size={12} color="red" />{peopleErr}</Text>}
                <View style={styles.inputContainer}>
                    <FontAwesome5 style={styles.icon} name="user-friends" size={24} color="black" />
                    <TextInput style={styles.input} onFocus={() => setPeopleErr("")} value={people} onChangeText={setPeople} placeholder="Số lượng người " />
                </View>

                {!!cabinetErr && <Text style={styles.errorText}><Ionicons name="warning" size={12} color="red" />{cabinetErr}</Text>}
                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons
                        style={styles.icon}
                        name="file-cabinet"
                        size={24}
                        color="black"
                    />
                    <TouchableOpacity onPress={openModal}>
                        <Text style={{ marginRight: 40 }}>{furniture ? furniture : 'Chọn nội thất'}</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    isOpen={isModalVisible} // Sử dụng giá trị của state isModalVisible
                    onClosed={handleModalClose}
                    style={styles.modal}
                >
                    <View>
                        <Text style={{ color: COLOR.PRIMARY }}>Chọn nội thất</Text>
                        <View style={styles.container}>
                            {furnitureOptions.map((option, index) => (
                                <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Checkbox
                                    color={COLOR.PRIMARY}
                                        status={selectedFurniture.includes(option) ? 'checked' : 'unchecked'}
                                        onPress={() => handleCheckboxChange(option)}
                                    />
                                    <Text style={styles.checkboxLabel}>{option}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Button mode="contained" style={styles.button} buttonColor={COLOR.finally} onPress={handleOkPress}> 
                                Ok
                            </Button>
                            <Button mode="outlined" onPress={handleModalClose}  style={styles.button} >
                                Hủy
                            </Button>
                        </View>
                    </View>
                </Modal>
                {!!descErr && <Text style={styles.errorText}><Ionicons name="warning" size={12} color="red" />{descErr}</Text>}
                <View style={styles.inputContainer}>
                    <Entypo
                        style={styles.icon}
                        name="pencil"
                        size={24}
                        color="black"
                    />
                    <TextInput value={desc} style={styles.input} onFocus={() => setDescErr("")} onChangeText={setDesc} placeholder="Mô tả" />
                </View>





                {!!cityErr && <Text style={styles.errorText}><Ionicons name="warning" size={12} color="red" />{cityErr}</Text>}
                <View style={styles.selectContainer}>
                    {/* <Text>Chọn tỉnh/thành phố:</Text> */}
                    <RNPickerSelect
                        value={city}
                        onValueChange={(value) => {
                            setCity(value);
                            if (value !== '') {
                                setCityErr(""); // Đặt error thành rỗng nếu có giá trị được chọn
                            }
                            handleCityChange(value);
                        }}
                        placeholder={{ label: 'Chọn tỉnh/thành phố', value: null }}
                        items={cities.map(city => ({ label: city.full_name, value: city.id }))}
                    />
                </View>
                {!!districtErr && <Text style={styles.errorText}><Ionicons name="warning" size={12} color="red" />{districtErr}</Text>}
                <View style={styles.selectContainer}>
                    <RNPickerSelect
                        value={district}
                        onValueChange={(value) => {
                            setDistrict(value);
                            if (value !== '') {
                                setDistrictErr(""); // Đặt error thành rỗng nếu có giá trị được chọn
                            }
                            handleDistrictChange(value);
                        }}
                        placeholder={{ label: 'Chọn quận/huyện', value: null }}
                        items={districts.map(district => ({ label: district.full_name, value: district.id }))}
                    />
                </View>
                {!!wardErr && <Text style={styles.errorText}><Ionicons name="warning" size={12} color="red" />{wardErr}</Text>}
                <View style={styles.selectContainer}>
                    <RNPickerSelect
                        value={ward}
                        onValueChange={(value) => {
                            setWard(value);
                            if (value !== '') {
                                setWardErr(""); // Đặt error thành rỗng nếu có giá trị được chọn
                            }

                        }}
                        placeholder={{ label: 'Chọn xã/phường', value: null }}
                        items={wards.map(ward => ({ label: ward.full_name, value: ward.id }))}
                    />
                </View>
                <View style={SearchStyle.inputContainer}>
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
    errorText: {
        color: "red",
        fontWeight: "500",
        textAlign: "left"
    },
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
        fontWeight: "500",
        marginLeft: "auto"
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
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        flex: 0.65,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLOR.color3,
        padding: 20, // Thêm padding để tạo khoảng cách với mép của Modal
        width: "90%",
        borderRadius: 20,
    },
    button: {
        width: "48%",
        marginTop: 10,
        marginRight: 10
    },
});


export default RegisterMotel;
