import React from "react";
import {View,FlatList,Image,StyleSheet,Dimensions,Text,
} from "react-native";
import { COLOR, SHADOWS } from "../common/color";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import ButtonAuth from "../common/ButtonAuth";

const windowWidth = Dimensions.get("window").width;

const PostDetail = ({navigation}) => {
    const data = [
        { id: 1, imageUrl: require("../../assets/images/1.jpg") },
        { id: 2, imageUrl: require("../../assets/images/2.png") },
        { id: 3, imageUrl: require("../../assets/images/3.png") },
    ];
    const handleSubmit =() =>{
        navigation.navigate("Payment");
    }
    const renderItem = ({ item }) => (
        <Image source={item.imageUrl} style={styles.img} resizeMode="cover" />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
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
                        <Text style={styles.infoValue}>40m2</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <FontAwesome6 name="users-viewfinder" size={24} color="#fff" />
                        <Text style={styles.infoLabel}>Số người</Text>
                        <Text style={styles.infoValue}>4</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <FontAwesome6 name="money-bill-alt" size={24} color="#fff" />
                        <Text style={styles.infoLabel}>Giá phòng</Text>
                        <Text style={styles.infoValue}>4.000.000</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <MaterialIcons name="electric-meter" size={24} color="#fff" />
                        <Text style={styles.infoLabel}>Điện</Text>
                        <Text style={styles.infoValue}>3.800 kwh</Text>
                    </View>
                    <View style={styles.infoItem}>
                    <Entypo name="water" size={24} color="#fff" />
                        <Text style={styles.infoLabel}>Nước</Text>
                        <Text style={styles.infoValue}>80.000đ/Người</Text>
                    </View>
                    <View style={styles.infoItem}>
                    <MaterialIcons name="cleaning-services" size={24} color="#fff" />
                        <Text style={styles.infoLabel}>Dịch vụ</Text>
                        <Text style={styles.infoValue}>4.000.000</Text>
                    </View>
                </View>
            </View>
            <ButtonAuth title="Đặt cọc phòng" onPress={handleSubmit}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingVertical:15,
    },
    img: {
        width: 230, // Sử dụng 50% chiều rộng của màn hình
        aspectRatio: 1, // Giữ tỷ lệ khung hình
        margin: 5,
        marginTop: 20,
        // borderRadius: 30,
        borderColor: COLOR.PRIMARY,
        borderWidth: 1,
        borderTopLeftRadius:40,
        borderBottomRightRadius:40,
        marginBottom:10
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
        backgroundColor:COLOR.PRIMARY,
        padding:20, 
        borderTopLeftRadius:30,
        borderBottomRightRadius:30,
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
    },
    infoValue: {
        marginTop: 2,
        fontWeight: "bold",
        color:"#fff"
    },
});

export default PostDetail;
