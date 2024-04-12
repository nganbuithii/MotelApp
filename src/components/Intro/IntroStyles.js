import { StyleSheet } from "react-native";
import { Dimensions} from "react-native";
import { COLOR, SHADOWS } from "../common/color";
const { width, height } = Dimensions.get("screen");

export default StyleSheet.create({
    containerStart: {
        // marginBottom:50,
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
        fontWeight:"500",
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
        alignItems: "center",
        backgroundColor: "#fff",
        position: 'relative', // Đặt position thành relative
    },
    image: {
        flex: 0.6,
        width: "100%",
    },
    content: {
        flex: 0.3,
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
        color: "#333",
        textAlign: "center",
    },
    buttonStart: {
        position: 'absolute', // Đặt position thành absolute
        bottom: 150, // Đặt bottom để cố định nút "Start" ở dưới cùng với margin-bottom là 20
    },
});
