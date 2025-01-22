import React, { useState } from "react";
import Core from "../Components/Core";
import { View } from "react-native";
import { Text } from "react-native";
import { ICart } from "../Interfaces/IApiResponse";

export interface ICartProps {

}

const Cart = ({route}:{route:{params:ICartProps}}) => {

    const [cartProducts, setCartProducts] = useState<ICart | null>();

    const fetchData = async() =>{
        
    }

    return (
        <Core>
            <View><Text>Cart</Text></View>
        </Core>
    )
}

export default Cart;