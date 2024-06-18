import React, { useState } from 'react';
import { View, Text, TouchableOpacity,ScrollView, Image, Alert, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import MyStyles from '../../Styles/MyStyles';
import AuthStyles from './AuthStyles';
import ButtonAuth from '../common/ButtonAuth';
import { COLOR, SHADOWS } from '../common/color';
import InputField from '../common/InputField';
import InputPassword from '../common/InputPassword'
import CheckBox from '../common/CheckBox';
import { useRoute } from '@react-navigation/native';
// lưu role trước đó


const Register2 = ({ navigation }) => {
    const route = useRoute();
    const { role } = route.params;
    const [agree, setAgree] = useState();
    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phoneNumber: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phoneNumber: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: role, // Sử dụng giá trị role từ route.params
    });
    // Hàm kiểm tra định dạng email
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Hàm kiểm tra số điện thoại
    const isValidPhoneNumber = (phoneNumber) => {
        // Loại bỏ các ký tự không phải số
        const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
        // Kiểm tra xem số điện thoại có đủ 10 chữ số và bắt đầu bằng số 0 không
        return numericPhoneNumber.length === 10 && numericPhoneNumber.startsWith('0');
    };

    // Hàm kiểm tra mật khẩu
    const isValidPassword = (password) => {
        // Biểu thức chính quy kiểm tra mật khẩu
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };
    const passwordsMatch = (password, confirmPassword) => {
        return password === confirmPassword;
    };
    const handleRegister = () => {
        const newErrors = {};
        try{
            const newErrors = {};
            // Kiểm tra từng trường và gán thông báo lỗi tương ứng
            if (!user.firstName) {
                newErrors.firstName = "Vui lòng nhập họ của bạn";
            }
            if (!user.lastName) {
                newErrors.lastName = "Vui lòng nhập tên của bạn";
            }
            if (!user.gender) {
                newErrors.gender = "Vui lòng chọn giới tính";
            }
            if (!user.email) {
                newErrors.email = "Vui lòng nhập email";
            } else if (!isValidEmail(user.email)) {
                newErrors.email = 'Email không hợp lệ';
            }
            if (!user.phoneNumber) {
                newErrors.phoneNumber = "Vui lòng nhập số điện thoại";
            } else if (!isValidPhoneNumber(user.phoneNumber)) {
                newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
            }
            if (!user.username) {
                newErrors.username = "Vui lòng nhập tên đăng nhập";
            }
            if (!user.password) {
                newErrors.password = "Vui lòng nhập mật khẩu";
            } else if (!isValidPassword(user.password)) {
                newErrors.password = "Mật khẩu không mạnh."
                newErrors.password ="Mật khẩu phải chứa chữ hoa, chữ thường, kí tự và số"
            }
            if (!user.confirmPassword) {
                newErrors.confirmPassword = "Vui lòng nhập mật khẩu";
            } else if (!passwordsMatch(user.password, user.confirmPassword)) {
                newErrors.confirmPassword = 'Mật khẩu không khớp';
            }
            
            setError(newErrors);
            if (Object.keys(newErrors).length === 0 && !agree) {
                // Nếu không có lỗi và chưa đồng ý điều khoản, hiển thị cảnh báo
                Alert.alert("Cảnh báo", "Bạn chưa đồng ý với Điều khoản & Chính sách");
                return;
            }
            else if(Object.keys(newErrors).length === 0 && agree){
                navigation.navigate("UploadImg", { user });
                console.log(user)
            }
        }catch(ex)
        {
            // console.error(ex);
            Alert.alert("Lỗi","Lỗi up ảnh");
        }
    }

    // Hàm để cập nhật formData khi người dùng thay đổi giá trị trên các trường nhập liệu
    const handleChangeText = (field, value) => {
        setUser(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };
    //Điều khoản
    const handleCheckBox = () => {
        setAgree(!agree); // Toggle checkbox state
    };
    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.containerRg2}>
                <Text style={AuthStyles.textHead2} >Tạo mới tài khoản</Text>

                {error.firstName && <Text style={styles.errorMsg}>{error.firstName}</Text>}
                <InputField  label="Họ của bạn" onChangeText={text => handleChangeText('firstName', text)} />

                {error.lastName && <Text style={styles.errorMsg}>{error.lastName}</Text>}
                <InputField  label="Tên của bạn" onChangeText={text => handleChangeText('lastName', text)}/>

                {error.gender && <Text style={styles.errorMsg}>{error.gender}</Text>}
                <View style={MyStyles.flex}>
                    <Text style={AuthStyles.text}> Giới tính</Text>
                    <RadioButton.Item 
                        theme={{ colors: { primary: COLOR.finally}}}
                        label="Nữ" 
                        value="FEMALE" 
                        status={user.gender === 'FEMALE' ? 'checked' : 'unchecked'} // Sử dụng giá trị của trạng thái giới tính
                        onPress={() => handleChangeText('gender', 'FEMALE')} // Cập nhật trạng thái giới tính khi người dùng chọn giới tính
                    />
                    <RadioButton.Item 
                        theme={{ colors: { primary: COLOR.finally}}}
                        label="Nam" 
                        value="MALE" 
                        status={user.gender === 'MALE' ? 'checked' : 'unchecked'}
                        onPress={() => handleChangeText('gender', 'MALE')}
                    />
                </View>

                {error.email && <Text style={styles.errorMsg}>{error.email}</Text>}
                <InputField label="Email" onChangeText={text => handleChangeText('email', text)}/>

                {error.phoneNumber && <Text style={styles.errorMsg}>{error.phoneNumber}</Text>}
                <InputField  label="Số điện thoại" onChangeText={text => handleChangeText('phoneNumber', text)}/>

                {error.username && <Text style={styles.errorMsg}>{error.username}</Text>}
                <InputField label="Tên đăng nhập" onChangeText={text => handleChangeText('username', text)}/>

                {error.password && <Text style={styles.errorMsg}>{error.password}</Text>}
                <InputPassword title="Mật khẩu" onChangeText={text => handleChangeText('password', text)}/>

                {error.confirmPassword && <Text style={styles.errorMsg}>{error.confirmPassword}</Text>}
                <InputPassword title="Xác nhận mật khẩu" onChangeText={text => handleChangeText('confirmPassword', text)}/>

                <View style={[MyStyles.flex, MyStyles.mt20]}>
                <CheckBox value={agree} onPress={handleCheckBox} />
                    <Text style={MyStyles.textNormal2}>Bạn đồng ý với </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("TermService")}>
                        <Text style={[MyStyles.textNormal2, MyStyles.link]}>
                            Điều khoản & Chính sách
                        </Text>
                    </TouchableOpacity>
                </View>
                <ButtonAuth onPress={handleRegister} title="Đăng kí"/>
                
                <View style={[MyStyles.flex, MyStyles.mt20]}>
                    <Text style={MyStyles.textNormal2}>Bạn đã có tài khoản?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={[MyStyles.textNormal2, MyStyles.link]}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
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
        
    },
    errorMsg:{
        fontWeight:"300",
        color:"red",
        fontSize:10,
        textAlign:"left"
    }
})


export default Register2;
