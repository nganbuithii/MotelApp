import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Start = ({ navigation }) => {
return (
    <View style={styles.container}>
    <TouchableOpacity>
        <Text style={styles.text} onPress={() => navigation.navigate("Login")}>
        Start
        </Text>
    </TouchableOpacity>
    </View>
);
};

export default Start;

const styles = StyleSheet.create({
    container: {
        marginBottom:200,
        borderRadius: 40,
        width: 200,
        height: 50,
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        textTransform: "uppercase",
        fontSize: 18,
        color: "#fff",
    },
});
