import { StyleSheet } from "react-native";
import { COLOR, SHADOWS } from "../common/color";
export default StyleSheet.create({
    containerStart: {
        marginBottom:200,
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

});
