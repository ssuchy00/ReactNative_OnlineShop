import React from "react";
import { IProduct } from "../../Interfaces/IApiResponse";
import { Text, View } from "react-native";

interface ICartItemProps {
    product: IProduct | null
    count: number
}

const CartItem = (item:ICartItemProps) =>{
    return (
        <View><Text>{item.product?.name}: {item.count}</Text></View>
    )
} 

export default CartItem