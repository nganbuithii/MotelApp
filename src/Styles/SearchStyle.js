import { StyleSheet } from "react-native"
import { COLOR, SHADOWS } from "../components/common/color"

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLOR.bg_color1,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#fff"
    },
    icon: {
        width: 45,
        color: COLOR.PRIMARY,
    },
    selectContainer: {
        marginBottom: 5,
        backgroundColor: "#fff",
        marginVertical: 5,
        borderColor: "#fff",
        borderRadius: 5,
    },
    formContainer: {
        paddingHorizontal: 30,
        paddingBottom: 20,
        color: COLOR.offWhite,
    },
    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 30,
        paddingBottom: 30,
        marginTop: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderColor: 'gray',
        // borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 30,
        backgroundColor: "#fff",
        marginBottom: 10,
        marginHorizontal: 10,
    },
    inputSearch: {
        marginLeft: 10,
        flex: 0.95,
        fontSize: 16,
        backgroundColor: "#fff",
        padding: 10,

    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#fff"
    },
    icon: {
        width: 45,
        color: COLOR.PRIMARY,
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    sortText: {
        marginRight: 10,
        fontSize: 16,
    },
    sortButton: {
        padding: 8,
        borderRadius: 5,
        backgroundColor: COLOR.PRIMARY,
        marginRight: 10,
    },
    sortButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },

    itemContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 15,
        backgroundColor: "#fff",
        padding: 10,
        ...SHADOWS.small,
        borderRadius: 10,

    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,

    },
    infoContainer: {
        flex: 1,
        // backgroundColor:"#fff",
        paddingHorizontal: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    noResultText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    xoaLoc: {

        marginLeft: "auto",
        paddingHorizontal: 20,
        marginTop: 20,
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.6,

    },

});