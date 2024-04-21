import { StyleSheet } from "react-native"
import { COLOR, SHADOWS } from "../components/common/color";


export default StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: COLOR.color3,
        alignContent: "center",
        alignItems: "center"
        // justifyContent:"center"
    },
    infoContainer: {
        marginTop: 10,
        width: "96%",
        backgroundColor: COLOR.offWhite,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: "#fff"
        borderBottomWidth: 1,
        borderRadius: 5,
        padding: 10,
        //marginVertical: 5,
        borderColor: "gray",
        // backgroundColor: "#fff",
        // paddingHorizontal:10,
        marginHorizontal: 20,
    },
    icon: {
        width: 45,
        color: COLOR.secondary,
    },
    input: {
        width: "85%",
        // padding: 5
    },
    label: {
        color: COLOR.finally,
        fontWeight: "500",
        paddingLeft: 10,
        marginTop: 5,
    },
    serviceInfo: {
        marginTop: 15,
        backgroundColor: "#D7FAD4",
        width: "100%",
        alignItems: "center", // Căn giữa theo chiều ngang
        borderRadius:20,
        ...SHADOWS.small,
        paddingVertical:10,
    },
    labelService: {
        color: COLOR.PRIMARY,
        fontWeight: "500",
        textAlign: "center",
        marginBottom: 10, // Khoảng cách với phần thông tin dịch vụ
    },
    serviceRow: {
        flexDirection: "row",
        flexWrap: "wrap", // Cho phép flex wrap khi chiều rộng hết chỗ
        justifyContent: "space-between", // Căn các ô điện đều nhau theo chiều ngang
        width: "90%", // Đảm bảo chiều rộng tối đa là 90% của serviceInfo
        marginTop: 10, // Khoảng cách giữa các dòng
    },
    serviceIt: {
        flexDirection: "column", // Xếp theo hàng ngang
        alignItems: "center", // Căn giữa theo chiều dọc
        borderColor: COLOR.PRIMARY,
        borderWidth: 1,
        width: "30%", // Chiều rộng mỗi ô điện
        borderRadius: 10,
        height: 150,
        justifyContent: "center", // Căn các phần tử đều nhau theo chiều ngang
        paddingHorizontal: 10, // Khoảng cách ngang bên trong
        marginVertical: 5, // Khoảng cách dọc
    },
    iconEdit: {
        padding: 5,
        backgroundColor: COLOR.color6,
        borderRadius: 20,
        marginTop: 5,
        paddingHorizontal: 10
        // fontSize:10
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 20,
        padding: 10,
        backgroundColor: COLOR.PRIMARY,
        borderRadius: 10,
        ...SHADOWS.medium

    },
    addButtonText: {
        marginRight: 10,
        color: "#fff"
    },
    imageMotel: {
        width: 120,
        height: 120,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        paddingBottom: 20
    },
    containerBtn: {
        flexDirection: 'row', // Xếp theo hàng ngang
        justifyContent: 'space-between', // Căn các nút ra hai bên
        paddingHorizontal: 20, // Khoảng cách ngang từ lề trái và lề phải
        marginTop: 20, // Khoảng cách từ phần trên của container
    },
    button: {
        backgroundColor: 'orange', // Màu nền của nút
        paddingVertical: 10, // Khoảng cách dọc bên trong nút
        paddingHorizontal: 20, // Khoảng cách ngang bên trong nút
        borderRadius: 5, // Độ cong viền nút
    },
    buttonText: {
        color: 'white', // Màu chữ
        fontWeight: 'bold', // Độ đậm của chữ
    },
    saveButton: {
        marginLeft:80,
        backgroundColor: COLOR.PRIMARY, // Màu nền của nút lưu thông tin
    },
});
