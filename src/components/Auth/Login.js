import { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import InputField from "../common/InputField";
import InputPassword from "../common/InputPassword";
import AuthStyles from "./AuthStyles";
import MyStyles from "../../Styles/MyStyles"
import ButtonAuth from "../common/ButtonAuth";
import MyContext from '../../configs/MyContext';
import axios from "axios";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, dispatch] = React.useContext(MyContext);

    // Xử lý đăng nhập
    // const login = async () => {
    //     try {
    //         const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
    //             username: "admin",
    //             password: "123",
    //             // Thêm các thông tin khác nếu cần (ví dụ: grant_type, client_id, client_secret)
    //         });
    //         // Nếu đăng nhập thành công, lưu thông tin user vào context và chuyển về trang Home
    //         if (response.data.access_token) {
    //             dispatch({
    //                 type: "login",
    //                 payload: {
    //                     username: username
    //                 }
    //             });
    //             navigation.navigate("Home");
    //         } else {
    //             // Xử lý trường hợp đăng nhập thất bại (ví dụ: hiển thị thông báo lỗi)
    //             console.error("Đăng nhập thất bại:", response.data);
    //         }
    //     } catch (error) {
    //         // Xử lý lỗi từ việc gửi yêu cầu đăng nhập
    //         console.error("Lỗi đăng nhập:", error);
    //     }
    // }

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
                    <InputField value={username} onChangeText={t => setUsername(t)} label="Tên đăng nhập" />
                    <InputPassword value={password} onChangeText={t => setPassword(t)} />

                    <Text style={AuthStyles.txtLeft}>Quên mật khẩu?</Text>

                    <ButtonAuth title="Đăng nhập" onPress={() => navigation.navigate("Home")} />

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
