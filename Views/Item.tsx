import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IItem } from "../Interfaces/IItem";
import Core from "../Components/Core";
import { vw } from "../Components/Consts";
import { margin } from "../style/style";

export interface IItemProps {
    item:IItem,
}

const Item = ({route}:{route:{params:IItemProps}}) => { 
    return (
        <Core>
            <View style={style.mainStyle}>
                {/* Image */}
                <View style={style.imgViewStyle}></View>
                {/* Title */}
                <Text style={style.titleStyle}>{route.params.item.name}</Text>
                {/* Price */}
                <Text style={style.priceStyle}>{route.params.item.price.toFixed(2)} PLN</Text>
            </View>
        </Core>
    )
}

const style = StyleSheet.create({
    mainStyle: {
        padding: 0
    }, 
    
    imgViewStyle: {
        ...margin(-10, 0, 10, -10),
        width: vw(100),
        aspectRatio: 1,
        backgroundColor: "red"
    },
    imgStyle: {

    },
    titleStyle: {
        fontSize: 25,
        color: "black"
    },
    priceStyle: {
        color: "orange",
        fontSize: 35,
        fontWeight: "bold"
    }
})

export default Item