import { View, Text, StyleSheet, Platform, 
    TouchableOpacity} from "react-native";
import {useState, useEffect} from "react";
import {HeaderTab} from "../src/components/Header";
import Timer from "../src/components/Timer"
import {Audio} from "expo-av";

const colors: string[]=["#FD6", "#ADC", "#DBE"];

export default function Main (){
    const [isWorking, setIsWorking] = useState(true);
    const [time, setTime] = useState(25*60);
    const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(()=>{
        let interval = null;
        if(isActive){
            interval= setInterval(()=>{
                setTime(prevTime=> prevTime  -1);
            }, 1000);
        }else{
            clearInterval(interval);
        }

        if(time === 0){
            setIsActive(false);
            setTime(isWorking ? 1500 : 300);
            setCurrentTimeIndex(isWorking ? 0 : 2);
        }

        return ()=>clearInterval(interval);
    },[isActive, time]);

    async function playSound(){
        const {sound} = await Audio.Sound.createAsync(
            require("../assets/button-audio.mp3")
        )
        await sound.playAsync();
    }

    function handleActive (){
        playSound()
        setIsActive(!isActive);
    }

    return(
        <View style={[styles.container, {backgroundColor: colors[currentTimeIndex]}]}>
            <View style={{paddingHorizontal:15, 
            paddingTop: 35,
            flex:1}}>
                <View style={styles.containerTabs}>
                    <Text style={styles.textsTitle}>POMODORO LEANDRO</Text>
                    <HeaderTab setTime={setTime} 
                    currentTimeIndex={currentTimeIndex} 
                    setCurrentTimeIndex={setCurrentTimeIndex} 
                    setIsActive={setIsActive}/>
                </View>
                <Timer time={time}/>
                <TouchableOpacity style={styles.buttonStart} onPress={handleActive}>
                    <Text style={{color:"#fff",
                        fontWeight: "bold",
                        textAlign:"center"
                    }}>{isActive ? "STOP" : "START"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerTabs:{
        marginBottom:20,
        justifyContent:"center",
        alignItems:"center"
    },
    container:{
        height:"100%",
        width:"100%",
    },
    buttons:{
        color:"#aaa"
    },
    buttonStart:{
        backgroundColor:"#444",
        alignItems:"center",
        padding:15,
        marginTop:25,
        borderRadius: 15
    },
    textsTitle:{
        marginBottom:20,
        fontWeight:"bold",
        fontSize:25,
        color:"#333"
    }
})