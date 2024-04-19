import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLOR, SHADOWS } from '../common/color';
import ButtonAuth from '../common/ButtonAuth';
import MyContext from '../../configs/MyContext';
import { Dialog, Portal } from 'react-native-paper';
import API, { authApi, endpoints } from '../../configs/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import MyStyles from '../../Styles/MyStyles';


const ProfileDetail = () => {
    const [user, dispatch] = useContext(MyContext);
    
    const [upuser, setUpuser] = useState(user);
    const [dialog, setDialog] = useState(false);
    const [image, setImage] = useState(null);
    const [avatar, setAvatar] = useState(user.avatar);
    const [loading, setLoading] = useState(null);
    const [lastname, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [phoneNumber, setPhoneNumber] = useState(user.phone);
    const [isInfoChanged, setIsInfoChanged] = useState(false); // Thêm state để kiểm tra xem thông tin có thay đổi hay không
    const checkForCameraRollPermission = async () => {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert(
                "Please grant camera roll permissions inside your system's settings"
            );
        } else {
            console.log("Media Permissions are granted");
        }
    };

    useEffect(() => {
        checkForCameraRollPermission();
    }, []);
    const addImage = async () => {
        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(JSON.stringify(image));
        if (!image.canceled) {
            setImage(image.assets[0].uri);
            setAvatar({ uri: image.assets[0].uri });

        }
    };
    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Thông tin của bạn đã được cập nhật.',
            visibilityTime: 5000, // Thời gian tồn tại của toast (milliseconds)
            autoHide: true, // Tự động ẩn toast sau khi hết thời gian tồn tại
        });
    }
    const handleUpdate = async () => {
        const isInfoChanged = lastname !== user.last_name || username !== user.username || email !== user.email || phoneNumber !== user.phone || image !== null;

        if (!isInfoChanged) {
            Alert.alert('Thông báo', 'Không có thông tin để cập nhật');
            return;
        }
        try {
            // Xây dựng object chứa thông tin cập nhật
            const formData = new FormData();
            formData.append('last_name', lastname);
            formData.append('username', username);
            formData.append('email', email);
            formData.append('phone', phoneNumber);
            if (image) {
                const uriParts = image.split('.');
                const fileType = uriParts[uriParts.length - 1];
                const avatar = {
                    uri: image,
                    name: `avatar.${fileType}`,
                    type: `image/${fileType}`,
                };
                formData.append('avatar', avatar);
            }
            let token = await AsyncStorage.getItem("access-token");
            console.log(token);
            console.log(user.id);
            let res = await authApi(token).patch(endpoints['updateUser'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // setLoading(true);
            console.log("RESDATA", res.data);
            setDialog(true);
            // Cập nhật thông tin người dùng toàn cục
            dispatch({ type: 'update_user', payload: res.data });
            // Hiển thị toast khi cập nhật thành công
            showToast();
        } catch (ex) {
            Alert.alert("Lỗi", "Lỗi cập nhật thông tin hồ sơ!")
            console.error(ex);
        }
    }

    // // Sử dụng useEffect để theo dõi sự thay đổi của thông tin người dùng toàn cục
    // useEffect(() => {
    //     setIsInfoChanged(lastname !== '' || username !== '' || email !== '' || phoneNumber !== '');
    // }, [lastname, username, email, phoneNumber]);

    return (
        <View style={styles.containerDetail}>

            <Image
                source={require('../../assets/images/5.jpg')} // Sử dụng ảnh mới nếu có, nếu không sử dụng avatar, nếu không có avatar sử dụng ảnh mặc định
                style={styles.imgBg}
            />

            <View style={styles.containerAvt}>
                <TouchableOpacity onPress={addImage} >
                    <Image
                        source={image ? { uri: image } : avatar ? { uri: avatar } : require('../../assets/images/avt.png')} // Sử dụng ảnh mới nếu có, nếu không sử dụng avatar, nếu không có avatar sử dụng ảnh mặc định
                        style={styles.avatar}
                    />
                    <AntDesign name="camera" style={styles.iconCam} size={20} color={COLOR.PRIMARY} />
                </TouchableOpacity>
                <Text style={{textAlign:"center", color:"green", fontSize:20, fontWeight:"500"}}>{user.username}</Text>
            </View>


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
            {loading ? (<ActivityIndicator />) : (
                <ButtonAuth onPress={handleUpdate} title="Lưu thay đổi" />)}
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
        backgroundColor: "#fff",
        position:"relative"
    },
    avatar: {
        width: 120,
        height: 120,
        marginBottom: 5,
        borderRadius: 100, // Đặt borderRadius thành nửa chiều rộng (200 / 2 = 100)
        borderWidth: 5,
        borderColor:"#fff",
        // position: 'relative',
        // aspectRatio: 1, // Đảm bảo tỷ lệ khung hình là 1:1
    },
    inputContainer: {
        marginBottom: 10,
        width: '100%',
        ...SHADOWS.medium
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: COLOR.input_default
    },
    inputDetail: {
        height: 40,
        borderColor: "gray",
        borderWidth: 0.3,
        paddingVertical:10,
        paddingHorizontal:10,
        borderRadius: 5,
        width: '100%',
        fontSize:16,
        color:"gray",
        
    },
    iconCam: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        color: "black",
        backgroundColor:"#fff",
        borderRadius:50,
        padding:3
    },
    badgeContainer: {
        backgroundColor: COLOR.offWhite, // Màu nền của badge
        borderRadius: 20, // Độ cong của badge
        // marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        padding: 5,
        width: 140,
        // borderColor:COLOR.color4,
        // borderWidth: 1, // Độ dày của viền
        ...SHADOWS.medium,
        flexDirection: "row"

    },
    badgeText: {
        color: "black", // Màu chữ của badge
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 10
    },
    badgeLabel: {
        color: COLOR.color12, // Màu chữ của badge
        // fontWeight: 'bold',
        fontSize: 12
    },
    imgBg: {
        width: "100%",
        height: 100,
        opacity: 0.3,
        // position:"relative"
    },
    containerAvt:{
    // position:"absolute",
    // top:30
    top:-60,
    flexDirection:"column"

    }
});


export default ProfileDetail;
