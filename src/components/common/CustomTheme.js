// CustomTheme.js

import { DefaultTheme } from 'react-native-paper';

const CustomTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FF5733', // Màu chính
        accent: '#FFC300', // Màu phụ
        background: '#FFFFFF', // Màu nền
        surface: '#FFFFFF', // Bề mặt (ví dụ: background cho card)
        text: '#333333', // Màu chữ
        placeholder: '#AAAAAA', // Màu chữ mờ
        // Thêm hoặc sửa đổi các giá trị màu khác nếu cần thiết
    },
};

export default CustomTheme;