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
import showToast from '../common/ToastMessage';
import Modal from 'react-native-modalbox';
import InputField from '../common/InputField';
import PostStyle from '../Tenant/PostStyle';

import { FlatList } from 'react-native-gesture-handler';


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
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [follower, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);
    // const [isInfoChanged, setIsInfoChanged] = useState(false); // Thêm state để kiểm tra xem thông tin có thay đổi hay không
    const checkForCameraRollPermission = async () => {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            // alert(
            //     "Please grant camera roll permissions inside your system's settings"
            // );
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
            showToast({ type: "success", text1: "Thành công", text2: "Cập nhật thông tin thành công " });
            // showToast();
        } catch (ex) {
            Alert.alert("Lỗi", "Lỗi cập nhật thông tin hồ sơ!")
            console.error(ex);
        }
    }
    const getFollow = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            let res = await authApi(token).get(endpoints["getFollower"](user.id));
            console.log(res.data);
            console.log(token);
            setFollower(res.data);
            setModalVisible1(true);
        } catch (ex) {
            console.error(ex);
        }
    }
    const unFollow = async (id) => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            await authApi(token).post(endpoints["follow"](id));
            console.log("Hủy follow");
            getFollowing();
            dispatch({ type: 'update_user', payload: { ...user, following_count: user.following_count - 1 } }); // Cập nhật số người đang theo dõi

        } catch (EX) {
            console.error(EX);
        }
    }

    const getFollowing = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            let res = await authApi(token).get(endpoints["getFollowing"](user.id));
            console.log("FOLLOWWING", res.data);
            setFollowing(res.data);
            setModalVisible(true);
        } catch (ex) {
            console.error(ex);
        }
    }
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            {following.length > 0 ? (
                <>
                    <Image
                        source={{ uri: item.avatar }}
                        style={styles.avatarMd}
                    />
                    <Text style={styles.usernameMd}>{item.username}</Text>
                    <TouchableOpacity onPress={() => unFollow(item.id)} style={styles.unfollowButton}>
                        <Text style={{ color: "#fff" }}>Hủy Follow</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.noFollowText}>Bạn chưa theo dõi ai</Text>

            )}
        </View>
    );
    const renderItem1 = ({ item }) => (
        <View style={styles.itemContainer}>
            {follower.length > 0 ? (
                <>
                    <Image
                        source={{ uri: item.avatar }}
                        style={styles.avatarMd}
                    />
                    <Text style={styles.usernameMd}>{item.username}</Text>
                    {/* <TouchableOpacity onPress={() => unFollow(item.id)} style={styles.unfollowButton}>
                        <Text style={{ color: "#fff" }}>Hủy Follow</Text>
                    </TouchableOpacity> */}
                </>
            ) : (
                <Text style={styles.noFollowText}>Bạn chưa theo dõi ai</Text>

            )}
        </View>
    );

    return (
        <View style={styles.containerDetail}>
             <Image
                source={require("../../assets/images/green.jpg")}
                style={[PostStyle.backgroundImage,{opacity: 0.3,}]}
            />
            <Image
                source={image ? { uri: image } : avatar ? { uri: avatar } : require('../../assets/images/avt.png')} // Sử dụng ảnh mới nếu có, nếu không sử dụng avatar, nếu không có avatar sử dụng ảnh mặc định
                style={[styles.imgBg,{opacity: 0.5}]}
            />
            <View style={styles.containerAvt}>
                <TouchableOpacity onPress={addImage} >
                    <Image
                        source={image ? { uri: image } : avatar ? { uri: avatar } : require('../../assets/images/avt.png')} // Sử dụng ảnh mới nếu có, nếu không sử dụng avatar, nếu không có avatar sử dụng ảnh mặc định
                        style={styles.avatar}
                    />
                    <AntDesign name="camera" style={styles.iconCam} size={20} color={COLOR.PRIMARY} />
                </TouchableOpacity>
                <Text style={{ textAlign: "center", color: "green", fontSize: 20, fontWeight: "500" }}>{user.username}</Text>
            </View>


            <View style={[MyStyles.flex, {marginBottom:15}]}>
                <TouchableOpacity style={styles.badgeContainer} onPress={getFollow}>
                    <Text style={styles.badgeText}>{user.follower_count}</Text>
                    <Text style={styles.badgeLabel}>Người theo dõi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.badgeContainer} onPress={getFollowing} >
                    <Text style={styles.badgeText}>{user.following_count}</Text>
                    <Text style={styles.badgeLabel}>Đang theo dõi</Text>
                </TouchableOpacity>
            </View>
            <Modal
                style={[styles.modal, styles.centralModal]}
                isOpen={modalVisible}
                onClosed={() => setModalVisible(false)}
                position={"center"}
                backdropPressToClose={true}
            >
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                        <AntDesign name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Danh sách người đang theo dõi</Text>
                    <FlatList
                        data={following}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </Modal>
            <Modal
                style={[styles.modal, styles.centralModal]}
                isOpen={modalVisible1}
                onClosed={() => setModalVisible(false)}
                position={"center"}
                backdropPressToClose={true}
            >
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={() => setModalVisible1(false)} style={styles.closeButton}>
                        <AntDesign name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Danh sách người theo dõi</Text>
                    <FlatList
                        data={follower}
                        renderItem={renderItem1}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </Modal>

            <View style={styles.inputContainer}>
                <InputField  label="Tên" value={lastname}
                    onChangeText={(text) => setLastName(text)}/>
            </View>
            <View style={styles.inputContainer}>
                <InputField label="Username" 
                value={username}
                onChangeText={(text) => setUsername(text)}/>
            </View>
            <View style={styles.inputContainer}>
            <InputField label="Email" 
                value={email}
                onChangeText={(text) => setEmail(text)}/>
            </View>
            <View style={styles.inputContainer}>
            <InputField label="Số điện thoại" 
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}/>
            </View>
            {loading ? (<ActivityIndicator />) : (
                
                <ButtonAuth onPress={handleUpdate} title="Lưu thay đổi" />)}
        </View>
    );
};

