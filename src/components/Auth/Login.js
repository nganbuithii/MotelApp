import { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import React from "react";
import InputField from "../common/InputField";
import InputPassword from "../common/InputPassword";
import AuthStyles from "./AuthStyles";
import MyStyles from "../../Styles/MyStyles"
import ButtonAuth from "../common/ButtonAuth";
import MyContext from '../../configs/MyContext';
import axios from "axios";
import API from "../../configs/API";
import { endpoints, authApi } from "../../configs/API";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, dispatch] = React.useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const loginApp = async () => {
        setLoading(true);
        try {
            let header = {
                'Content-Type': 'application/x-www-form-urlencoded' // Change Content-Type
            };
            let data = {
                username: username,
                password: password,
                client_id: "8OdjuOvhjzLFCigIbuw3mbDAlhWTirzeM7s1W1g2",
                client_secret:
                    "8pj5yZzwnH0vN3hflMrJJ7QBENDCsMKfIUlGQ15Gyg9GPTRCFXsIxm7iiF7xmcPf2IOz5uIXmfD9TjXJI3mKWHIQQ1HStaY3duHkIrSc4GWJGcyg1ZQgKtYIOxRksXia",
                grant_type: "password",
            };
            let res = await API.post(endpoints["login"], data, { headers: header });
            console.log(res.data);
            // Lưu access token vào AsyncStorage
            await AsyncStorage.setItem("access-token", res.data.access_token);

            // Gửi yêu cầu GET để lấy thông tin người dùng
            let userRes = await authApi(res.data.access_token).get(endpoints["current_user"]);
            let userData = userRes.data;

            // Lưu thông tin người dùng vào Context hoặc State
            dispatch({
                type: "login",
                payload: userData,
            });

            // Điều hướng đến màn hình chính
            navigation.navigate("Home");

            console.log(userData); // Log thông tin người dùng
        } catch (ex) {
            console.error(ex);

        } finally {
            setLoading(false);
        }
    };



    return (
        <View style={MyStyles.container}>
            <Image
                source={require("../../assets/images/logoLogin.png")}
                style={{
                    width: 250,
                    height: 250,
                    alignSelf: "center",
                    marginBottom: 10,
                    marginTop: 40,
                }}
            />
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ alignItems: "center" }}
            >
                <View style={[AuthStyles.formContainer, AuthStyles.mt15, AuthStyles.flex]}>
                    <Text style={MyStyles.textHead}>ĐĂNG NHẬP TÀI KHOẢN</Text>
                    <InputField value={username} onChangeText={text => setUsername(text)} label="Tên đăng nhập" />
                    <InputPassword value={password} onChangeText={text => setPassword(text)} />


                    <Text style={AuthStyles.txtLeft}>Quên mật khẩu?</Text>

                    {loading ? (<ActivityIndicator />) : (
                        <ButtonAuth title="Đăng nhập" onPress={loginApp} />)}


                    <Text style={AuthStyles.mt15}>OR</Text>

                    <TouchableOpacity style={AuthStyles.mt15}>
                        <View style={[MyStyles.flex, AuthStyles.buttonGG]}>
                            <Image
                                source={require("../../assets/images/iconGG.png")}
                                style={AuthStyles.icon}
                            />
                            <Text style={MyStyles.textNormal}>Đăng nhập với google</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={[MyStyles.flex, MyStyles.mt20]}>
                        <Text style={MyStyles.textNormal2}>Bạn chưa có tài khoản?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={[MyStyles.textNormal2, MyStyles.link]} >
                                Tạo tài khoản
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
export default Login;
