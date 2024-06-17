import { StyleSheet } from "react-native"
import { COLOR, SHADOWS } from "../components/common/color";


export default StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
    },
    bgHead: {
        width: "100%",
        height: 120,
        opacity: 0.2,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 60,
        position: "absolute",
        top: -55,
        left: 40,
        borderWidth: 3,
        borderColor: COLOR.PRIMARY,
    },
    containerProfile: {
        position: "relative",
        height: 55,
        width: "100%",
        // backgroundColor: COLOR.color6
    },
    btnFollow1: {
        flexDirection: "row",
        backgroundColor: COLOR.PRIMARY,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginLeft: 85,
        position: "absolute",
        top: 0,
        left: 55,
        marginRight: 10,
    },
    btnFollow2: {
        flexDirection: "row",
        backgroundColor: COLOR.PRIMARY,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginLeft: 83,
        position: "absolute",
        top: 0,
        left: 160,
    },
    containerInfo: {
        width: "100%",
        paddingHorizontal: 20,
        // backgroundColor: COLOR.color6,
    },
    txtName: {
        color: COLOR.PRIMARY,
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 3,
        marginLeft: 8,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    infoText: {
        
        marginLeft: 20,
        width:"90%"
        // color:COLOR.PRIMARY,
        // fontWeight:"500"
    },
    infoTxt: {
        
        marginLeft: 20,
        // width:"90%"
        // color:COLOR.PRIMARY,
        // fontWeight:"500"
    },
    separator: {
        marginHorizontal: 5,
        color: "#000",
    },
    icon: {
        marginLeft: 4,
        marginRight: 10,
    },
    buttonContainer: {
        marginTop: 10,
        width: "100%",
        backgroundColor: "#fff", // Màu nền mới
        padding: 10, // Padding cho các view chứa thông tin nhà trọ
        borderRadius: 8, // Bo tròn các góc
        ...SHADOWS.medium,
    },
    buttonText: {
        color: COLOR.PRIMARY,
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 30,
        marginBottom: 10,
    },
    imgMotel: {
        width: "50%",
        height: 200,
        marginRight: 5,
        borderRadius:20,
    },
    infoContainer: {
        marginBottom: 20,
        // borderRadius:10,
        backgroundColor:COLOR.offWhite,
        padding:15,
        borderRadius:30,
        ...SHADOWS.medium
    },
    followButton: {
        backgroundColor: COLOR.PRIMARY,
    },
    followingButton: {
        backgroundColor: COLOR.PRIMARY, // Màu xanh (hoặc bất kỳ màu nào bạn muốn)
    },
    btnOption:{
        backgroundColor:COLOR.PRIMARY,
        // marginHorizontal:10,
        padding:20,
        width:"100%",
        textAlign:"center",

    },
    btnOption2:{
        backgroundColor:COLOR.PRIMARY,
        // marginHorizontal:10,
        padding:20,
        width:"100%"
    },
    containerOption:{
        flexDirection:"row",
        justifyContent:"center"
    },
    //POST
    postContainer: {
        marginBottom: 20,
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop:10,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postContent: {
        marginBottom: 10,
    },
    postImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    noPostsText: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    postActions: {
        flexDirection: 'row',
        justifyContent:"flex-end"
    },
    postActionIcon: {
        marginLeft: 10,
        marginTop:20,
        padding:10,
        backgroundColor:COLOR.offWhite,
        ...SHADOWS.small,
        borderRadius:10,
    },
});