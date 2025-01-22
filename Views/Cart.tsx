import React from "react";
import Core from "../Components/Core";
import { View } from "react-native";
import { Text } from "react-native";

export interface ICartProps {

}

const Cart = ({route}:{route:{params:ICartProps}}) => {
    return (
        <Core>
            <View><Text>Cart</Text></View>
        </Core>
    )
}

export default Cart;