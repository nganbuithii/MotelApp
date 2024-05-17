import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleDefault } from "../../Styles/StyleDefault";
import { COLOR } from "../common/color";
import HomeIndex from "../Home/HomeIndex";

const LoadingPage = ({ navigation, route }) => {
    const handleDataLoaded = () => {
        console.log("Trang Home đã tải xong dữ liệu");
        navigation.navigate("Home"); // Chuyển đến trang Home khi dữ liệu đã được tải xong
    };

    return (
        <SafeAreaView style={[StyleDefault.container, styles.container]}>
            <View style={StyleDefault.flexBoxCol}>
                <Image
                    source={require("../../assets/images/loading.gif")}
                    style={styles.loadingImage}
                />
                {/* <Text style={styles.loadingText}>Chào bạn đến với Naca app</Text> */}
            </View>
            <HomeIndex route={route} onDataLoaded={handleDataLoaded} />
 
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    loadingImage: {
        width: 120,
        height: 120,
    },
    loadingText: {
        fontSize: 24,
        fontWeight: "700",
        color: COLOR.secondary
    },
});

export default LoadingPage;
