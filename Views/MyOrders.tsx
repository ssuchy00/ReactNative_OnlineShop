import React, { useEffect } from "react";
import Core from "../Components/Core";
import { Text, View } from "react-native";
import { IOrder } from "../Interfaces/IApiResponse";
import APIHandler from "../Functions/APIHandler";
import { UserFunction } from "../Functions/UserFunctions";

export interface IMyOrdersProps {}

const MyOrders = () => {

    const [orders, setOrders] = React.useState<Array<IOrder>>([])

    const fetchData = async() => {
        const user = await UserFunction.getUser();
        if(user==null)return;
        const response = await APIHandler.functions.getOrders({userId: user.userId});
        console.log("orders: ",response.data)
        setOrders(response.data)
    }

    const fetchDataTest = async() => {
        setOrders([])
    }

    useEffect(()=>{
        fetchData();
    }, [])

    return (

        <Core>
            <View>
                <Text>Moje zamówienia</Text>
                {
                    orders && orders.length > 0 ? 
                    orders.map((e,k)=>{
                        return (
                            <View key={k}>
                                <Text>{e.orderId}</Text>
                                <Text>{e.total}</Text>
                                <Text>{e.status}</Text>
                            </View>
                        )
                    }) : <Text>Brak zamówień</Text>

                }
            </View>
        </Core>
    
    )
}

export default MyOrders;