import React, { useState } from "react";
import { View,Text,TextInput,TouchableOpacity,StyleSheet,ScrollView,Image,
} from "react-native";
import { COLOR, SHADOWS } from "../common/color";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ButtonAuth from "../common/ButtonAuth";
import DataXaPhuong from "../../assets/data/DataXaPhuong";

const RegisterMotel = ({navigation}) => {
    const [houseInfo, setHouseInfo] = useState({
        id: "",
        giathue: "",
        dientich: "",
        xaphuong: "",
        quanhuyen: "",
        tinhtp: "",
        diachikhac: "",
        mota: "",
    });

    const handleChangeText = (key, value) => {
        setHouseInfo({ ...houseInfo, [key]: value });
    };

    const handleSubmit = () => {
        // Xử lý logic đăng ký trọ ở đây
        console.log("Thông tin đăng ký trọ:", houseInfo);
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/3.png")}
                style={styles.backgroundImage}
            />
            <ScrollView contentContainerStyle={styles.formContainer}>

                <View style={styles.imageContainer}>
                    <Image
                        source={require("../../assets/images/a1.png")}
                        style={styles.a1Image}
                    />
                    <Text style={styles.txtHead}>Đăng ký nhà trọ của bạn</Text>
                </View>
                
                <View style={styles.inputContainer}>
                    <MaterialIcons
                        style={styles.icon}
                        name="attach-money"
                        size={24}
                        color="black"
                    />
                    <TextInput style={styles.input} placeholder="Giá phòng" />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome5
                        style={styles.icon}
                        name="house-user"
                        size={24}
                        color="black"
                    />
                    <TextInput style={styles.input} placeholder="Diện tích" />
                </View>
                <View style={styles.inputContainer}>
                    <Entypo
                        style={styles.icon}
                        name="pencil"
                        size={24}
                        color="black"
                    />
                    <TextInput style={styles.input} placeholder="Mô tả" />
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
                        placeholder="Địa chỉ khác (Nếu có)"
                    />
                </View>
                <View style={styles.selectContainer}>
                    <RNPickerSelect
                        style={styles}
                        onValueChange={(value) => handleChangeText("xaphuong", value)}
                        placeholder={{ label: "Chọn xã/phường", value: null }}
                        items={[
                            { label: "Xã/Phường 1", value: "XaPhuong1" },
                            { label: "Xã/Phường 2", value: "XaPhuong2" },
                            { label: "Xã/Phường 3", value: "XaPhuong3" },
                            // Thêm các xã/phường khác vào đây
                        ]}
                    />
                </View>
                <View style={styles.selectContainer}>
                    <RNPickerSelect
                        style={styles}
                        onValueChange={(value) => handleChangeText("quanhuyen", value)}
                        placeholder={{ label: "Chọn quận/huyện", value: null }}
                        
                        items={DataXaPhuong["Thành phố Hồ Chí Minh"]["Quận 1"]} 
                        
                    />
                </View>

                <View style={styles.selectContainer}>
                    <RNPickerSelect
                        style={styles}
                        onValueChange={(value) => handleChangeText("tinhtp", value)}
                        placeholder={{ label: "Chọn tỉnh/thành phố", value: null }}
                        items={[
                            { label: "Tỉnh/Thành phố 1", value: "TinhThanhPho1" },
                            { label: "Tỉnh/Thành phố 2", value: "TinhThanhPho2" },
                            { label: "Tỉnh/Thành phố 3", value: "TinhThanhPho3" },
                            // Thêm các tỉnh/thành phố khác vào đây
                        ]}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <ButtonAuth title="Đăng kí nhà trọ" onPress={() => navigation.navigate("UploadImgHouse")}/>
                </View>
            </ScrollView>
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
        // backgroundColor:"red",
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
        opacity: 0.6, // Điều chỉnh độ mờ của hình ảnh
    },
    formContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 30,
        paddingBottom: 20,
        color: COLOR.offWhite,
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
        borderColor: "black",
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
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    
    },
    a1Image: {
        marginTop:10,
        width: 120,
        height: 102,
    },

});

export default RegisterMotel;
