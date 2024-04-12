import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import MyStyles from '../../Styles/MyStyles';
import AuthStyles from './AuthStyles';
import ButtonAuth from '../common/ButtonAuth';
import { COLOR } from '../common/color';
const Register = ({ navigation }) => {
    const [selectedRole, setSelectedRole] = useState(null);

    const handleNextPress = () => {
        if (!selectedRole) {
            Alert.alert('Error', 'Please select your role.');
            return;
        }

        navigation.navigate('Step2', { role: selectedRole });
    };

    return (
        <View style={[MyStyles.container]}>
            <Image
            source={require("../../assets/images/helo.gif")}
            style={{
            width: 340,
            height: 300,
            alignSelf: "center",
            marginBottom: 10,
            marginTop: 40,
            }}
        />
            <View style={[AuthStyles.mt15,AuthStyles.containerRegister]}>
                <Text style={AuthStyles.textHead}> BẠN LÀ AI ?</Text>
                <Text style={MyStyles.txtCenter}> Chọn loại người dùng phù hợp để có trải nghiệm tốt nhất với 
                    <Text style={MyStyles.textSmall}> NaCaMotel</Text></Text>

                <View style={[MyStyles.flex, MyStyles.mt20]}>
                    <RadioButton.Item 
                        theme={{ colors: { primary: COLOR.finally}}}
                        status={selectedRole === "Chủ nhà trọ" ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedRole("Chủ nhà trọ")}
                        label="Chủ nhà trọ" 
                        value="Chủ nhà trọ" 
                    />
                    <RadioButton.Item 
                        theme={{ colors: { primary: COLOR.finally}}}
                        label="Người thuê nhà" 
                        value="Người thuê nhà" 
                        status={selectedRole === "Người thuê nhà" ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedRole("Người thuê nhà")}
                    />

                </View>

                <ButtonAuth title="Tiếp tục" />
                <View style={[MyStyles.flex, MyStyles.mt20]}>
                    <Text style={MyStyles.textNormal2}>Bạn đã có tài khoản?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={[MyStyles.textNormal2, MyStyles.link]}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    );
};




export default Register;
