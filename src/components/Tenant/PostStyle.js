import { StyleSheet } from "react-native"
import { COLOR, SHADOWS } from "../common/color";

export default StyleSheet.create({
    errorText: {
        color: "red",
        fontWeight: "500",
        textAlign: "center"
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.6,

    },


    selectContainer: {
        marginBottom: 5,
        backgroundColor: "#fff",
        marginVertical: 5,
        borderColor: "#fff",
        borderRadius: 5,
        ...SHADOWS.medium
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 20,
    },



    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 30,
        paddingBottom: 30
    },
    input: {
        padding: 10,
        fontSize: 18,
        minHeight: 100,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 20,
        ...SHADOWS.medium
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        alignSelf: 'flex-start',
        marginLeft: 12,
        marginTop: 15
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
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        ...SHADOWS.medium,
        marginTop: 10,
    },

    uploadText: {
        marginLeft: 10,
        fontSize: 16,
        color: "lightgreen",
    },
    selectedImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 60
    },
    deleteImageButton: {
        position: 'absolute',
        top: 5,
        right: 50,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 5,
    },


});