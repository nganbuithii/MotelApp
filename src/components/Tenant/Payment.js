import React, { useContext, useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import InputField from "../common/InputField";
import ButtonAuth from "../common/ButtonAuth";
import SearchStyle from "../../Styles/SearchStyle";
import { COLOR } from "../common/color";
import MyContext from "../../configs/MyContext";
import * as Location from 'expo-location';
import axios from 'axios';

const Payment = () => {
    const [user] = useContext(MyContext);
    const [fullName, setFullName] = useState(user.first_name + " " + user.last_name);
    const [amount, setAmount] = useState("1000000");
    const [phoneNumber, setPhoneNumber] = useState(user.phone);
    const [paymentMethod, setPaymentMethod] = useState("");


    const handlePayment = () => {
        // Xử lý thanh toán ở đây
        console.log("Họ tên:", fullName);
        console.log("Số tiền:", amount);
        console.log("Số điện thoại:", phoneNumber);
        console.log("Phương thức thanh toán:", paymentMethod);

    };


    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/green.jpg")}
                style={SearchStyle.backgroundImage}
            />
            <Text style={styles.title}>Thông Tin Thanh Toán</Text>
            <InputField label="Họ và tên" value={fullName}
                onChangeText={(text) => setFullName(text)} />
            <InputField label="Số điện thoại" value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)} />
            <InputField label="Tiền cọc" value={amount}
                onChangeText={(text) => setAmount(text)} />

            <Text style={{ fontWeight: "bold", fontSize: 20, color: COLOR.PRIMARY }}> Phương thức thanh toán</Text>
            <TouchableOpacity style={styles.methodContainer} onPress={() => setPaymentMethod("Ví điện tử")}>
                <Image source={require("../../assets/images/momo.png")} style={styles.icon} />
                <Text style={styles.methodText}>Ví điện tử</Text>
            </TouchableOpacity>
            <Text> Hoặc</Text>
            <TouchableOpacity style={styles.methodContainer} onPress={() => setPaymentMethod("Chuyển khoản ngân hàng")}>
                <Image source={require("../../assets/images/vnpay.png")} style={styles.icon} />
                <Text style={styles.methodText}>Chuyển khoản ngân hàng</Text>
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
        // paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color: COLOR.PRIMARY
    },
    inputContainer: {
        width: "80%",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: "#333",
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
    button: {
        backgroundColor: "#4285F4",
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    locationText: {
        marginTop: 20,
        fontSize: 16,
        color: "#333",
    },
    addressText: {
        marginTop: 10,
        fontSize: 16,
        color: "#333",
    }
});

export default Payment;
