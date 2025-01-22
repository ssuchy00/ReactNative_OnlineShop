import React from "react";
import { IProduct } from "../../Interfaces/IApiResponse";
import { Text, View } from "react-native";

const CartItem = (item:IProduct) =>{
    return (
        <View><Text>{item.name}</Text></View>
    )
}

export default CartItem