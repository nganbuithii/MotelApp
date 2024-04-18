import React, { useContext, useState } from "react";
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
import DataXaPhuong from "../../assets/data/DataXaPhuong";
import { AntDesign } from '@expo/vector-icons';
import API, { authApi, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from '../../configs/MyContext';


const RegisterMotel = ({ navigation }) => {
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

    const [error, setError] = useState({
        price: '',
        desc: '',
        people: '',
        ward: '',
        district: '',
        city: '',
        area: '',
    });

    const handleSubmit = async () => {
        try {
            const newErrors = {};
            if (!price) {
                newErrors.price = "Vui lòng nhập giá phòng";
            } else if (price && price <= 0) {
                newErrors.price = "Vui lòng nhập giá lớn hơn 0";
            }
            if (!people) {
                newErrors.people = "Vui lòng nhập số lượng người ở";
            } else if (people && people <= 0) {
                newErrors.people = "Vui lòng nhập số lượng lớn hơn 0";
            }
            if (!area) {
                newErrors.area = "Vui lòng nhập diện tích nhà";
            } else if (area && area < 100) {
                newErrors.area = "Vui lòng nhập diện tích lớn hơn 100 m2";
            }
            if (!desc) {
                newErrors.desc = "Vui lòng nhập mô tả";
            }
            if (!ward) {
                newErrors.ward = "Vui lòng nhập xã/phường";
            }
            if (!district) {
                newErrors.district = "Vui lòng nhập quận/huyện";
            }
            if (!city) {
                newErrors.city = "Vui lòng nhập tỉnh/thành phố";
            }


            try {
                let token = await AsyncStorage.getItem("access-token");
                console.log(user.id);
                const formData = new FormData();
                formData.append('price', price);
                formData.append('description', desc);
                formData.append('max_people', people);
                formData.append('ward', ward);
                formData.append('district', district);
                formData.append('city', city);
                formData.append('area', area);
                formData.append('other_address', other);
                formData.append('lat', "1");
                formData.append('lon', "1");
                // console.log(token);
                // console.log("FORM DATA TRO", formData);
                let res = await authApi(token).post(endpoints['postMotel'], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
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

                {error.ward && <Text style={styles.errorMsg}><AntDesign name="exclamation" size={13} color="red" />{error.ward}</Text>}
                <View style={styles.selectContainer}>
                    <RNPickerSelect
                        style={styles}
                        value={ward}

                        onValueChange={(value) => setWard(value)}
                        placeholder={{ label: "Chọn xã/phường", value: null }}
                        items={[
                            { label: "Xã/Phường 1", value: "XaPhuong1" },
                            { label: "Xã/Phường 2", value: "XaPhuong2" },
                            { label: "Xã/Phường 3", value: "XaPhuong3" },
                            // Thêm các xã/phường khác vào đây
                        ]}
                    />
                </View>

                {error.district && <Text style={styles.errorMsg}><AntDesign name="exclamation" size={13} color="red" />{error.district}</Text>}
                <View style={styles.selectContainer}>
                    <RNPickerSelect
                        value={district}
                        style={styles}
                        onValueChange={(value) => setDistrict(value)}
                        placeholder={{ label: "Chọn quận/huyện", value: null }}

                        items={DataXaPhuong["Thành phố Hồ Chí Minh"]["Quận 1"]}

                    />
                </View>

                {error.city && <Text style={styles.errorMsg}><AntDesign name="exclamation" size={13} color="red" />{error.city}</Text>}
                <View style={styles.selectContainer}>
                    <RNPickerSelect
                        style={styles}
                        value={city}
                        onValueChange={(value) => setCity(value)}
                        placeholder={{ label: "Chọn tỉnh/thành phố", value: null }}
                        items={[
                            { label: "Tỉnh/Thành phố 1", value: "TinhThanhPho1" },
                            { label: "Tỉnh/Thành phố 2", value: "TinhThanhPho2" },
                            { label: "Tỉnh/Thành phố 3", value: "TinhThanhPho3" },
                            // Thêm các tỉnh/thành phố khác vào đây
                        ]}
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
