import React, { useContext, useState, useEffect } from "react";
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator,
    Alert,
} from "react-native";
import { COLOR, SHADOWS } from "../common/color";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import ButtonAuth from "../common/ButtonAuth";
import MyContext from '../../configs/MyContext';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import showToast from "../common/ToastMessage";
import * as ImagePicker from "expo-image-picker";
import PostStyle from "./PostStyle";

const Editpost = ({ navigation, route }) => {
    const { postId, post } = route.params;
    // const [rpost, setRPost] = useState(post);
    const [cities, setCities] = useState([]); // State để lưu trữ danh sách các tỉnh/thành phố
    const [districts, setDistricts] = useState([]); // State để lưu trữ danh sách các quận/huyện
    const [wards, setWards] = useState([]);

    const [user, dispatch] = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [ward, setWard] = useState();
    const [district, setDistrict] = useState();
    const [city, setCity] = useState();
    const [other, setOther] = useState(post.other_address);
    const [content, setContent] = useState(post.content);
    const [image, setImage] = useState(post.image);

    const [contentError, setContentError] = useState("");
    const [imgErr, setImgErr] = useState("");
    const [wardErr, setWardErr] = useState("");
    const [cityErr, setCityErr] = useState("");
    const [districtErr, setDistrictErr] = useState("");
    const [otherErr, setOtherErr] = useState("");


    useEffect(() => {
        const cityId = cityIdMapping[post.city];
        const districtId = districtIdMapping[post.district];
        const wardId = wardIdMapping[post.ward];
        setCity(cityId);
        setWard(wardId);
        setDistrict(districtId);
        setOther(post.other_address);
        setContent(post.content);
        setImage(post.image);
        console.log(city);
        console.log(ward);
    }, []); 
    


    const checkForCameraRollPermission = async () => {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            console.log("Please grant camera roll permissions inside your system's settings");
            // alert(

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
        }
    };


    // Hàm để lấy danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
    const fetchDistricts = async (cityId) => {
        try {
            const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${cityId}.htm`);
            if (response.data.error === 0) {
                setDistricts(response.data.data); // Cập nhật state với danh sách quận/huyện
            }
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    // Hàm để lấy danh sách xã/phường dựa trên quận/huyện được chọn
    const fetchWards = async (districtId) => {
        try {
            const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
            if (response.data.error === 0) {
                setWards(response.data.data); // Cập nhật state với danh sách xã/phường
            }
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };
    // Hàm xử lý khi tỉnh/thành phố được chọn
    const handleCityChange = (cityId) => {
        fetchDistricts(cityId); // Gọi hàm để lấy danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
    };

    // Hàm xử lý khi quận/huyện được chọn
    const handleDistrictChange = (districtId) => {
        fetchWards(districtId); // Gọi hàm để lấy danh sách xã/phường dựa trên quận/huyện được chọn
    };

    // Lấy danh sách tỉnh/thành phố khi component được render
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                if (response.data.error === 0) {
                    setCities(response.data.data); // Cập nhật state với danh sách tỉnh/thành phố
                }
                // console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchCities();
    }, []);
    // Tạo bảng dữ liệu ánh xạ ID và tên của tỉnh/thành phố, quận/huyện
    const cityMapping = {};
    cities.forEach(city => {
        cityMapping[city.id] = city.full_name;
    });
    const cityIdMapping = {};
    cities.forEach(city => {
        cityIdMapping[city.full_name] = city.id;
    });
    const districtIdMapping = {};
    districts.forEach(district => {
        districtIdMapping[district.full_name] = district.id;
    });
    const wardIdMapping = {};
    wards.forEach(ward => {
        wardIdMapping[ward.full_name] = ward.id;
    });

    const districtMapping = {};
    districts.forEach(district => {
        districtMapping[district.id] = district.full_name;
    });

    // Hàm để chuyển đổi ID thành tên tỉnh/thành phố, quận/huyện
    const getCityNameById = (cityId) => {
        return cityMapping[cityId] || '';
    };

    const getDistrictNameById = (districtId) => {
        return districtMapping[districtId] || '';
    };
    // Tạo bảng dữ liệu ánh xạ ID và tên của xã/phường
    const wardMapping = {};
    wards.forEach(ward => {
        wardMapping[ward.id] = ward.full_name;
    });

    // Hàm để chuyển đổi ID thành tên xã/phường
    const getWardNameById = (wardId) => {
        return wardMapping[wardId] || '';
    };
    const handleSubmit = async () => {
        try {
            if (!content) { setContentError("Vui lòng nhập mô tả"); } else { setContentError(""); }
            if (!image) { setImgErr("Vui lòng chọn hình ảnh"); } else { setImgErr(""); }
            if (!ward) { setWardErr("Vui lòng chọn xã phường"); } else { setWardErr(""); }
            if (!city) { setCityErr("Vui lòng chọn thành phố"); } else { setCityErr(""); }
            if (!district) { setDistrictErr("Vui lòng chọn quận huyện"); } else { setDistrictErr(""); }
            if (!other) { setOtherErr("Vui lòng chọn quận huyện"); } else { setOtherErr(""); }
            if (content && ward && district && city && other && image) {
                let token = await AsyncStorage.getItem("access-token");
                console.log(token);
                // console.log("POST", post);
                const formData = new FormData();
                if (content != post.content) { formData.append("content", content); }
                if (ward != wardIdMapping[post.ward]) { formData.append("ward", getWardNameById(ward)); }
                if (city != cityIdMapping[post.city]) { formData.append("city", getCityNameById(city)); }
                if (district != districtIdMapping[post.district]) { formData.append("district", getDistrictNameById(district)); }
                if (other != post.other_address) { formData.append("other_address", other); }



                const uriParts = image.split('.');
                const fileType = uriParts[uriParts.length - 1];
                const img = {
                    uri: image,
                    name: `image.${fileType}`,
                    type: `image/${fileType}`,
                }
                if (image != post.image) {
                    formData.append('image', img);
                }
                console.log("id post",postId);

                let res = await authApi(token).patch(endpoints["updatePostRent"](postId), formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log("Cập nhật thành công");
                // setLoading(true);
                navigation.navigate("HomeIndex", { myPost: res.data })
            }

        } catch (ex) {
            console.error(ex);
        }
    };
    const test = () => {
        console.log("Post data:", post);

        console.log("City:", city);
        console.log("District:", district);
        console.log("Ward:", ward);

    }
    return (
        <View style={PostStyle.container}>
            <Image
                source={require("../../assets/images/green.jpg")}
                style={PostStyle.backgroundImage}
            />
            <ScrollView contentContainerStyle={PostStyle.scrollView}>
                <View style={PostStyle.userInfo}>
                    <Image
                        source={{ uri: user.avatar }} // Thay đổi đường dẫn của ảnh mặc định
                        style={PostStyle.avatar} />
                    <Text style={PostStyle.username}>{user.username}</Text>
                </View>
                {/* <TouchableOpacity onPress={test}>
                    <Text> Helo</Text>
                </TouchableOpacity> */}

                <View>

                    <Text style={PostStyle.sectionTitle}>Mô tả</Text>
                    {!!contentError && <Text style={PostStyle.errorText}><Ionicons name="warning" size={12} color="red" />{contentError}</Text>}
                    <View style={PostStyle.inputContainer}>
                        <TextInput placeholder="Hãy viết nội dung cho bài viết của bạn?" style={PostStyle.input} multiline={true} value={content} onChangeText={(text) => setContent(text)}
                        />
                    </View>
                    {!!imgErr && <Text style={PostStyle.errorText}><Ionicons name="warning" size={12} color="red" />{imgErr}</Text>}
                    <TouchableOpacity style={PostStyle.uploadButton} onPress={addImage}>
                        <Ionicons name="camera" size={24} color="lightgreen" />
                        <Text style={PostStyle.uploadText}>Thêm hình ảnh</Text>
                    </TouchableOpacity>
                    {image && (
                        <View style={PostStyle.imageContainer}>
                            <Image
                                source={{ uri: image }}
                                style={PostStyle.selectedImage}
                            />
                            <TouchableOpacity style={PostStyle.deleteImageButton} onPress={() => setImage("")}>
                                <Ionicons name="close-circle-outline" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}

                    <Text style={PostStyle.sectionTitle}>Vị trí muốn tìm trọ</Text>
                    <TouchableOpacity style={PostStyle.uploadButton}>
                        <Feather name="map-pin" size={24} color="lightgreen" />
                        <Text style={PostStyle.uploadText}>Thêm vị trí</Text>
                    </TouchableOpacity>
                </View>
                {!!wardErr && <Text style={PostStyle.errorText}><Ionicons name="warning" size={12} color="red" />{wardErr}</Text>}
                <View style={PostStyle.selectContainer}>
                    {/* <Text>Chọn tỉnh/thành phố:</Text> */}
                    <RNPickerSelect
                        value={city}
                        onValueChange={(value) => {
                            setCity(value);
                            handleCityChange(value); // Gọi hàm xử lý khi tỉnh/thành phố được chọn
                        }}
                        placeholder={{ label: 'Chọn tỉnh/thành phố', value: null }}
                        items={cities.map(city => ({ label: city.full_name, value: city.id }))}
                    />
                </View>
                {!!districtErr && <Text style={PostStyle.errorText}><Ionicons name="warning" size={12} color="red" />{districtErr}</Text>}
                <View style={PostStyle.selectContainer}>
                    <RNPickerSelect
                        value={district}
                        onValueChange={(value) => {
                            setDistrict(value);
                            handleDistrictChange(value); // Gọi hàm xử lý khi quận/huyện được chọn
                        }}
                        placeholder={{ label: 'Chọn quận/huyện', value: null }}
                        items={districts.map(district => ({ label: district.full_name, value: district.id }))}
                    />
                </View>
                {!!cityErr && <Text style={PostStyle.errorText}><Ionicons name="warning" size={12} color="red" />{cityErr}</Text>}
                <View style={PostStyle.selectContainer}>
                    <RNPickerSelect
                        value={ward}
                        onValueChange={(value) => setWard(value)}
                        placeholder={{ label: 'Chọn xã/phường', value: null }}
                        items={wards.map(ward => ({ label: ward.full_name, value: ward.id }))}
                    />
                </View>
                {!!otherErr && <Text style={PostStyle.errorText}><Ionicons name="warning" size={12} color="red" />{otherErr}</Text>}
                <View style={PostStyle.inputContainer}>

                    <TextInput
                        style={PostStyle.input}
                        value={other}
                        onChangeText={setOther}
                        placeholder="Địa chỉ khác (Nếu có)"
                    />
                </View>

                <View style={PostStyle.buttonContainer}>
                    {loading ? (<ActivityIndicator />) : (
                        <ButtonAuth title="Cập nhật bài viết" onPress={handleSubmit} />)}
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({



});


export default Editpost;
