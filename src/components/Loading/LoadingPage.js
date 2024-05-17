// LoadingPage.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleDefault } from "../../Styles/StyleDefault";
import { COLOR } from "../common/color";

const LoadingPage = () => {
    return (
        <SafeAreaView style={[StyleDefault.container, styles.container]}>
            <View style={StyleDefault.flexBoxCol}>
                <Image
                    source={require("../../assets/images/loading.gif")}
                    style={styles.loadingImage}
                />
                <Text style={styles.loadingText}>Chào bạn đến với Naca app</Text>
            </View>
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
        color:COLOR.secondary
    },
});

export default LoadingPage;
