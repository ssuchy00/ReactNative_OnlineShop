import React from "react";
import { IItem } from "../../Interfaces/IItem";
import { StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle } from "react-native";
import { borderBottomStyle, borderStyle, margin } from "../../style/style"; 
import { COLORS } from "../Consts";

export interface IHorizontalScrollListElementProps {
    item: IItem,
    style?: StyleProp<ViewStyle>
}

const HorizontalScrollListElement = (props:IHorizontalScrollListElementProps) => {
    return (
        <View style={{...StyleSheet.flatten(props.style), ...style.mainStyle}}>
            <View style={style.topContainerStyle}>
                {/* Box */}
                <View style={style.boxStyle}></View>
                {/* Image */}
                <View style={style.imageContainerStyle}></View>

            </View>

            {/* Title */}
            <View style={style.textContainerStyle}>
                <Text style={{...style.textStyle, ...style.nameStyle}}>{props.item.name}</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    mainStyle: {
        
    },
    topContainerStyle: {
        position: "relative",
        width: '100%',
        aspectRatio: 1
    },
    imageContainerStyle: {
        aspectRatio: 1,
        position: "absolute",
        width: '100%',
        // backgroundColor: "blue",
        
        ...borderStyle(10, 'blue'),
        borderRadius: 1000
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    }, 
    boxStyle: {
        width: '90%',
        aspectRatio: 1,
        backgroundColor: "lightgray",
        borderRadius: 10,
        position: "absolute",
        margin: '5%',

    },
    textContainerStyle: {
        width: '90%',
        margin: '5%',
        marginTop: 5
    },
    textStyle: {
        color: "black"
    },
    nameStyle: {
        fontSize: 27,
        textAlign: 'center',
        fontWeight: 'bold'
    }, 
})

export default HorizontalScrollListElement