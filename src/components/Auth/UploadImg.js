import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ButtonAuth from '../common/ButtonAuth';
import MyStyles from '../../Styles/MyStyles';
import { COLOR } from '../common/color';

const UploadImg = () => {
    const [image, setImage] = useState(null);
    const [defaultImage, setDefaultImage] = useState(require('../../assets/images/avt.gif'));

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
        <View style={MyStyles.container}>
            <Text style={MyStyles.textHead}> Chọn ảnh đại diện</Text>
            <View style={imageUploaderStyles.container}>
                {!image && <Image source={defaultImage} style={{ width: 200, height: 200 }} />}
                {image && <Image source={{ uri: image }} style={{ flex: 1, aspectRatio: 4/3 }} />}
                <View style={imageUploaderStyles.uploadBtnContainer}>
                    <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn}>
                        <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                        <AntDesign name="camera" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <ButtonAuth title="Lưu" />
        </View>
    );
};

const imageUploaderStyles = StyleSheet.create({
    container: {
        elevation: 2,
        height: 200,
        width: 200,
        backgroundColor: '#efefef',
        position: 'relative',
        borderRadius: 999,
        overflow: 'hidden',
        marginBottom:20,
        marginTop:20
    },
    uploadBtnContainer: {
        opacity: 0.7,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: COLOR.gray,
        width: '100%',
        height: '50%',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default UploadImg;
