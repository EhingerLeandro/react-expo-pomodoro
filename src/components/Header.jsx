import { View, Text, TouchableOpacity, StyleSheet} from "react-native";

const options = ["Pomodoro", "Long Break", "Short Break"];

export function HeaderTab ({setTime, currentTimeIndex, setCurrentTimeIndex, setIsActive}) {

    const handlePress =(ind)=>{
        const newTime = ind === 0 ? 25 : ind === 1 ? 15 : 5;
        setTime(newTime*60);
        setCurrentTimeIndex(ind);
        setIsActive(false);
    }

    return(
        <View style={styles.viewContain}>
            {options.map((item, index)=>(
                <TouchableOpacity key={index} 
                style={[styles.itemDesing, 
                        currentTimeIndex !==index && {borderColor:"transparent"}
                ]} 
                onPress={()=>handlePress(index)}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    viewContain:{
        flexDirection:"row"
    },
    itemDesing:{
        borderWidth:3,
        padding:5,
        width:"33%",
        alignItems:"center",
        borderRadius:10,
        borderColor:"#fff"
    }
})