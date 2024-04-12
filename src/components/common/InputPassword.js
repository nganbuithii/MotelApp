import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLOR } from './color';

const InputPassword = () => {
    
    const [text, setText] = React.useState('');
    // set trạng thái hiện pass = false là ẩn
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);
    return (
        <TextInput 
            style={[styles.input]}
            label="Mật khẩu"
            selectionColor={COLOR.PRIMARY}
            // prop secure là ẩn pass nếu prop là true(ẩn) -> is pass là true
            secureTextEntry={!isPasswordVisible}
            right={<TextInput.Icon icon={isPasswordVisible ? 'eye' : 'eye-off'}
            onPress={() => setPasswordVisible(!isPasswordVisible)} />}

            theme={{ colors: { primary: COLOR.PRIMARY}}} // Thiết lập màu chính cho TextInput
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