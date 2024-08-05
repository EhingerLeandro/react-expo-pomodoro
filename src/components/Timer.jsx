import {View, Text, StyleSheet, time} from "react-native";

export default function Timer ({time}){
   const formatTime = `${Math.floor(time/60)
    .toString()
    .padStart(2,"0")}:${(time%60)
        .toString()
        .padStart(2,"0")}`
   
    return(
    <View style={styles.container}>
        <Text style={styles.timer}>{formatTime}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center",
        padding:15,
        borderRadius:15, 
        flex:0.3,

    },
    timer:{
        fontWeight:"bold",
        textAlign:"center",
        fontSize:80,
        color:"#333"
    }
})