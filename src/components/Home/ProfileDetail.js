import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import MyStyles from '../../Styles/MyStyles';
import { COLOR } from '../common/color';
import ButtonAuth from '../common/ButtonAuth';

const ProfileDetail = () => {
    const [image, setImage] = useState(null);
    const [defaultImage, setDefaultImage] = useState(require('../../assets/images/avt.png'));
    const [name, setName] = useState('Bùi Ngân');
    const [email, setEmail] = useState('ngan@gmail.com');
    const [phoneNumber, setPhoneNumber] = useState('0774617027');

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
        if (!_image.cancelled) {
            setImage(_image.uri);
        }
    };

    return (
        <View style={styles.containerDetail}>
            <TouchableOpacity onPress={addImage}>
                <Image
                    source={image ? { uri: image } : defaultImage}
                    style={styles.avatar}
                />
                <AntDesign name="camera" style={styles.iconCam} size={35} color={COLOR.PRIMARY} />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tên</Text>
                <TextInput
                    style={styles.inputDetail}
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.inputDetail}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                    style={styles.inputDetail}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
            </View>
            <ButtonAuth title="Lưu thay đổi" />
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
    },
    avatar: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 100,
        borderWidth: 10,
        borderColor: COLOR.color3,
        position: 'relative',
    },
    inputContainer: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
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
});

export default ProfileDetail;
