import React from "react";
import { Text, View, TextInput } from "react-native";
import EditMotelStyle from "../../Styles/EditMotelStyle";

const InputEditMotel = ({ label, value, onChangeText, placeholder }) =>{
    return (
        <View  style={EditMotelStyle.input} >
            {/* <Text>{label}</Text> */}
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={EditMotelStyle.input}
            />
        </View>
    );}
export default InputEditMotel;