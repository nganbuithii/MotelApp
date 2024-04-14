import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLOR } from './color';

const InputPassword = ({ value, onChangeText }) => {
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);
    
    return (
        <TextInput 
            style={[styles.input]}
            label="Mật khẩu"
            value={value}
            onChangeText={onChangeText}
            selectionColor={COLOR.PRIMARY}
            secureTextEntry={!isPasswordVisible}
            right={<TextInput.Icon icon={isPasswordVisible ? 'eye' : 'eye-off'} onPress={() => setPasswordVisible(!isPasswordVisible)} />}
            theme={{ colors: { primary: COLOR.PRIMARY}}}
        />
    );
};


const styles = StyleSheet.create({
    input: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLOR.PRIMARY, // Sử dụng màu chính từ theme làm màu border
        borderRadius: 5,
        width:'95%',
        marginBottom: 10,
    },
});

export default InputPassword;