import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { StyleDefault } from "../../Styles/StyleDefault";
import { COLOR } from "../common/color";

const LoadingPage = () => {

    return (
        <View style={[StyleDefault.container, styles.container]}>

            <View style={StyleDefault.flexBoxCol}>
                <Image
                    source={require("../../assets/images/loading.gif")}
                    style={styles.loadingImage}
                />
                <Text>Vui lòng đợi giây lát</Text>
            </View>


        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject, // Chiếm toàn bộ không gian
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Màu nền mờ
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999, // Sắp xếp trên tất cả các thành phần khác
    },
    loadingImage: {
        width: 100,
        height: 100,
    },
    loadingText: {
        fontSize: 24,
        fontWeight: "700",
        color: COLOR.secondary
    },
});

export default LoadingPage;
