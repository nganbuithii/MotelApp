import React from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';

const showToast = ({type, text1, text2}) => {
    Toast.show({type: type,text1: text1,text2: text2,visibilityTime: 3000, autoHide: true, 
    });
}

export default showToast;
