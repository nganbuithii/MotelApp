import { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import InputField from "../common/InputField";
import InputPassword from "../common/InputPassword";
import AuthStyles from "./AuthStyles";
import MyStyles from "../../Styles/MyStyles"
import ButtonAuth from "../common/ButtonAuth";
// import { IconButton } from "react-native-paper";
// import Icon from 'react-native-vector-icons/FontAwesome';

const Login = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useStateState('');

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
                <InputField label="Email"/>
                <InputPassword />
                <ButtonAuth title="Đăng nhập" />

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
                    <TouchableOpacity>
                    <Text style={[MyStyles.textNormal2, MyStyles.link]}>
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