import React, { useEffect, useState } from "react";
import Core from "../Components/Core";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { ICart, IProduct } from "../Interfaces/IApiResponse";
import { UserFunction } from "../Functions/UserFunctions";
import { CartFunctions } from "../Functions/CartFunctions";
import CartItem from "../Components/CartComponents/CartItem";
import { COLORS } from "../Components/Consts";

export interface ICartProps {

}

const Cart = ({route}:{route:{params:ICartProps}}) => {

    const [cartProducts, setCartProducts] = useState<Array<IProduct> | null>(null);
    const [groupedProducts, setGroupedProducts] = useState<Map<number, number>>()
    const [sum, setSum] = useState<number>(0)
    const fetchData = async() =>{
        const user = await UserFunction.getUser()
        if(user==null)
        {
            const cartItems = await CartFunctions.GetCart();
            let groupedItems = new Map<number, number>();
            cartItems?.products.map(e=>{
               groupedItems.set(e.productId, (groupedItems.get(e.productId)??0) + 1); 
            })
            console.log(groupedItems);
            setGroupedProducts(groupedItems);
            setCartProducts(cartItems?.products??null)
        }else{

        }
    }

    const groupElements = () => {
        
    } 

    const updateSum = async () =>{
        const cartItems = await CartFunctions.GetCart();

        let sum = 0;
        cartItems?.products.map(e=>{sum+=e.price});
        setSum(sum);
    }

    const getElements = async () => {
        await fetchData(); 
    } 

    useEffect(()=>{
        getElements();
    }, [])

    useEffect(()=>{
        updateSum();
    }, [cartProducts]) 

  
    return (
        <Core>
            <View>
                <Text style={style.headerStyle}>koszyk</Text>
                {
                    groupedProducts && Array.from(groupedProducts.entries()).map((e,k)=>{
                        return cartProducts?.filter(f=>f.productId==e[0])!=undefined ?
                            <CartItem callback={updateSum} product={ cartProducts?.filter(f=>f.productId==e[0])[0]} key={k} count={groupedProducts.get(e[0])??0}/> 
                            : null
                    })
                } 
                {
                    !cartProducts || cartProducts.length==0 && <Text>Koszyk jest pusty</Text>
                }
                {/* Sum */}
                <View style={style.sumContainerStyle}>
                    <Text style={style.sumContainerTextStyle}>Razem: </Text>
                    <Text style={{...style.sumContainerTextStyle, ...style.sumStyle}}>{sum.toFixed(2)} PLN</Text>
                </View>
            </View>
        </Core>
    )
}

const style = StyleSheet.create({
    headerStyle: {
        fontSize: 30,
        color: "#252525",
        textTransform: "uppercase",
        fontWeight: "bold",
        marginLeft: 8
    },

    sumContainerStyle: {
        display: "flex",
        flexDirection: "row"
    },

    sumContainerTextStyle: {
        fontSize: 20
    },

    sumStyle: {
        color: COLORS.mainColor,
        fontWeight: "bold"
    }
})

export default Cart;