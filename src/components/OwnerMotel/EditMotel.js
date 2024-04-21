import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ScrollView, Alert } from "react-native"
import HomeStyles from "../Home/HomeStyles";
import { Entypo, MaterialIcons, Octicons } from "@expo/vector-icons";
import { COLOR, SHADOWS } from "../common/color";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import EditMotelStyle from '../../Styles/EditMotelStyle'
import { useState } from "react";
const EditMotel = ({ navigation, route }) => {
    const { motel } = route.params;
    const [price, setPrice] = useState(motel.price.toString() || "");
    const [area, setArea] = useState(motel.area.toString() || "");
    const [desc, setDesc] = useState(motel.description || "");
    const [maxpeople, setMaxpeople] = useState(motel.max_people.toString() || "");
    const [ward, setWard] = useState(motel.ward || "");
    const [district, setDistrict] = useState(motel.district||"");
    const [city, setCity] = useState(motel.city || "");
    const [other, setOther] = useState(motel.onther || "");



    const handleAddImage = async () => {
        try {
            const selectedImages = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                multiple: true,
            });
            //console.log(JSON.stringify(selectedImages));
            if (!selectedImages.canceled) {
                setImages([...images, ...selectedImages.assets]);
                // khi có ảnh hiện nút 
                setButton(true)
            }
        } catch (error) {
            console.log("Error selecting images: ", error);
        }
    };
    const handleExit = () => {
        console.log(motel)
        Alert.alert("Thông báo", "Bạn có chắc chắn thoát không?",
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Thoát", onPress: () => navigation.goBack() }
            ],
            { cancelable: false })
    }
    return (
        <View style={EditMotelStyle.container}>
            <View style={HomeStyles.tab}>
                <AntDesign name="home" size={24} color={COLOR.PRIMARY} style={HomeStyles.bellIcon} />
                <Text style={HomeStyles.textHead}>Thông Tin Nhà Trọ</Text>
            </View>
            <ScrollView contentContainerStyle={EditMotelStyle.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={EditMotelStyle.infoContainer}>
                    {/* <Text>Thông tin phòng</Text> */}
                

                    <Text style={EditMotelStyle.labelService}> Thông tin phòng</Text>
                    <Text style={EditMotelStyle.label}>Xã/Phường</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome5 name="location-arrow" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput value={ward}  style={EditMotelStyle.input} placeholder="Xã/Phường" />
                    </View>
                    <Text style={EditMotelStyle.label}> Quận/Huyện</Text>
                    <View style={EditMotelStyle.inputContainer}>

                        <FontAwesome5 name="location-arrow" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput value={district} style={EditMotelStyle.input} placeholder="Quận/Huyện" />
                    </View>
                    <Text style={EditMotelStyle.label}>Tỉnh/Thành phố</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome5 name="location-arrow" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput value={city} style={EditMotelStyle.input} placeholder="Tỉnh/Thành phố" />
                    </View>
                    <Text style={EditMotelStyle.label}> Địa chỉ khác</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome6 name="location-dot" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput value={other} style={EditMotelStyle.input} placeholder="Địa chỉ khác" />
                    </View>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome5 name="map-marked-alt" style={EditMotelStyle.icon} size={24} color="green" />

                    </View>
                    <Text style={EditMotelStyle.label}> Tiền phòng</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome name="money" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput value={price} style={EditMotelStyle.input} placeholder="Giá phòng" />
                    </View>
                    <Text style={EditMotelStyle.label}> Diện tích</Text>
                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome6 name="house" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput value={area} style={EditMotelStyle.input} placeholder="Diện tích" />
                    </View>
                    <Text style={EditMotelStyle.label}> Mô tả</Text>

                    <View style={EditMotelStyle.inputContainer}>
                        <Entypo name="pencil" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput value={desc} style={EditMotelStyle.input} placeholder="Mô tả" />
                    </View>
                    <Text style={EditMotelStyle.label}> Số người</Text>

                    <View style={EditMotelStyle.inputContainer}>
                        <FontAwesome5 name="users" style={EditMotelStyle.icon} size={24} color="green" />
                        <TextInput value={maxpeople} style={EditMotelStyle.input} placeholder="Số người" />
                    </View>
                </View>

                <View style={EditMotelStyle.serviceInfo}>
                    <Text style={EditMotelStyle.labelService}> Thông tin dịch vụ</Text>
                    <AntDesign style={{ marginLeft: "auto", paddingRight: 20, }} name="pluscircleo" size={24} color={COLOR.PRIMARY} />

                    <View style={EditMotelStyle.serviceRow} >
                        <View style={EditMotelStyle.serviceIt}>
                            <MaterialIcons name="electric-bolt" size={24} color="green" />
                            <Text>Điện</Text>
                            <Text>3.000 đ/Kwh</Text>
                            <AntDesign style={EditMotelStyle.iconEdit} name="edit" size={24} color="black" />
                        </View>
                        <View style={EditMotelStyle.serviceIt}>
                            <MaterialIcons name="electric-bolt" size={24} color="green" />
                            <Text>Mạng</Text>
                            <Text>100.000 đ/ Phòng</Text>
                            <AntDesign style={EditMotelStyle.iconEdit} name="edit" size={24} color="black" />
                        </View>
                        <View style={EditMotelStyle.serviceIt}>
                            <MaterialIcons name="electric-bolt" size={24} color="green" />
                            <Text>Nước</Text>
                            <Text>20.000 đ/m3</Text>
                            <AntDesign style={EditMotelStyle.iconEdit} name="edit" size={24} color="black" />
                        </View>
                    </View>
                </View>
                <View style={EditMotelStyle.serviceInfo}>
                    <Text style={EditMotelStyle.labelService}> Ảnh phòng</Text>
                    {/* <FlatList /> */}
                    <Image
                        source={require("../../assets/images/hi.gif")}
                        style={EditMotelStyle.imageMotel}
                    />
                    <TouchableOpacity onPress={handleAddImage} style={EditMotelStyle.addButton}>
                        <Text style={EditMotelStyle.addButtonText}>Thêm</Text>
                        <AntDesign name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={EditMotelStyle.containerBtn}>
                    <TouchableOpacity style={EditMotelStyle.button} onPress={handleExit}>
                        <Text style={EditMotelStyle.buttonText}> Thoát</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[EditMotelStyle.button, EditMotelStyle.saveButton]}>
                        <Text style={EditMotelStyle.buttonText}> Lưu thông tin</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}


export default EditMotel;