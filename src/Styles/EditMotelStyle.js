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
        width: "75%",
        color:"gray",
        paddingHorizontal:10,
        paddingVertical:10,
    },
    label: {
        color: COLOR.finally,
        fontWeight: "500",
        paddingLeft: 10,
        marginTop: 8,
    },
    serviceInfo: {
        marginTop: 15,
        backgroundColor:COLOR.bg_color1,
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
        flexWrap: "wrap", 
        width: "90%",
        marginTop: 10, 
    },
    serviceIt: {
        flexDirection: "column", 
        alignItems: "center", 
        borderColor: COLOR.offWhite,
        borderWidth: 1,
        width: "45%", 
        borderRadius: 10,
        height: 140,
        justifyContent: "center", // Căn các phần tử đều nhau theo chiều ngang
        paddingHorizontal: 10, // Khoảng cách ngang bên trong
        marginVertical: 5, // Khoảng cách dọc
        marginHorizontal:5,
        backgroundColor:COLOR.offWhite,
        ...SHADOWS.small
    },
    iconEdit: {
        padding: 5,
        backgroundColor: COLOR.color6,
        borderRadius: 20,
        marginTop: 5,
        paddingHorizontal: 10,
        marginLeft:15,
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
        width:"48%",
        justifyContent:"center",
        alignContent:"center"
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
