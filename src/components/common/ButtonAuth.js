import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLOR } from './color';
const ButtonAuth = ({ title, onPress     }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: COLOR.color_1,
        width: '80%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 15,
        marginBottom:20
    },
    buttonText: {
    color: COLOR.offWhite,
    fontWeight: '500',
    fontSize:18
    },
    
})
export default ButtonAuth;