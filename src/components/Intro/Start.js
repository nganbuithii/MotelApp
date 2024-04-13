import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {COLOR, SHADOWS} from '../common/color'
import IntroStyles from "./IntroStyles";

const Start = ({ navigation }) => {
    
return (
    <View style={IntroStyles.containerStart}>
        <TouchableOpacity>
            <Text style={IntroStyles.text} onPress={() => navigation.navigate("Login")}>
            BẮT ĐẦU
            </Text>
        </TouchableOpacity>
    </View>
);
};

export default Start;
