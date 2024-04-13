import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import MyStyles from '../../Styles/MyStyles';
import AuthStyles from './AuthStyles';
import ButtonAuth from '../common/ButtonAuth';
import { COLOR, SHADOWS } from '../common/color';
import InputField from '../common/InputField';
import InputPassword from '../common/InputPassword'
import CheckBox from '../common/CheckBox';

const Register2 = ({ navigation }) => {


    return (
        <View style={MyStyles.container}> 
            <View style={styles.containerRg2}>
                <Text style={AuthStyles.textHead2} >Tạo mới tài khoản</Text>
                
                <InputField  label="Họ của bạn"/>
                <InputField  label="Tên của bạn"/>
                <View style={MyStyles.flex}>
                    <Text style={AuthStyles.text}> Giới tính</Text>
                    <RadioButton.Item 
                        theme={{ colors: { primary: COLOR.finally}}}
                        label="Nữ" 
                        value="Nữ" 
                        status={"checked"} 
                    />
                    <RadioButton.Item 
                        theme={{ colors: { primary: COLOR.finally}}}
                        label="Nam" 
                        value="Nam" 
                    />
                </View>
                <InputField label="Email"/>
                <InputField  label="Số điện thoại"/>
                <InputField label="Tên đăng nhập"/>
                <InputPassword title="Mật khẩu"/>
                <InputPassword title="Xác nhận mật khẩu"/>
                <View style={[MyStyles.flex, MyStyles.mt20]}>
                    <CheckBox />
                    <Text style={MyStyles.textNormal2}>Bạn đồng ý với </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("TermService")}>
                        <Text style={[MyStyles.textNormal2, MyStyles.link]}>
                            Điều khoản & Chính sách
                        </Text>
                    </TouchableOpacity>
                </View>
                <ButtonAuth onPress={() => navigation.navigate("UploadImg")} title="Đăng kí"/>
                
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

const styles= StyleSheet.create({
    containerRg2:{
        paddingHorizontal:30,
        paddingVertical:20,
        width:'92%',
        marginTop:30,
        borderRadius:10,
        marginBottom:30,
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:COLOR.offWhite,
        ...SHADOWS.medium,
        
    }
})


export default Register2;
