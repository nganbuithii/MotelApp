import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLOR } from './color';

const InputField= ({label}) => {
    const [text, setText] = React.useState("");

    return (
        <TextInput style={styles.input}
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
        //padding: 10,
        marginBottom: 10,
        width:'95%'
    }
});
export default InputField;