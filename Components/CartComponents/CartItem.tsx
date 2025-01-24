import React, { useEffect, useState } from "react";
import { IProduct } from "../../Interfaces/IApiResponse";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { borderBottomStyle, borderStyle, ButtonStyles } from "../../style/style";
import { COLORS } from "../Consts";
import Overflow from "../SearchViewComponents/Overflow";
import Button from "../FormComponents/Button";
import { CartFunctions } from "../../Functions/CartFunctions";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

export interface ICartItemProps {
    product: IProduct
    count: number
    callback: ()=>void
}

type CartItemScreenProp = NativeStackNavigationProp<RootStackParamList, 'CartItem'>;

const CartItem = (item:ICartItemProps) =>{


    const navigation = useNavigation<CartItemScreenProp>()

    const [count, setCount] = useState<number>(0);
    const addToCart = async () => {
        if(item==null || item.product==null)return;
        await CartFunctions.AddToCart(item.product);
        countElements(); 
    }

    const subtractFromCart = async () => {
        if(item==null || item.product==null)return;
        await CartFunctions.SubtractFromCart(item.product);
        countElements(); 
    }

    const deleteFromCart = async () => {
        if(item==null || item.product==null)return;
        await CartFunctions.RemoveFromCart(item.product);
        countElements(); 
    }

    const countElements = async () => {
        const elements = (await CartFunctions.GetCart())?.products.filter(f=>f.productId==item.product?.productId)
        setCount(elements?.length??0);
        item.callback();
    }

    const onPressHandle = () => {
        navigation.navigate("Item", {item:item.product}) 
    }

    useEffect(()=>{
        setCount(item.count);
    },[])

    return (
        <TouchableOpacity onPress={onPressHandle} style={style.main}>
            {/* img */}
            <View style={style.imgStyle}></View>
            {/* Desc */}
            <View>
            {/* Name */}
                <Text style={style.nameStyle}>{item.product?.name}</Text>
                {/* Price container */}
                <View style={style.priceContainerStyle}>
                    {/* Price */}
                    <Text style={{...style.priceContainerTextStyle, ...style.priceStyle}}>{item.product?.price.toFixed(2)} PLN </Text> 
                    {/* Count */}
                    <Text style={style.priceContainerTextStyle}>x</Text>
                    <Text style={{...style.priceContainerTextStyle, ...style.countStyle}}>{count}</Text>
                      
                </View>
                <View style={style.priceContainerStyle}>
                    {/* Sum */}
                    <Text style={style.priceContainerTextStyle}>Razem: </Text>

                    <Text style={{...style.priceContainerTextStyle, ...style.sumStyle}}>{(count * (item.product?.price??0)).toFixed(2)} PLN</Text>
                </View>
                
                {/* buttons */}
                <View style={style.buttonContainerStyle}>
                    <Button 
                        text="+"
                        style={{...ButtonStyles.buttonStyle, ...style.buttonStyle, backgroundColor: "#0c6"}}
                        textStyle={{...ButtonStyles.textStyle, ...style.buttonTextStyle}}
                        onPress={addToCart}
                    />
                    <Button 
                        text="-"
                        style={{...ButtonStyles.buttonStyle, ...style.buttonStyle, backgroundColor: "#f55"}}
                        textStyle={{...ButtonStyles.textStyle, ...style.buttonTextStyle}}
                        onPress={subtractFromCart}
                    />
                    <Button 
                        text="Usuń"
                        style={{...ButtonStyles.buttonStyle, ...style.buttonStyle, backgroundColor: "#f11", width: 100}}
                        textStyle={{...ButtonStyles.textStyle, ...style.buttonTextStyle, fontSize: 20}}
                        onPress={deleteFromCart}
                    />
                </View>
            </View>
            
            <Overflow style={style.overflowStyle}/>
        </TouchableOpacity>
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
        backgroundColor: "lightgray",
        marginRight: 5,
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
        marginBottom: 0
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
    },
    buttonContainerStyle: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5
    },

    buttonStyle: {
        margin: 3,
        width: 30,
        height: 30,
        padding: 0
    },
    buttonTextStyle: {
        color: "#fff",
        lineHeight: 30
    },
    buttonAddStyle: {
        backgroundColor: "#0c6",
    }
})

export default CartItem