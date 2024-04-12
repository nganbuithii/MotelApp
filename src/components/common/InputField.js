import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLOR, SHADOWS } from './color';

const InputField= ({label, newStyle}) => {
    const [text, setText] = React.useState("");

    return (
        <TextInput  style={StyleSheet.flatten([styles.input, newStyle])}
        label={label}
        value={text}
        onChangeText={text => setText(text)}
        theme={{ colors: { primary: COLOR.PRIMARY}}}
        />
    );
};
const styles = StyleSheet.create({
    input: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLOR.PRIMARY,
        borderRadius: 5,
        marginBottom: 10,
        width:'95%',
    }
});
export default InputField;