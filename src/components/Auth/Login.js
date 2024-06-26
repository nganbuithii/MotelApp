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
import { COLOR } from "../common/color";
import PostStyle from "../Tenant/PostStyle";
import { Ionicons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, dispatch] = React.useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [hasMotel, setHasMotel] = useState(false);
    const [nameErr, setNameErr] = useState("");
    const [passErr, setPassErr] = useState("");
    const checkPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const loginApp = async () => {

        if (!username) { setNameErr("Vui lòng nhập username"); } else { setNameErr(""); }
        if (!password) { setPassErr("Vui lòng nhập password"); return; } else { setPassErr(""); }
        // if (password.length < 8) { setPassErr("Mật khẩu phải có ít nhất 8 ký tự"); return; } else { setPassErr(""); }

        // Kiểm tra mật khẩu theo regex
        // if (!checkPassword(password)) { setPassErr("Mật khẩu không phù hợp yêu cầu "); return; }
        // else { setPassErr(""); }
        if (username && password) {
            try {
                setLoading(true);
                let header = {
                    'Content-Type': 'application/x-www-form-urlencoded' // Change Content-Type
                };
                let data = {
                    username: username,
                    password: password,
                    // username: "Nganbui",
                    // password: "Meomeo@123",
                    // username:"ngan",
                    // password:"123456",
                    // username:"M",
                    // password:"Meomeo@123",
                    client_id: "8OdjuOvhjzLFCigIbuw3mbDAlhWTirzeM7s1W1g2",
                    client_secret:
                        "8pj5yZzwnH0vN3hflMrJJ7QBENDCsMKfIUlGQ15Gyg9GPTRCFXsIxm7iiF7xmcPf2IOz5uIXmfD9TjXJI3mKWHIQQ1HStaY3duHkIrSc4GWJGcyg1ZQgKtYIOxRksXia",
                    grant_type: "password",
                };
                let res = await API.post(endpoints["login"], data, { headers: header });
                console.log(res.data);
                await AsyncStorage.setItem("access-token", res.data.access_token);
                let userRes = await authApi(res.data.access_token).get(endpoints["current_user"]);
                let userData = userRes.data;

                // Lưu thông tin người dùng vào Context hoặc State
                dispatch({
                    type: "login",
                    payload: userData,
                });

                // Gọi hàm kiểm tra nhà trọ của người dùng và chờ đợi kết quả
                const hasMotelData = await checkMotel(userData.id);
                console.log("hasmotel:", hasMotelData);
                console.log("role", userData.user_role);

                if (userData.user_role === "TENANT") {
                    navigation.navigate("Home");
                } else {
                    let targetScreen = hasMotelData ? 'Home' : 'RegisterMotel';
                    navigation.navigate(targetScreen);
                }

                console.log(userData);
                setUsername("");
                setPassword("");
            } catch (error) {
                setLoading(false);

                if (error.response) {
                    let errorMessage = error.response.data.error_description || 'Lỗi đăng nhập. Vui lòng thử lại sau.';
                    Alert.alert('Lỗi', errorMessage);
                }
            } finally {
                setLoading(false);
            }
        }

    };

    // Hàm kiểm tra xem người dùng có nhà trọ hay không
    const checkMotel = async (userId) => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            if (!token) {
                throw new Error("Access token not found");
            }
            console.log(userId);
            let response = await authApi(token).get(endpoints['detailMotelOwner'](userId));
            console.log("MOtels ban đầu:", response.data);
            const hasMotelData = response.data && response.data.length > 0;
            setHasMotel(hasMotelData);
            console.log("motelS:", hasMotelData);
            // Lưu dữ liệu trọ vào AsyncStorage
            await AsyncStorage.setItem("motels", JSON.stringify(response.data));
            // Trả về giá trị kết quả
            return hasMotelData;
        } catch (error) {
            // console.error('Error checking motel owner:', error);
            // Trả về false nếu có lỗi xảy ra hoặc người dùng không có nhà trọ
            Alert.alert("Lỗi","Lỗi kiểm tra" );
            setHasMotel(false);
            return false;
        }
    }

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
                    {!!nameErr && <Text style={PostStyle.errorText}><Ionicons name="warning" size={12} color="red" />{nameErr}</Text>}
                    <InputField value={username} onChangeText={text => setUsername(text)} label="Tên đăng nhập" />
                    {!!passErr && <Text style={PostStyle.errorText}><Ionicons name="warning" size={12} color="red" />{passErr}</Text>}
                    <InputPassword value={password} onChangeText={text => setPassword(text)} />


                    {/* <Text style={AuthStyles.txtLeft}>Quên mật khẩu?</Text> */}

                    {loading ? (<ActivityIndicator color={COLOR.PRIMARY} />) : (
                        <ButtonAuth title="Đăng nhập" onPress={loginApp} />)}


                    <Text style={AuthStyles.mt15}>OR</Text>

                    <TouchableOpacity style={AuthStyles.mt15} onPress={()=> navigation.navigate("AdminView")}>
                        <View style={[MyStyles.flex, AuthStyles.buttonGG]}>
                            <Image
                                source={require("../../assets/images/admin.jpg")}
                                style={AuthStyles.icon}
                            />
                            <Text style={MyStyles.textNormal}>Đăng nhập với admin</Text>
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
