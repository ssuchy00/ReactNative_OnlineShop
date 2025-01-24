import React from "react";
import { IProduct } from "../../Interfaces/IApiResponse";
import { StyleSheet, Text, View } from "react-native";
import { borderBottomStyle, borderStyle } from "../../style/style";
import { COLORS } from "../Consts";
import Overflow from "../SearchViewComponents/Overflow";

interface ICartItemProps {
    product: IProduct | null
    count: number
}

const CartItem = (item:ICartItemProps) =>{
    return (
        <View style={style.main}>
            {/* img */}
            <View style={style.imgStyle}></View>

            {/* Desc */}
            <View>
            {/* Name */}
                <Text style={style.nameStyle}>{item.product?.name}</Text>
                {/* Price container */}
                <View style={style.priceContainerStyle}>
                    {/* Price */}
                    <Text style={{...style.priceContainerTextStyle, ...style.priceStyle}}>{item.product?.price} PLN </Text> 
                    {/* Count */}
                    <Text style={style.priceContainerTextStyle}>x</Text>
                    <Text style={{...style.priceContainerTextStyle, ...style.countStyle}}>{item.count}</Text>
                    
                </View>
                <View style={style.priceContainerStyle}>
                    {/* Sum */}
                    <Text style={style.priceContainerTextStyle}>Razem: </Text>

                    <Text style={{...style.priceContainerTextStyle, ...style.sumStyle}}>{item.count * (item.product?.price??0)} PLN</Text>
                </View>
           
            </View>
            <Overflow style={style.overflowStyle}/>
        </View>
    )
} 

const style = StyleSheet.create({
    main: {
        backgroundColor: "#ddd",
        margin: 5,
        padding: 5,
        display: "flex",
        flexDirection: "row"
    },

    imgStyle: {
        width: 100,
        height: 100,
    },

    nameStyle: {
        fontSize: 20,
        color: "#252525",
    },

    priceContainerStyle: {
        display: "flex",
        flexDirection: "row"
    },

    priceContainerTextStyle: {
        fontSize: 17,
        margin: 5,
    },

    priceStyle: {
        color: COLORS.mainColor,
        fontWeight: "bold"
    },

    countStyle: {
        fontWeight: "bold",
        textDecorationLine: "underline",
        textAlign: 'center',
    },

    sumStyle: {
        color: COLORS.mainColor,
        fontWeight: "bold"
    },
    overflowStyle: {
        position: "absolute",
        top: 0,
        right: -20, 
        height: '100%' 
    }
})

export default CartItem