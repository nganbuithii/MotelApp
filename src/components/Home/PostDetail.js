import React, { useEffect, useState } from "react";
import {
    View, FlatList, Image, StyleSheet, Dimensions, Text,
} from "react-native";
import { COLOR, SHADOWS } from "../common/color";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import ButtonAuth from "../common/ButtonAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;

const PostDetail = ({ navigation, route }) => {
    const { idMotel } = route.params;
    const [images, setImages] = useState([]);
    const [motel, setMotel] = useState();
    const [loading, setLoading] = useState(true);

    const handleSubmit = () => {
        console.log(idMotel);
        navigation.navigate("Payment");
    }
    const renderItem = ({ item }) => (
        <Image source={{ uri: item.url }} style={styles.img} resizeMode="cover" />
    );

    const detailMotel = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            let res = await authApi(token).get(endpoints["detailMotel"](idMotel));
            console.log("DATA NHÀ TRỌ");
            console.log(res.data);
            setMotel(res.data);
            setImages(res.data.images);
            setLoading(false);

        } catch (ex) {
            console.error(ex);
        }
    }
    useEffect(() => {
        detailMotel();
    }, [])

    return (
        <View style={{ flex: 1 , paddingBottom:30}}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator />
                </View>
            ) : (
                <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>



                    <FlatList
                        data={images}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                    // style={{height:"20%", width:"100%"}}
                    />
                    <View style={styles.infoContainer}>
                        <View style={styles.infoRow}>
                            <MaterialIcons name="location-pin" size={28} color="green" />
                            <Text style={styles.infoText}>
                                371 Nguyễn Kiệm, phường 3, quận Bình Tân, Tp Hồ Chí Minh
                            </Text>
                        </View>



                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <AntDesign name="areachart" size={24} color="#fff" />
                                <Text style={styles.infoLabel}>Diện tích</Text>
                                <Text style={styles.infoValue}>{motel.area} m2</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <FontAwesome6 name="users-viewfinder" size={24} color="#fff" />
                                <Text style={styles.infoLabel}>Số người</Text>
                                <Text style={styles.infoValue}>{motel.max_people}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <FontAwesome6 name="money-bill-alt" size={24} color="#fff" />
                                <Text style={styles.infoLabel}>Giá phòng</Text>
                                <Text style={styles.infoValue}>{motel.price}VNĐ</Text>
                            </View>

                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <FontAwesome6 name="money-bill-alt" size={24} color="#fff" />
                                <Text style={styles.infoLabel}>Cọc</Text>
                                <Text style={styles.infoValue}>1.000.000VNĐ</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            {motel.prices && motel.prices.length > 0 ? (
                                motel.prices.map((price, index) => (
                                    <View style={styles.infoItem} key={index}>
                                        {/* Hiển thị thông tin về từng khoản phí dịch vụ bổ sung */}
                                        <FontAwesome6 name="money-bill-alt" size={24} color="#fff" />
                                        <Text style={styles.infoLabel}>{price.service}</Text>
                                        <Text style={styles.infoValue}>{price.price}</Text>
                                    </View>
                                ))
                            ) : (
                                // Hiển thị văn bản ghi chú khi không có thông tin về các khoản phí dịch vụ bổ sung
                                <View style={styles.infoItem}>
                                    <FontAwesome6 name="money-bill-alt" size={24} color="#fff" />
                                    <Text style={styles.infoLabel}>Chưa có thông tin về dịch vụ</Text>
                                    <Text style={styles.infoValue}>-</Text>
                                </View>
                            )}

                        </View>

                    </View>
                    <ButtonAuth title="Đặt cọc phòng" onPress={handleSubmit} />

                </ScrollView>
            )}
        </View>

    );
};

const styles = StyleSheet.create({

    img: {
        width: 230, // Sử dụng 50% chiều rộng của màn hình
        aspectRatio: 1, // Giữ tỷ lệ khung hình
        margin: 5,
        marginTop: 20,
        // borderRadius: 30,
        borderColor: COLOR.PRIMARY,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 10,

    },
    infoContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        // marginHorizontal: 15,
        backgroundColor: COLOR.PRIMARY,
        padding: 20,
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        // borderRadius:30,
        ...SHADOWS.medium,
    },
    infoItem: {
        flex: 1,
        alignItems: "center",
    },
    infoText: {
        marginLeft: 10,
    },
    infoLabel: {
        marginTop: 5,
        color: "black",
        fontWeight: "400"
    },
    infoValue: {
        marginTop: 2,
        fontWeight: "bold",
        color: "#fff"
    },
});

export default PostDetail;
