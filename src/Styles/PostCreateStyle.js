import { StyleSheet } from "react-native"
import { COLOR, SHADOWS } from "../components/common/color"

export default StyleSheet.create({

    scrollView: {
        flex: 1,
        backgroundColor: COLOR.bg_color1,
    },
    container: {
        flex: 1,
        padding: 10,

        alignItems: 'center',

    },
    containerBody: {
        backgroundColor: COLOR.offWhite,
        // padding:10,
        borderRadius: 15,
        marginTop: 20,
        width: "100%",
        paddingBottom: 20,
        alignContent: "center",
        alignItems: "center",
        ...SHADOWS.medium
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 'auto'
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 40,
        marginRight: 10,
        borderWidth: 2,
        borderColor: COLOR.PRIMARY
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    inputContainer: {
        borderWidth: 0,
        marginBottom: 10,
        width: "100%",
    },
    input: {
        padding: 10,
        fontSize: 18,
        minHeight: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 10,
        marginHorizontal: 12
    },
    input1: {
        padding: 10,
        fontSize: 18,
        minHeight: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 10,
        marginHorizontal: 12
    },
    imagePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        marginBottom: 8,
        marginHorizontal: 10,
        ...SHADOWS.small,
        width: "94%"
    },
    imagePickerText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    inputIcon: {
        marginRight: 10,
        color: COLOR.PRIMARY
    },
    houseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.bg_color1,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        ...SHADOWS.small,
        width: "94%",
        alignContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10,
    },
    thumbnail: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    houseInfo: {
        flex: 1,
    },
    ItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemAddress: {
        fontSize: 16,
        color: '#333333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        alignSelf: 'flex-start',
        marginLeft: 12,
        marginTop: 15
    },
    errorText: {
        color: "red",
        fontWeight: "500",
        textAlign: "right"
    }


});