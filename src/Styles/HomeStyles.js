import { StyleSheet } from "react-native";
import { SHADOWS, COLOR } from "../components/common/color";

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

    postContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    userInfoContainer: {
        width: "70%",
        flexDirection: "row",
        alignItems: "center",
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 2,
        borderColor: COLOR.color3,
    },
    userName: {
        fontWeight: "bold",
    },
    btnFollow: {
        backgroundColor: COLOR.input_default,
        padding: 5,
        paddingVertical: 5,
        borderRadius: 25,
        flexDirection: "row",
    },
    //BADGE
    badgeContainer: {
        backgroundColor: COLOR.color12,
        width: "12%",
        padding: 7,
        borderRadius: 15,
        paddingVertical: 7,
        paddingHorizontal: 10,
        position: "absolute",
        right: "4%",
        top: "80%",
    },
    badgeText: {
        color: "#fff",
    },
    //modal box
    modalContainer: {
        position: "absolute",
        top: 80,
        right: 20,
        backgroundColor: COLOR.bg_color1,
        padding: 10,
        zIndex: 9999,
        elevation: 5,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    optionText: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    //mô tả
    desc: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        fontSize: 16,
    },
    //modal box
    modalContainer: {
        position: "absolute",
        top: 80,
        right: 20,
        backgroundColor: COLOR.bg_color1,
        // borderRadius: 10,
        padding: 10,
        zIndex: 9999,
        elevation: 5, // Độ đục của modal (Android)
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    optionText: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    //mô tả
    desc: {
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    //BADGE
    badgeContainer: {
        backgroundColor: COLOR.color12,
        width: "12%",
        padding: 7,
        borderRadius: 15,
        paddingVertical: 7,
        paddingHorizontal: 10,
        position: "absolute",
        right: "4%", // Thay vị trí cố định bằng phần trăm
        top: "80%", // Thay vị trí cố định bằng phần trăm
    },
    badgeText: {
        color: "#fff",
    },

})