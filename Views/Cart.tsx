import React, { useEffect, useState } from "react";
import Core from "../Components/Core";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { ICartItem, ICartRes, IProduct, IUser } from "../Interfaces/IApiResponse";
import { UserFunction } from "../Functions/UserFunctions";
import { CartFunctions } from "../Functions/CartFunctions";
import CartItem from "../Components/CartComponents/CartItem";
import { COLORS } from "../Components/Consts";
import APIHandler from "../Functions/APIHandler";

export interface ICartProps {

}

const Cart = ({route}:{route:{params:ICartProps}}) => {

    const [user, setUser] = useState<IUser | null>(null)
    const [cartProductsSession, setCartProductsSession] = useState<Array<IProduct> | null>(null);
    const [groupedProductsSession, setGroupedProductsSession] = useState<Map<number, number>>()
    const [sumSession, setSumSession] = useState<number>(0)

    const [cartProductsAPI, setCartProductsAPI] = useState<Array<ICartItem> | null>(null);
    const [groupedProductsAPI, setGroupedProductsAPI] = useState<Map<number, number>>()
    const [sumAPI, setSumAPI] = useState<number>(0)

    const fetchData = async() =>{
        const _user = await UserFunction.getUser()
        setUser(_user);
        
        const cartItems = await CartFunctions.GetCart();
        let groupedItems = new Map<number, number>();
        cartItems?.products.map(e=>{
            groupedItems.set(e.productId, (groupedItems.get(e.productId)??0) + 1); 
        })
        console.log(groupedItems);
        setGroupedProductsSession(groupedItems);
        setCartProductsSession(cartItems?.products??null)
         
        if(_user!=null)
        {
            const cartItemsAPI = await CartFunctions.GetCartAPI();
            if(cartItemsAPI==null)return;
            console.log(cartItemsAPI)
            setCartProductsAPI(cartItemsAPI.cartItems??null)

        }
    }

    const groupElements = () => {
        
    } 

    const updateSum = async () =>{
        const cartItems = await CartFunctions.GetCart();
        let sum = 0;
        cartItems?.products.map(e=>{sum+=e.price});
        setSumSession(sum);

        if(user!=null)
        {
            const cartItemsApi = await CartFunctions.GetCartAPI();
            let sum2 = 0;
            cartItemsApi?.cartItems.map(e=>{
                sum2+=e.product.price * e.quantity
            })
            setSumAPI(sum2)
        }
    }

    const getElements = async () => {
        await fetchData(); 
    } 

    useEffect(()=>{
        getElements();
    }, [])

    useEffect(()=>{
        updateSum();
    }, [cartProductsSession]) 

  
    return (
        <Core>
            <View>

                {/* Logged cart */}
                {user&&<View>
                <Text style={style.headerStyle}>koszyk</Text>
                    {
                        cartProductsAPI && cartProductsAPI?.map((e,k)=>{
                            return <CartItem getElements={getElements} type="api" callback={updateSum} product={e.product} count={e.quantity} key={k}/>       
                        })
                               
                    } 
                    {
                        !cartProductsAPI || cartProductsAPI.length==0 && <Text>Koszyk jest pusty</Text>
                    }
                    {/* Sum */}
                    <View style={style.sumContainerStyle}>
                        <Text style={style.sumContainerTextStyle}>Razem: </Text>
                        <Text style={{...style.sumContainerTextStyle, ...style.sumStyle}}>{sumAPI.toFixed(2)} PLN</Text>
                    </View>
                </View>}

                {/* Session cart */}
                <View>
                    
                    <Text style={!user ? style.headerStyle : {...style.headerStyle, ...style.subHeaderStyle}}>koszyk {user&&"z urządzenia"}</Text>
                    {
                        groupedProductsSession && Array.from(groupedProductsSession.entries()).map((e,k)=>{
                            return cartProductsSession?.filter(f=>f.productId==e[0])!=undefined ?
                                <CartItem getElements={getElements} loggedIn={user!=null} callback={updateSum} product={ cartProductsSession?.filter(f=>f.productId==e[0])[0]} key={k} count={groupedProductsSession.get(e[0])??0}/> 
                                : null 
                        })
                    } 
                    {
                        !cartProductsSession || cartProductsSession.length==0 && <Text>Koszyk jest pusty</Text>
                    }
                    {/* Sum */}
                    <View style={style.sumContainerStyle}>
                        <Text style={style.sumContainerTextStyle}>Razem: </Text>
                        <Text style={{...style.sumContainerTextStyle, ...style.sumStyle}}>{sumSession.toFixed(2)} PLN</Text>
                    </View>
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
    subHeaderStyle: {
        fontSize: 20, 
        color: "#555"
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
        fontWeight: "bold",
        marginBottom: 30
    }
})

export default Cart;