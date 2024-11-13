import React from "react";
import { IItem } from "../../Interfaces/IItem";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { IHorizontalScrollListElement } from "../../Interfaces/IHorizontalScrollListElement";
import { borderStyle } from "../../style/style";

export interface IHorizontalScrollList_CategoryProps {
    item: IHorizontalScrollListElement,
    style?: StyleProp<ViewStyle>
}

const HorizontalScrollList_Category = (props:IHorizontalScrollList_CategoryProps) => {
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
                <Text style={{...style.textStyle, ...style.nameStyle}}>{props.item.title}</Text>
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
        marginTop: 5,
        overflow: "hidden",
        height: 45
    },
    textStyle: {
        color: "black"
    },
    nameStyle: {
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold'
    }, 
})
 

export default HorizontalScrollList_Category