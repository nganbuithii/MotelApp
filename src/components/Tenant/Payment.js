import React, { useContext, useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import InputField from "../common/InputField";
import ButtonAuth from "../common/ButtonAuth";
import SearchStyle from "../../Styles/SearchStyle";
import { COLOR } from "../common/color";
import MyContext from "../../configs/MyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import { Linking } from "react-native";

const formatNumber = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

const Payment = ({ navigation, route }) => {
    const { idMotel, price } = route.params;
    const [user] = useContext(MyContext);
    const [fullName, setFullName] = useState(user.first_name + " " + user.last_name);
    const [amount, setAmount] = useState(price);
    const [phoneNumber, setPhoneNumber] = useState(user.phone);
    const [paymentMethods, setPaymentMethods] = useState({
        viDienTu: false,
        chuyenKhoan: false,
    });

    const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);

    const selectPaymentMethod = (method) => {
        if (method === "viDienTu") {
            setPaymentMethods({
                viDienTu: true,
                chuyenKhoan: false,
            });
            setPaymentMethodSelected(true);
        } else if (method === "chuyenKhoan") {
            setPaymentMethods({
                viDienTu: false,
                chuyenKhoan: true,
            });
            setPaymentMethodSelected(true);
        }
    };

    const handlePayment = async () => {
        if (!paymentMethodSelected) {
            Alert.alert("Thông báo", "Bạn cần chọn phương thức thanh toán!");
            return;
        }
        try {
            const token = await AsyncStorage.getItem("access-token");
            const formData = new FormData();
            formData.append("amount", amount);
            let res = await authApi(token).post(endpoints["vnpay"], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("API Response:", res.data); // Log toàn bộ response để kiểm tra

            if (res.data && res.data.payment_url) {
                console.log("URL:", res.data.payment_url);
                navigation.navigate("VnpayUI", { url: res.data.payment_url, idMotel: idMotel });
            } else {
                console.error("Payment URL not found in the response");
            }
        } catch (ex) {
            console.error("API call failed:", ex);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/green.jpg")}
                style={SearchStyle.backgroundImage}
            />
            <Text style={styles.title}>Thông Tin Thanh Toán</Text>
            <InputField label="Họ và tên" value={fullName} onChangeText={(text) => setFullName(text)} />
            <InputField label="Số điện thoại" value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)} />
            <InputField 
                label="Tiền cọc" 
                value={formatNumber(amount)} // Định dạng số tiền hiển thị
                onChangeText={(text) => setAmount(parseFloat(text.replace(/[^\d]/g, '')))} // Chuyển đổi lại giá trị sau khi người dùng nhập
            />

            <Text style={{ fontWeight: "bold", fontSize: 20, color: COLOR.PRIMARY }}> Phương thức thanh toán</Text>
            <TouchableOpacity 
                style={[styles.methodContainer, paymentMethods.viDienTu && { backgroundColor: "#c0e57b" }]} 
                onPress={() => selectPaymentMethod("viDienTu")}
            >
                <Image source={require("../../assets/images/momo.png")} style={styles.icon} />
                <Text style={styles.methodText}>Ví điện tử</Text>
                {paymentMethods.viDienTu && <Text style={{ marginLeft: 'auto', color: 'green' }}>✓</Text>}
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.methodContainer, paymentMethods.chuyenKhoan && { backgroundColor: "#c0e57b" }]} 
                onPress={() => selectPaymentMethod("chuyenKhoan")}
            >
                <Image source={require("../../assets/images/vnpay.png")} style={styles.icon} />
                <Text style={styles.methodText}>Chuyển khoản ngân hàng</Text>
                {paymentMethods.chuyenKhoan && <Text style={{ marginLeft: 'auto', color: 'green' }}>✓</Text>}
            </TouchableOpacity>

            <ButtonAuth title="Thanh toán" onPress={handlePayment} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color: COLOR.PRIMARY
    },
    methodContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        width: "80%",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 3,
        marginTop: 10,
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 20,
    },
    methodText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        paddingRight: 40,
    },
});

export default Payment;
