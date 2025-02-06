import React, { useEffect } from "react";
import Core from "../Components/Core"; 
import { ICartItem } from "../Interfaces/IApiResponse";
import { StyleSheet, Text, View } from "react-native";
import { borderBottomStyle } from "../style/style";
import { COLORS } from "../Components/Consts";

export interface IBuyProps {
    cart: Array<ICartItem>
}

const Buy = ({route}:{route:{params:IBuyProps}}) => { 

    useEffect(()=>{
        console.log(route.params.cart)
    }, [])

    return (
        <Core>
            <View style={style.main}>
                {/* Checkout */}
                <Text style={style.header}>Checkout</Text>
                {
                    route.params.cart.map((e,k)=>{
                        return (
                            <View key={k} style={style.cartElement}>
                                <Text style={style.cartElementText1}>{e.product.name}</Text>
                                <Text style={style.cartElementText2}> x {e.quantity}</Text>
                                <Text style={style.cartElementText3}>{e.product.price} PLN</Text>
                            </View>
                        )
                    })
                }
                {/* Razem */}
                <View style={style.sum}>
                    <Text style={style.sumElementText1}>Razem</Text> 
                    <Text style={style.sumElementText2}>{route.params.cart.reduce((a,b)=>a+(b.product.price*b.quantity),0)} PLN</Text>
                </View>
            </View>
        </Core>
    )
}

const style = StyleSheet.create({
    main: {

    },

    header: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",  
    },

    cartElement: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 5,
        ...borderBottomStyle(1, "gray"),
    },

    cartElementText1: {
        // width: "70%",
        flex: 75, 
    },
    cartElementText2: {
        flex: 10, 
    },
    cartElementText3: {
        flex: 15,
        textAlign: "right"
    },
    sum: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 5, 
    },
    sumElementText1: {
        // width: "70%",
        flex: 50, 
        fontSize: 22,
        color: "black",
    },
    sumElementText2: {
        flex: 50, 
        fontSize: 22,
        textAlign: "right",
        color: COLORS.mainColor,
        fontWeight: "bold"
    },
    
})

export default Buy