import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableWithoutFeedback, Image, FlatList, Dimensions, ScrollView, ActivityIndicator, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import HomeStyles from "../Home/HomeStyles";
import { COLOR, SHADOWS } from "../common/color";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import MyContext from "../../configs/MyContext";
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { authApi } from "../../configs/API";
import { endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';


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
        const motelData = await getMotel();
        if (motelData.length > 0) {

            //const parsedMotels = JSON.parse(motelData);
            setMotels(motelData);
            setStoredMotels(motelData);
            let token = await AsyncStorage.getItem("access-token");
            //console.log(token);

            // Duyệt qua mỗi nhà trọ trong mảng storedMotels
            motelData.forEach(async (motel) => {
                // Lấy ID của nhà trọ
                const idMotel = motel.id;

                // Gọi API để lấy hình ảnh của nhà trọ dựa trên ID
                const res = await authApi(token).get(endpoints['getImageMotel'](idMotel));
                const motelImages = res.data.motel_images;

                // Cập nhật state của nhà trọ với danh sách hình ảnh
                setStoredMotels(prevMotels => prevMotels.map(prevMotel => {
                    if (prevMotel.id === idMotel) {
                        return { ...prevMotel, images: motelImages };
                    }
                    return prevMotel;
                }));
            });
            setIsLoading(false);
            setMotels(motelData);
        }
        console.log("STORE MOTELL", motelData);
    };
    useEffect(() => {
        fetchMotels();
    }, [triggerRender]);

    const renderHouseItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <Image
                source={{ uri: item.url }}
                style={styles.imgMotel}
            />
        </View>
    );
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
    const handleEdit= (motel) => {
        // Xử lý khi nút "Sửa" được nhấn
        navigation.navigate("EditMotel", { motel });

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
        <View style={styles.container}>
            <View style={styles.navContainer}>
                <TouchableWithoutFeedback style={styles.nav} onPress={handlePress}>
                    <View style={styles.tab}>
                        <Ionicons name="arrow-back-outline" size={24} color={COLOR.PRIMARY} style={HomeStyles.bellIcon} />
                        <Text style={styles.textHead}>Nhà trọ của tôi</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <TouchableOpacity onPress={handleAddRoomPress}>
                <View style={styles.buttonAdd}>
                    <Feather name="plus" style={{ marginTop: 8 }} size={24} color="#fff" />
                    <Text style={styles.textAdd}>Thêm mới</Text>
                </View>
            </TouchableOpacity>
            {isLoading ? ( // Kiểm tra nếu đang tải dữ liệu
                <ActivityIndicator size="large" color={COLOR.PRIMARY} /> // Hiển thị biểu tượng loading
            ) : (
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    {storedMotels.map((item, index) => (

                        <View key={index} style={styles.containerMotel}>
                            {/* <Text>Id: {item.id}</Text> */}
                            <Text style={{ textAlign: "center", marginBottom: 5 }}>{item.name}</Text>
                            <View >
                                <View style={{ flexDirection: "row" }}>
                                    <View style={styles.tag}>
                                        <MaterialIcons name="attach-money" style={styles.iconTag} size={20} color="green" />
                                        <Text style={{ fontSize: 12 }}>{item.price}</Text>
                                    </View>
                                    <View style={styles.tag}>
                                        <FontAwesome6 name="house-chimney-window" style={styles.iconTag} size={20} color="green" />
                                        <Text style={{ fontSize: 12 }}>{item.area}</Text>
                                    </View>
                                    <View style={styles.tag}>
                                        <FontAwesome name="users" style={styles.iconTag} size={20} color="green" />
                                        <Text>{item.max_people}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                    <FontAwesome6 style={styles.iconTag} name="location-dot" size={20} color="green" />
                                    <Text style={{ fontSize: 12 }}>{item.other_address}</Text>
                                </View>
                            </View>
                            <FlatList
                                data={item.images || []}
                                renderItem={({ item }) => (
                                    <Image
                                        source={{ uri: item.url }}
                                        style={[styles.imgMotel, { width: Dimensions.get('window').width }]}
                                        onLoad={() => handleImageChange(index)}
                                    />
                                )}
                                keyExtractor={(image) => (image.id ? image.id.toString() : Math.random().toString())}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false} // Tắt thanh trượt ngang
                            />

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => handleEdit(item)}  style={[styles.button, styles.editButton]}>
                                    <FontAwesome name="edit" size={13} color="black" />
                                    <Text style={styles.buttonText}>Chỉnh sửa</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.button, styles.deleteButton]}>
                                    <FontAwesome name="trash" size={13} color="black" />
                                    <Text style={styles.buttonText}>Xóa</Text>
                                </TouchableOpacity>


                            </View>
                        </View>
                    ))}
                </ScrollView>)}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    navContainer: {
        width: "100%",
    },
    nav: {
        width: "100%",
    },
    tab: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: COLOR.color11,
        paddingVertical: 15,
        paddingLeft: 10,
        paddingTop: 20,
        ...SHADOWS.medium,
    },
    textHead: {
        fontSize: 18,
        color: COLOR.PRIMARY,
        fontWeight: "500",
        textAlign: "center",
        marginTop: 10,
        marginLeft: 10
    },
    textAdd: {
        color: "#fff",
        fontWeight: "500",
        textAlign: "center",
        marginTop: 10,
        marginLeft: 10
    },
    buttonAdd: {
        backgroundColor: COLOR.color12,
        padding: 8,
        borderRadius: 20,
        ...SHADOWS.medium,
        flexDirection: "row",
        marginTop: 10
    },
    containerMotel: {
        width: "98%",
        ...SHADOWS.medium,
        // borderRadius:30,
        backgroundColor: COLOR.offWhite,
        padding: 10,
        // borderTopLeftRadius: 40,
        // borderTopRightRadius: 30,

        marginTop: 10,
        borderRadius: 30,
        marginBottom: 10
    },
    imgMotel: {
        width: "55%",
        height: 200,
    },
    tag: {
        flexDirection: "row",
        // borderColor:"green",
        // borderWidth:1,
        // width: 180,
        padding: 3,
        borderRadius: 10,
        // backgroundColor:COLOR.offWhite,
        marginTop: 3,
        marginLeft: 5,
        borderRadius: 20,
        // ...SHADOWS.medium,
        marginBottom: 5,
        borderColor: COLOR.offWhite,
        borderWidth: 1,

        // ...SHADOWS.sma
    }
    , iconTag: {
        paddingHorizontal: 10
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 5,

    },
    buttonText: {
        marginLeft: 5,
        fontSize: 12
    },
    editButton: {
        backgroundColor: "#FFD700",
    },
    deleteButton: {
        backgroundColor: "#FF6347",
    },
    badgeContainer: {
        position: 'absolute',
        top: 100,
        right: 10, // Hoặc left: 10 nếu bạn muốn đặt badge ở góc trái
        // backgroundColor:COLOR.color6,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    badgeText: {
        color: COLOR.PRIMARY,
        fontSize: 12,
    },
    imageContainer: {
        position: "relative"
    }
});

export default PlusOwner;
