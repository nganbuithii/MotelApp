import * as React from 'react';
import { Checkbox } from 'react-native-paper';
import { COLOR } from './color';

const CheckBox = () => {
    const [checked, setChecked] = React.useState(false);

    return (
        <Checkbox
        theme={{ colors: { primary: COLOR.PRIMARY}}}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
            setChecked(!checked);
        }}
        />
    );
};

export default CheckBox;