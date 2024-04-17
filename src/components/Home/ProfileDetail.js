import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLOR, SHADOWS } from '../common/color';
import ButtonAuth from '../common/ButtonAuth';
import MyContext from '../../configs/MyContext';
import API, { authApi, endpoints } from '../../configs/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import MyStyles from '../../Styles/MyStyles';

const ProfileDetail = () => {
    const [user, dispatch] = useContext(MyContext);

    const [upuser, setUpuser] = useState(user);
    const [image, setImage] = useState(null);
    const [avatar, setAvatar] = useState(user.avatar ? { uri: user.avatar } : require('../../assets/images/avt.png'));

    const [lastname, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [phoneNumber, setPhoneNumber] = useState(user.phone);
    const [isInfoChanged, setIsInfoChanged] = useState(false); // Thêm state để kiểm tra xem thông tin có thay đổi hay không
    useEffect(() => {
        // Kiểm tra quyền truy cập thư viện ảnh khi component được render lần đầu tiên
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Quyền truy cập thư viện ảnh bị từ chối!');
            }
        })();
    }, []); // Mảng phụ thuộc rỗng đảm bảo useEffect chỉ chạy một lần khi component được render lần đầu tiên

    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(JSON.stringify(_image));
        if (!_image.canceled) {
            setImage(_image.uri);
        }
    };

    const handleUpdate = async () => {
        try {
            // Xây dựng object chứa thông tin cập nhật
            const updateData = {
                name: lastname,
                email: email,
                username: username,
                phone: phoneNumber,
                // Trong trường hợp image đã được chọn, truyền uri của hình ảnh
            };
            let token = await AsyncStorage.getItem("access-token");
            console.log(token);
            console.log(user.id);
            let res = await authApi(token).patch(endpoints['update_user'](user.id), updateData);

            console.log("RESDATA", res.data);
            // Cập nhật thông tin người dùng toàn cục
            dispatch({ type: 'update_user', payload: res.data });
        } catch (ex) {
            Alert.alert("Lỗi", "Lỗi cập nhật thông tin hồ sơ!")
            console.error(ex);
        }
    }

    // Sử dụng useEffect để theo dõi sự thay đổi của thông tin người dùng toàn cục
    useEffect(() => {
        setUpuser(user);
        // Cập nhật giá trị cho các ô input dựa trên thông tin người dùng toàn cục mới
        setLastName(user.last_name);
        setEmail(user.email);
        setUsername(user.username);
        setPhoneNumber(user.phone);
    }, [user]);

    return (
        <View style={styles.containerDetail}>
            
                <TouchableOpacity onPress={addImage} >
                    <Image
                        source={image ? { uri: image } : avatar}
                        style={styles.avatar}
                    />
                    <AntDesign name="camera" style={styles.iconCam} size={35} color={COLOR.PRIMARY} />
                </TouchableOpacity>
                
                <View style={MyStyles.flex}>
                    <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{user.follower_count}</Text>
                    <Text style={styles.badgeLabel}>Người theo dõi</Text>
                </View>
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{user.following_count}</Text>
                    <Text style={styles.badgeLabel}>Đang theo dõi</Text>
                </View>
                </View>
                

        

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tên</Text>
                <TextInput

                    style={styles.inputDetail}
                    value={lastname}
                    onChangeText={(text) => setLastName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput

                    style={styles.inputDetail}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.inputDetail}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                    style={styles.inputDetail}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                />
            </View>
            <ButtonAuth onPress={handleUpdate} title="Lưu thay đổi" />
        </View>
    );
};

const styles = StyleSheet.create({
    containerDetail: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        width: '100%',
        backgroundColor: "#FFF"
    },
    avatar: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 100, // Đặt borderRadius thành nửa chiều rộng (200 / 2 = 100)
        borderWidth: 10,
        borderColor: COLOR.color3,
        position: 'relative',
        aspectRatio: 1, // Đảm bảo tỷ lệ khung hình là 1:1
    },
    inputContainer: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: COLOR.PRIMARY
    },
    inputDetail: {
        height: 40,
        borderColor: COLOR.PRIMARY,
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        width: '100%',
    },
    iconCam: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        color: COLOR.PRIMARY,
    },
    badgeContainer: {
        backgroundColor: COLOR.offWhite, // Màu nền của badge
        borderRadius: 20, // Độ cong của badge
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:20,
        padding:5,
        width:"40%",
        // borderColor:COLOR.color4,
        // borderWidth: 1, // Độ dày của viền
        ...SHADOWS.medium,
        flexDirection:"row"
        
    },
    badgeText: {
        color: "black", // Màu chữ của badge
        fontWeight: 'bold',
        fontSize:20,
        marginRight:10
    },
    badgeLabel: {
        color: COLOR.color12, // Màu chữ của badge
        // fontWeight: 'bold',
        fontSize:12
    },
});


export default ProfileDetail;
