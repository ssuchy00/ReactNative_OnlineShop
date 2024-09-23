import React from "react";
import { Pressable, StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import { COLORS, vw } from "./Consts";

interface IHamburgerProps {
    onPress: ()=>void
}

const Hamburger = (props:IHamburgerProps) => {
    return (
        <TouchableOpacity style={style.mainStyle} onPress={()=>{props.onPress()}}>
            <View style={style.lineStyle}></View>
            <View style={style.lineStyle}></View>
            <View style={style.lineStyle}></View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    mainStyle: {
        width: 60,
        backgroundColor: "#D9D9D9",
        padding: 10,
        paddingTop: 17,
        height: 60
    },

    lineStyle: {
        width: '100%',
        height: 7,
        marginBottom: 5,
        backgroundColor: COLORS.mainColor
    }
})

export default Hamburger