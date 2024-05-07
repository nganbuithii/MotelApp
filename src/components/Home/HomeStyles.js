import { StyleSheet } from "react-native";
import { SHADOWS, COLOR } from "../common/color";

export default StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    postBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: "100%",
        marginTop: 20,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    postInputContainer: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginLeft: 10,
        width: 280, // Mở rộng theo chiều ngang
        paddingVertical: 18,
    },
    postInputPlaceholder: {
        fontSize: 16,
        color: '#888',
        flex: 1,
        marginRight: 10, // Tạo khoảng cách với biểu tượng pluscircleo
    },

    flexInput: {
        flex: 1,
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
        width: "100%",
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
        padding: 15,
        marginLeft: 'auto',
    },
    txtSmall: {
        marginRight: "auto",
        marginHorizontal: 20,
        marginVertical: 10,
        color: COLOR.color_1,
        fontWeight: "bold"
    },
    // ProfileDetail
    imageProfile: {
        width: "300",
        height: "300"
    },
    userContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    iconPost: {
        marginRight: 12
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
    bellIcon: {
        marginRight: 3,
        marginTop: 10
    },

})