import { StyleSheet } from "react-native"
import { COLOR } from "../components/common/color"

export default StyleSheet.create({
    container :{
        width:'100%',
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    textHead:{
        color:COLOR.PRIMARY,
        fontWeight:"600",
        fontSize:20,
        padding:20,
        textAlign:"center"
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
    },
    link:{
        color:COLOR.secondary,
        fontWeight:"500",
    },
    mt20:{
        marginTop:20
    }
    
})