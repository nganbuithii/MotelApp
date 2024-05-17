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
    title: {
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
      },
    containerMotel: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 3,
      },
      infoContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
      },
      infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
    imgMotel: {
        width: "50%",
        height: 200,
        padding:20
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
    },
    containerMotel: {
        backgroundColor:COLOR.offWhite,
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 3,
        marginHorizontal:10,
        marginTop:10,
        width:"92.5%"
    },
    title: {
        textAlign: 'center',
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    icon: {
        marginRight: 5,
    },
    infoText: {
        fontSize: 14,
        // color:COLOR.PRIMARY,
        // fontWeight:"bold"
    },
    locationContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    locationText: {
        fontSize: 14,
        // color:COLOR.PRIMARY,
        // fontWeight:"bold",
        width:"94%"
    },
    image: {
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop:10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginLeft:10,
        ...SHADOWS.medium
    },
    editText: {
        color: 'black',
        marginRight: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        marginLeft:5,
    },
    editButton: {
        backgroundColor: 'orange',
    },
    deleteButton: {
        backgroundColor: 'red',
    },








});