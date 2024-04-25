import { StyleSheet } from "react-native"
import { COLOR, SHADOWS } from "../components/common/color";


export default StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        alignItems: "center"
    },
    infoContainer: {
        marginTop: 10,
        width: "96%",
        backgroundColor: COLOR.offWhite,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: "gray",
        marginHorizontal: 20,
        paddingVertical:15
    },
    icon: {
        width: 45,
        color: COLOR.secondary,
    },
    input: {
        width: "85%",
        color:"gray"
    },
    label: {
        color: COLOR.finally,
        fontWeight: "500",
        paddingLeft: 10,
        marginTop: 8,
    },
    serviceInfo: {
        marginTop: 15,
        backgroundColor: "#D7FAD4",
        width: "92%",
        alignItems: "center", // Căn giữa theo chiều ngang
        borderRadius:20,
        ...SHADOWS.small,
        paddingVertical:10,
        marginHorizontal:10,
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
        width:"48%"
    },
    buttonText: {
        color: 'white', // Màu chữ
        fontWeight: 'bold', // Độ đậm của chữ
        textAlign:"center"
    },
    saveButton: {
        marginLeft:20,
        backgroundColor: COLOR.PRIMARY, // Màu nền của nút lưu thông tin
    },
    imageMotel:{
        width:200,
        height:200,
        borderRadius:20,
        marginRight:10,
    },
    deleteButton:{
        padding:10,
        backgroundColor:"red",
        width:30,
        height:30,
        borderRadius:20,
        position:"absolute",
        right:3,
        top:0
    },
});
