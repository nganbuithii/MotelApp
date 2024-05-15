import { StyleSheet } from "react-native";
import { SHADOWS, COLOR } from "../components/common/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    navContainer: {
        width: "100%",
    },
    nav: {
        width: "100%",
        alignContent: "center"
    },
    tab: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: COLOR.color11,
        paddingVertical: 15,
        paddingLeft: 10,
        paddingTop: 20,
        ...SHADOWS.medium,
    },
    textHead: {
        fontSize: 18,
        color: COLOR.PRIMARY,
        fontWeight: "500",
        textAlign: "center",
        marginTop: 10,
        marginLeft: 10
    },
    textAdd: {
        color: "#fff",
        fontWeight: "500",
        textAlign: "center",
        marginTop: 10,
        marginLeft: 10
    },
    buttonAdd: {
        backgroundColor: COLOR.color12,
        padding: 8,
        borderRadius: 20,
        ...SHADOWS.medium,
        flexDirection: "row",
        marginTop: 10,
        paddingBottom:15,
        paddingHorizontal:20,

    },
    containerMotel: {
        width: "98%",
        ...SHADOWS.medium,
        // borderRadius:30,
        backgroundColor: COLOR.offWhite,
        padding: 10,
        // borderTopLeftRadius: 40,
        // borderTopRightRadius: 30,

        marginTop: 10,
        borderRadius: 30,
        marginBottom: 10
    },
    imgMotel: {
        width: "55%",
        height: 200,
    },
    tag: {
        flexDirection: "row",
        padding: 5,
        borderRadius: 10,
        backgroundColor:COLOR.color11,
        marginTop: 3,
        marginLeft: 5,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: COLOR.offWhite,
        paddingRight:10,

    }
    , iconTag: {
        paddingHorizontal: 10
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: 5,

    },
    buttonText: {
        marginLeft: 5,
        fontSize: 12
    },
    editButton: {
        backgroundColor: "#FFD700",
    },
    deleteButton: {
        backgroundColor: "#FF6347",
    },
    badgeContainer: {
        position: 'absolute',
        top: 100,
        right: 10, // Hoặc left: 10 nếu bạn muốn đặt badge ở góc trái
        // backgroundColor:COLOR.color6,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    badgeText: {
        color: COLOR.PRIMARY,
        fontSize: 12,
    },
    imageContainer: {
        position: "relative"
    }









});