import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableWithoutFeedback, Image, FlatList, Dimensions, ScrollView, ActivityIndicator, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { COLOR, SHADOWS } from "../common/color";
import HomeStyles from "../../Styles/HomeStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import MyContext from "../../configs/MyContext";
import { authApi } from "../../configs/API";
import { endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
import PlusOwnerStyle from "../../Styles/PlusOwnerStyle";


const PlusOwner = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true); // State để kiểm soát trạng thái của việc tải dữ liệu
    const [showHouseList, setShowHouseList] = useState(false);
    const [content, setContent] = useState('');
    const [user, dispatch] = useContext(MyContext);
    const [triggerRender, setTriggerRender] = useState(false);
    const [motels, setMotels] = useState([]);
    const [storedMotels, setStoredMotels] = useState([]);

    const getMotel = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            let response = await authApi(token).get(endpoints['detailMotelOwner'](user.id));
            let motelData = response.data;
            setMotels(response.data); // Cập nhật state với dữ liệu từ response.data
            console.log("FETCH API motel", response.data);
            return motelData;

        } catch (ex) {
            console.error(ex);
        }

    }
    const fetchMotels = async () => {
        try {
            const motelData = await getMotel();
            if (motelData.length > 0) {
                setMotels(motelData);
                setStoredMotels(motelData);

                let token = await AsyncStorage.getItem("access-token");
                console.log("token", token);
                console.log("motel data:", motelData);
                // await Promise.all(motelData.map(async (motel) => {
                //     try {
                //         const idMotel = motel.id;
                //         const res = await authApi(token).get(endpoints['getImageMotel'](idMotel));
                //         console.log("IMAGES", res.data);
                //         const motelImages = res.data.motel_images;
                //         const motelPrices = res.data.prices;
                //         setStoredMotels(prevMotels => prevMotels.map(prevMotel => {
                //             if (prevMotel.id === idMotel) {
                //                 return { ...prevMotel, images: motelImages, prices: motelPrices };
                //             }
                //             return prevMotel;
                //         }));
                //     } catch (error) {
                //         console.error("Error fetching images for motel", motel.id, error);
                //         // Xử lý lỗi ở đây nếu cần thiết
                //     }
                // }));

                setIsLoading(false);
                setMotels(motelData);
            }
        } catch (ex) {
            console.log("lỗi ở đây")
            console.error(ex);
            // Xử lý lỗi ở đây nếu cần thiết
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchMotels();
    }, [triggerRender]);

    useEffect(() => {
        // Gọi hàm fetchMotels khi component được render và sau mỗi phút
        const interval = setInterval(() => {
            fetchMotels();
        }, 30000); // 60000 milliseconds = 1 phút
    
        // Xóa interval khi component bị unmount để tránh memory leak
        return () => clearInterval(interval);
    }, []); // Dùng mảng rỗng để chỉ chạy useEffect một lần sau khi component được render
    
    // const renderHouseItem = ({ item }) => (
    //     <View style={styles.imageContainer}>
    //         <Image
    //             source={{ uri: item.url }}
    //             style={styles.imgMotel}
    //         />
    //     </View>
    // );
    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Xóa nhà trọ thành công.',
            visibilityTime: 3000, // Thời gian tồn tại của toast (milliseconds)
            autoHide: true, // Tự động ẩn toast sau khi hết thời gian tồn tại
        });
    }
    const handlePress = () => {
        navigation.navigate("Home"); // Quay lại trang trước đó

    };
    const handleEdit = (motel) => {
        // Xử lý khi nút "Sửa" được nhấn
        navigation.navigate("EditMotel", { idMotel: motel.id });
        console.log("ID Motel KHI EDIT", motel.id)
        console.log("Motel khi giá cả", motel.prices)
        setTriggerRender(!triggerRender);
        navigation.addListener('focus', async () => {
            await fetchMotels(); // Cập nhật lại danh sách nhà trọ sau khi thêm mới
        });
    };

    const handleDelete = async (idMotel) => {
        // Xử lý khi nút "Xóa" được nhấn
        try {
            let token = await AsyncStorage.getItem("access-token");
            console.log("TOKEN", token);
            console.log("ID", idMotel);

            // Hiển thị cửa sổ cảnh báo
            Alert.alert(
                'Xác nhận xóa',
                'Bạn có chắc muốn xóa nhà trọ này?',
                [
                    {
                        text: 'Hủy',
                        onPress: () => console.log('Hủy xóa'), // Xử lý khi người dùng nhấn Hủy
                        style: 'cancel',
                    },
                    {
                        text: 'Xóa',
                        onPress: async () => {
                            // Xử lý khi người dùng nhấn Xóa
                            await authApi(token).delete(endpoints['deleteMotel'](idMotel));
                            console.log("Xóa nhà thành công");
                            // Lọc danh sách nhà trọ mới sau khi xóa nhà trọ thành công
                            const updatedMotels = storedMotels.filter(motel => motel.id !== idMotel);
                            // Cập nhật state với danh sách nhà trọ mới
                            setStoredMotels(updatedMotels);
                            // Cập nhật AsyncStorage với danh sách nhà trọ mới
                            await AsyncStorage.setItem("motels", JSON.stringify(updatedMotels));
                            const motelsauxoa = await AsyncStorage.getItem("motels");
                            console.log("Motel sau xóa:", motelsauxoa);
                            setIsLoading(false);
                            showToast();
                        },
                    },
                ],
                { cancelable: true }
            );

        } catch (ex) {
            console.error(ex);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddRoomPress = async () => {
        navigation.navigate('RegisterMotel');
        setTriggerRender(!triggerRender);
        navigation.addListener('focus', async () => {
            await fetchMotels(); // Cập nhật lại danh sách nhà trọ sau khi thêm mới
        });
    };

    const handleImageChange = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <View style={PlusOwnerStyle.container}>

            <View style={HomeStyles.tab}>
                <FontAwesome name="heart" size={24} color={COLOR.PRIMARY} style={HomeStyles.bellIcon} />
                {/* <Ionicons name="arrow-back-outline" size={24} color={COLOR.PRIMARY} style={HomeStyles.bellIcon} /> */}
                <Text style={PlusOwnerStyle.textHead}>Nhà trọ của tôi</Text>
            </View>
            <TouchableWithoutFeedback onPress={handleAddRoomPress}>
                <View style={PlusOwnerStyle.buttonAdd}>
                    <Feather name="plus" style={{ marginTop: 8 }} size={24} color="#fff" />
                    <Text style={PlusOwnerStyle.textAdd}>Thêm mới</Text>
                </View>
            </TouchableWithoutFeedback>
            {isLoading ? ( // Kiểm tra nếu đang tải dữ liệu
                <ActivityIndicator size="large" color={COLOR.PRIMARY} /> // Hiển thị biểu tượng loading
            ) : (
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    {storedMotels.map((item, index) => (

                        <View key={index} style={PlusOwnerStyle.containerMotel}>
                            <Text>Id: {item.id}</Text>
                            <Text style={{ textAlign: "center", marginBottom: 5 }}>{item.name}</Text>
                            <View >
                                <View style={{ flexDirection: "row" }}>
                                    <View style={PlusOwnerStyle.tag}>
                                        <MaterialIcons name="attach-money" style={PlusOwnerStyle.iconTag} size={20} color="green" />
                                        <Text style={{ fontSize: 12 }}>{item.price} VNĐ</Text>
                                    </View>
                                    <View style={PlusOwnerStyle.tag}>
                                        <FontAwesome6 name="house-chimney-window" style={PlusOwnerStyle.iconTag} size={20} color="green" />
                                        <Text style={{ fontSize: 12 }}>{item.area} m2</Text>
                                    </View>
                                    <View style={PlusOwnerStyle.tag}>
                                        <FontAwesome name="users" style={PlusOwnerStyle.iconTag} size={20} color="green" />
                                        <Text>{item.max_people} Người</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <FontAwesome6 style={PlusOwnerStyle.iconTag} name="location-dot" size={20} color="green" />
                                    <Text style={{ fontSize: 12 }}>{item.ward}- {item.district}- {item.city}</Text>
                                </View>
                            </View>
                            <FlatList
                                data={item.images || []}
                                renderItem={({ item }) => (
                                    <Image
                                        source={{ uri: item.url }}
                                        style={[PlusOwnerStyle.imgMotel, { width: Dimensions.get('window').width }]}
                                        onLoad={() => handleImageChange(index)}
                                    />
                                )}
                                keyExtractor={(image) => (image.id ? image.id.toString() : Math.random().toString())}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false} // Tắt thanh trượt ngang
                            />

                            <View style={PlusOwnerStyle.buttonContainer}>
                                {item.approved ? (
                                    <TouchableOpacity onPress={() => handleEdit(item)} style={[PlusOwnerStyle.button, PlusOwnerStyle.editButton]}>
                                        <FontAwesome name="edit" size={13} color="black" />
                                        <Text style={PlusOwnerStyle.buttonText}>Chỉnh sửa</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={[PlusOwnerStyle.button, PlusOwnerStyle.editButton]}>
                                        <FontAwesome name="hourglass-half" size={13} color="black" />
                                        <Text style={PlusOwnerStyle.buttonText}>Đang chờ duyệt</Text>
                                    </TouchableOpacity>
                                )}

                                <TouchableOpacity onPress={() => handleDelete(item.id)} style={[PlusOwnerStyle.button, PlusOwnerStyle.deleteButton]}>
                                    <FontAwesome name="trash" size={13} color="black" />
                                    <Text style={PlusOwnerStyle.buttonText}>Xóa</Text>
                                </TouchableOpacity>


                            </View>
                        </View>
                    ))}
                </ScrollView>)}

        </View>
    )
}

const styles = StyleSheet.create({
    
});

export default PlusOwner;
