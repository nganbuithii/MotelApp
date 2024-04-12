// IntroStyles.js

import {StyleSheet} from "react-native";
import {Dimensions} from "react-native";
import {COLOR, SHADOWS} from "../common/color";
const {width, height} = Dimensions.get("screen");

export default StyleSheet.create({
    containerStart: {
        borderRadius: 40,
        width: 200,
        height: 50,
        backgroundColor: COLOR.PRIMARY,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.medium
    },
    text: {
        fontWeight: "500",
        fontSize: 18,
        color: COLOR.offWhite,
    },

    //Dots
    containerDot: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },

    // SliderItem
    containerItem: {
        width,
        height,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Một lớp mờ đen để tạo hiệu ứng overlay
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: "center",
        width: "90%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLOR.PRIMARY,
    },
    description: {
        fontSize: 18,
        marginVertical: 10,
        color: "#fff", // Chuyển màu văn bản thành trắng để phù hợp với nền overlay
        textAlign: "center",
    },
    buttonStart: {
        marginTop: 20, // Khoảng cách giữa nội dung và nút bắt đầu
    },
});
