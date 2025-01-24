import React, { useEffect, useState } from "react";
import Core from "../Components/Core";
import { View } from "react-native";
import { Text } from "react-native";
import { ICart, IProduct } from "../Interfaces/IApiResponse";
import { UserFunction } from "../Functions/UserFunctions";
import { CartFunctions } from "../Functions/CartFunctions";
import CartItem from "../Components/CartComponents/CartItem";

export interface ICartProps {

}

const Cart = ({route}:{route:{params:ICartProps}}) => {

    const [cartProducts, setCartProducts] = useState<Array<IProduct> | null>(null);
    const [groupedProducts, setGroupedProducts] = useState<Map<number, number>>()
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

    useEffect(()=>{
        fetchData();
    }, [])

  
    return (
        <Core>
            <View>
                <Text>koszyk</Text>
                {
                    groupedProducts && Array.from(groupedProducts.entries()).map((e,k)=>{
                        return <CartItem product={cartProducts?.filter(f=>f.productId==e[0])[0]??null} key={k} count={groupedProducts.get(e[0])??4}/>
                    })
                } 
                {
                    !cartProducts || cartProducts.length==0 && <Text>Koszyk jest pusty</Text>
                }
            </View>
        </Core>
    )
}

export default Cart;