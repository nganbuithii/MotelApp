import { StyleSheet } from 'react-native';
import { COLOR, SHADOWS } from '../../components/common/color';

export default StyleSheet.create({

    buttonGG: {
        borderWidth: 1, // Thêm đường viền
        borderColor: COLOR.PRIMARY, // Màu đường viền
        borderRadius: 5, // Bo góc của ảnh
        padding: 7, // Khoảng cách giữa đường viền và ảnh
        alignItems: 'center', // Canh giữa theo chiều ngang
        backgroundColor:COLOR.PRIMARY
        
    }, 
    icon: {
        width: 24,
        height: 24,
        padding:10,
        marginRight: 10, // Khoảng cách giữa ảnh và văn bản
    },
    mt15:{
        marginTop:15
    },
    formContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        backgroundColor: COLOR.offWhite,
        borderRadius: 15,
        padding: 25,
    },
    shadow: {
        elevation: 5, // Độ sâu của bóng
        shadowColor: "#000", // Màu của bóng
        shadowOffset: { width: 0, height: 2 }, // Độ đổ bóng theo chiều ngang và dọc
        shadowOpacity: 0.25, // Độ mờ của bóng
        shadowRadius: 3.84, // Bán kính của bóng
    },
    flex: {
        width:"100%"
    }
})  