const styles = StyleSheet.create({
    containerDetail: {
        flex: 1,
        alignItems: 'center', // Căn giữa theo chiều ngang
        justifyContent: 'center', // Căn giữa theo chiều dọc
        width: '100%',
        backgroundColor: "#fff",
        position: "relative",
    },
    inputContainer: {
        width: '80%', // Đảm bảo input chiếm 80% chiều ngang màn hình
        marginBottom: 15,
        ...SHADOWS.medium,
    },
    avatar: {
        width: 120,
        height: 120,
        marginBottom: 5,
        borderRadius: 100, // Đặt borderRadius thành nửa chiều rộng (200 / 2 = 100)
        borderWidth: 5,
        borderColor: "#fff",
        // position: 'relative',
        // aspectRatio: 1, // Đảm bảo tỷ lệ khung hình là 1:1
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
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '100%',
        fontSize: 16,
        color: "gray",

    },
    iconCam: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        color: "black",
        backgroundColor: "#fff",
        borderRadius: 50,
        padding: 3
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
        height: 120,
        opacity: 0.3,
    },
    containerAvt: {
        top: -60,
        flexDirection: "column"

    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Để các phần tử nằm ngang và đều nhau
        marginBottom: 10, // Thay đổi khoảng cách giữa các mục nếu cần
        paddingHorizontal: 20, // Thay đổi khoảng cách từ mép trái đến phần tử đầu tiên nếu cần
        paddingVertical: 10, // Thay đổi khoảng cách dọc của mỗi mục nếu cần
        backgroundColor: COLOR.bg_color1,
        // borderRadius: 30,
        ...SHADOWS.medium
    },

    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    centralModal: {
        width: '90%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 30,
    },
    closeButton: {
        position: 'absolute',
        top: -30,
        right: -20,
        padding: 10,
        backgroundColor: COLOR.PRIMARY,
        borderRadius: 50,
    },
    noFollowText: {
        color: "black",
        fontWeight: "500",

    },
    avatarMd: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginLeft: "auto",
        marginRight: 25,
    },
    usernameMd: {
        fontSize: 20,
        fontWeight: "bold",
        width:"35%"
        // marginRight: 50,
    },
    unfollowButton: {
        padding: 7,
        backgroundColor: COLOR.PRIMARY,
        borderRadius: 10,
        marginLeft: 20,
    }
});


export default ProfileDetail;
