import React, { useEffect, useState } from "react";
import { ICartItem, IProduct } from "../../Interfaces/IApiResponse";
import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { borderBottomStyle, borderStyle, ButtonStyles } from "../../style/style";
import { COLORS } from "../Consts";
import Overflow from "../SearchViewComponents/Overflow";
import Button from "../FormComponents/Button";
import { CartFunctions } from "../../Functions/CartFunctions";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import Cart from "../../Views/Cart";

export interface ICartItemProps {
    product: IProduct
    count: number
    callback: ()=>void,
    loggedIn?: boolean
    type?: "api" | "session"
    getElements: ()=>void
}

type CartItemScreenProp = NativeStackNavigationProp<RootStackParamList, 'CartItem'>;

const CartItem = (item:ICartItemProps) =>{


    const navigation = useNavigation<CartItemScreenProp>()

    const [count, setCount] = useState<number>(0);
    const [image, setImage] = useState<string>();


    const addToCart = async () => {
        
        item.getElements();
        if(item==null || item.product==null)return;
        if(item.type=="api")await CartFunctions.AddToCartAPI(item.product);
        else await CartFunctions.AddToCart(item.product);
        countElements(); 
    }

    const subtractFromCart = async () => {
        if(item==null || item.product==null)return;
        if(item.type=="api")await CartFunctions.SubtractFromCartAPI(item.product);
        else await CartFunctions.SubtractFromCart(item.product);
        countElements(); 
    }

    const deleteFromCart = async () => {
        if(item==null || item.product==null)return;
        if(item.type=="api") await CartFunctions.RemoveFromCartAPI(item.product);
        else await CartFunctions.RemoveFromCart(item.product);
        countElements(); 
    }

    const countElements = async () => {
        let elements = 0;
        if(item.type!="api")elements = (await CartFunctions.GetCart())?.products.filter(f=>f.productId==item.product?.productId).length??0
        else elements = (await CartFunctions.GetCartAPI())?.cartItems.filter(f=>f.product.productId==item.product?.productId)[0].quantity??0
        
        setCount(elements);
        item.callback();
    }

    const onPressHandle = () => {
        navigation.navigate("Item", {item:item.product}) 
    }

    const getImage = async() => {
        if(item.product.imageUrl.at(0)=='p')setImage("https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500");
        else setImage(item.product.imageUrl)
        //setImage(Buffer.from(response.data, 'binary').toString('base64'))
    }

    useEffect(()=>{
        countElements();
        getImage()
    })

    useEffect(()=>{
        setCount(item.count);
    },[])
    return (
        
        <TouchableOpacity onPress={onPressHandle} style={style.main}>
            {/* img */}
            <View style={style.imgStyle}>
             {image && <Image source={{uri: image}} style={style.imgStyle}/>}
            </View>
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
                
                {item.loggedIn && (
                    <Button 
                        text="Dodaj do koszyka"
                        style={{...ButtonStyles.buttonStyle, ...style.buttonStyle, backgroundColor: "#0c6", width: 200}}
                        textStyle={{...ButtonStyles.textStyle, ...style.buttonTextStyle, fontSize: 20}}
                        onPress={()=>{CartFunctions.AddToCartAPI(item.product); item.getElements()}}
                    />
                )}
        
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