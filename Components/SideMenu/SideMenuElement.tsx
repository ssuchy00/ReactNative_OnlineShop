import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { borderBottomStyle } from "../../style/style";

export interface ISideMenuElementProps {
    text: string,
    onPress: ()=>void,
    last?:boolean
}

const SideMenuElement = (props:ISideMenuElementProps) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{...style.mainStyle, ...borderBottomStyle(props.last?2:1, "#888"), marginBottom: (props.last?20:0)}}>
           <Text style={{...style.textStyle}}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    mainStyle: {
        width: '90%',
        marginTop: 10,
        padding: 5, 
    },
    textStyle: {
        fontSize: 20,
        color: "#444"
    }
})

export default SideMenuElement