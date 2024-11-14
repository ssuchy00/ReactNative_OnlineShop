import React from "react";
import { StyleSheet, Text, View } from "react-native"; 
import Core from "../Components/Core";
import { vw } from "../Components/Consts";
import { margin } from "../style/style";
import { IProduct } from "../Interfaces/IApiResponse";

export interface IItemProps {
    item:IProduct,
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
                {/* Description */}
                <Text style={style.descriptionStyle}>{route.params.item.description}</Text>

            </View>
        </Core>
    )
}

const style = StyleSheet.create({
    mainStyle: {
        padding: 0,
        marginBottom: 10
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
        fontSize: 30,
        color: "black"
    },
    descriptionStyle: {
        fontSize: 20,
        color: "gray",
        marginTop: 30
    },
    priceStyle: {
        color: "orange",
        fontSize: 35,
        fontWeight: "bold"
    }
})

export default Item