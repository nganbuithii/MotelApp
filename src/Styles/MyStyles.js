import { StyleSheet } from "react-native"
import { COLOR } from "../components/common/color"

export default StyleSheet.create({
    container :{
        width:'100%',
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white",
    },
    textHead:{
        color:COLOR.PRIMARY,
        fontWeight:"600",
        fontSize:20,
        padding:20,
        textAlign:"center"
    },
    textSmall:{
        color:COLOR.PRIMARY,
        fontWeight:"500",
        textAlign:"center",
        fontSize:20
    },
    row:{
        flexDirection:"row"
    }, 
    img:{
        width:100,
        height:100,
        margin:5
    },
    textNormal:{
        color: "white",
        fontSize:15,
        textAlign:"center",
        fontWeight:"400"
    },
    textNormal2:{
        color: "black",
        fontSize:15,
        textAlign:"center",
        fontWeight:"400"
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center"
    },
    flexN:{
        flexDirection:"row",
        alignItems: 'center',// căn dọc
        justifyContent:"flex-start"
    },
    link:{
        color:COLOR.secondary,
        fontWeight:"500",
    },
    mt20:{
        marginTop:20
    },
    pd10:{
        padding:10
    },
    txtCenter:{
        textAlign:"center",
        fontSize:16
    }
    ,mb20:{
        marginBottom:20
    },
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

})