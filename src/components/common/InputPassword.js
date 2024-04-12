import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLOR } from './color';

const InputPassword = () => {
    const [text, setText] = React.useState('');

    return (
        <TextInput 
            style={[styles.input]}
            label="Mật khẩu"
            selectionColor={COLOR.PRIMARY}
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
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