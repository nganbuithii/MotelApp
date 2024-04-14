import * as React from 'react';
import { Checkbox } from 'react-native-paper';
import { COLOR } from './color';

const CheckBox = ({ checked, onPress }) => {
    const [isChecked, setIsChecked] = React.useState(checked);

    const handlePress = () => {
        setIsChecked(!isChecked); // Toggle checkbox state
        onPress && onPress(!isChecked); // Pass the new state to the parent component
    };

    return (
        <Checkbox
            theme={{ colors: { primary: COLOR.PRIMARY }}}
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={handlePress}
        />
    );
};

export default CheckBox;