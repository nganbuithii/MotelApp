import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { COLOR, SHADOWS } from "../common/color";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import MyStyles from "../../Styles/MyStyles";
import HomeStyles from "../Home/HomeStyles";
import { Octicons } from '@expo/vector-icons';
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome6 } from '@expo/vector-icons';

const images = [
    { id: '1', uri: require('../../assets/images/2.png') },
    { id: '2', uri: require('../../assets/images/1.jpg') },
    { id: '3', uri: require('../../assets/images/4.jpg') },
];

const DetailOwner = () => {
    const [showHouseList, setShowHouseList] = useState(false);
    const [content, setContent] = useState('');

    const renderHouseItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <Image
                source={item.uri}
            />
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/images/bg1.jpg')}
                    style={styles.bgHead}
                />
                <View style={styles.containerProfile}>
                    <Image
                        source={require('../../assets/images/5.jpg')}
                        style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.btnFollow}>
                        <Text style={{ color: "#fff" }}> Theo dõi</Text>
                        <Entypo name="plus" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerInfo}>
                    <Text style={styles.txtName}>Ngan cute</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoText}>Người theo dõi: 2</Text>
                        <Text style={styles.separator}>|</Text>
                        <Text style={styles.infoText}>Đang theo dõi: 2</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <MaterialIcons style={styles.icon} name="calendar-month" size={20} color="black" />
                        <Text style={styles.infoText}>Ngày tham gia: 23-11-2003</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <View>
                        <Text style={styles.buttonText}>Thông tin nhà trọ</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoRow}>
                            <Octicons style={styles.icon} name="location" size={21} color="black" />
                            <Text style={styles.infoText}>Địa chỉ: 123 Đường ABC, Quận XYZ, TP. HCM</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MaterialIcons style={styles.icon} name="calendar-month" size={20} color="black" />
                            <Text style={styles.infoText}>Giá cả: 23-11-2003</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <FontAwesome6 style={styles.icon} name="house-user" size={20} color="black" />
                            <Text style={styles.infoText}>Diện tích: 23-11-2003</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MaterialIcons style={styles.icon} name="attach-money" size={24} color="black" />
                            <Text style={styles.infoText}>Giá cả: 23-11-2003</Text>
                        </View>
                    </View>
                    <FlatList
                        data={images}
                        renderItem={({ item }) => (
                            <Image
                                source={item.uri}
                                style={[styles.imgMotel, { width: Dimensions.get('window').width / 2 }]}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <View>
                        <Text style={styles.buttonText}>Thông tin nhà trọ</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoRow}>
                            <Octicons style={styles.icon} name="location" size={21} color="black" />
                            <Text style={styles.infoText}>Địa chỉ: 123 Đường ABC, Quận XYZ, TP. HCM</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MaterialIcons style={styles.icon} name="calendar-month" size={20} color="black" />
                            <Text style={styles.infoText}>Giá cả: 23-11-2003</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <FontAwesome6 style={styles.icon} name="house-user" size={20} color="black" />
                            <Text style={styles.infoText}>Diện tích: 23-11-2003</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MaterialIcons style={styles.icon} name="attach-money" size={24} color="black" />
                            <Text style={styles.infoText}>Giá cả: 23-11-2003</Text>
                        </View>
                    </View>
                    <FlatList
                        data={images}
                        renderItem={({ item }) => (
                            <Image
                                source={item.uri}
                                style={[styles.imgMotel, { width: Dimensions.get('window').width / 2 }]}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    bgHead: {
        width: "100%",
        height: 100,
        opacity: 0.2
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        position: "absolute",
        top: -55,
        left: 40,
        borderWidth: 3,
        borderColor: COLOR.PRIMARY
    },
    containerProfile: {
        position: "relative",
        height: 80,
        width: "100%",
        backgroundColor: COLOR.color6
    },
    btnFollow: {
        flexDirection: "row",
        backgroundColor: COLOR.PRIMARY,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        width: 105,
        marginTop: 20,
        marginLeft: 170,
    },
    containerInfo: {
        width: "100%",
        paddingHorizontal: 20,
        backgroundColor: COLOR.color6,
    },
    txtName: {
        color: COLOR.PRIMARY,
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 3,
        marginLeft: 8
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    infoText: {
        marginLeft: 10
    },
    separator: {
        marginHorizontal: 5,
        color: "#000"
    },
    icon: {
        marginLeft: 4,
        marginRight: 10
    },
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        backgroundColor:"#fff", // Màu nền mới
        padding: 10, // Padding cho các view chứa thông tin nhà trọ
        borderRadius: 8, // Bo tròn các góc
        ...SHADOWS.medium
    },
    buttonText: {
        color: COLOR.PRIMARY,
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 30,
        marginBottom: 10,
    },
    imgMotel: {
        width: "50%",
        height: 200,
    },
    infoContainer: {
        marginBottom: 10,
    },
});

export default DetailOwner;
