import { StyleSheet } from "react-native";
import { SHADOWS, COLOR } from "../common/color";

export default StyleSheet.create({
        flex:{
            flex:1,
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        postBar: {
            marginTop:35,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            // backgroundColor: '#f0f0f0',
            borderRadius: 10,
            marginVertical: 10,
            width: '100%', // Độ rộng 100%
        },
        postInputContainer: {
            flex: 1,
            marginLeft: 10,
            backgroundColor: '#f0f0f0',
            padding:10,
            borderRadius:10
        },
        postInput: {
            flex: 1,
            fontSize: 16,
            backgroundColor: 'transparent', // Màu nền của ô TextInput là trong suốt
        },
        plusButton: {
            padding: 5,
        },
        image: {
            width: 50, // Độ rộng của ảnh
            height: 50, // Độ cao của ảnh
            resizeMode: 'cover', // Chế độ hiển thị của ảnh
            marginRight: 10,
            borderRadius:50
        },
        flexInput: {
            flex:1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        // ProfileScreen
        profileContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#ffffff',
            borderRadius: 5,
            elevation: 3,
            width:"100%",
            ...SHADOWS.medium
        },
        profileInfo: {
            flex: 1,
        },
        profileName: {
            fontSize: 18,
            fontWeight: 'bold',
            color: COLOR.color_1,
        },
        detailLink: {
            color: COLOR.input_default,
        },
        iconContainer: {
            padding:15,
            marginLeft: 'auto', 
        },
        txtSmall:{
            marginRight:"auto",
            marginHorizontal:20,
            marginVertical:10,
            color:COLOR.color_1,
            fontWeight:"bold"
        },
        // ProfileDetail
        imageProfile:{
            width:"300",
            height:"300"
        },
        userContainer:{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
            width:"100%"
        },
        iconPost: {
            marginRight: 12
        },

    })