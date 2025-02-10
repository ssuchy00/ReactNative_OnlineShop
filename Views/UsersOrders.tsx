import React, { useEffect } from "react";
import Core from "../Components/Core";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IOrder } from "../Interfaces/IApiResponse";
import APIHandler from "../Functions/APIHandler";
import { UserFunction } from "../Functions/UserFunctions";
import { COLORS } from "../Components/Consts";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

export interface IUsersOrdersProps {}

type MyOrdersScreenProp = NativeStackNavigationProp<RootStackParamList, 'MyOrders'>;

const UsersOrders = () => {

    const navigation = useNavigation<MyOrdersScreenProp>();

    const [orders, setOrders] = React.useState<Array<IOrder>>([])

    const fetchData = async() => {
        const user = await UserFunction.getUser();
        if(user==null)return;
        const response = await APIHandler.functions.getUsersOrder({userId: user.userId});
        console.log("orders: ",response.data)
        setOrders(response.data)
    }

    useEffect(()=>{
        fetchData();
    }, [])

    return (

        <Core>
            <View style={style.main}>
                <Text style={style.header}>Zamówienia użytkowników</Text>
                <Text style={style.orderHeader}>W trakcie:</Text>
                {
                    orders && orders.length > 0 ? 
                    orders.map((e,k)=>{
                        return e.status=="W trakcie" && (
                        (
                            <TouchableOpacity key={k} style={style.orderContainer} onPress={()=>{navigation.navigate("OrderDetails", {order: e})}}> 
                                {/* Image */}
                                <View style={style.orderImage}>
                                    <Image source={{uri: e.orderItems[0].product.imageUrl??"https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"}} style={{width: 100, height: 100}}/>
                                </View>
                                {/* Description */}
                                <View style={style.orderDescription}>
                                    <Text style={style.orderHeader}>Zamówienie {e.orderId} z {e.createdAt}</Text>
                                    <Text style={style.orderTotal}>{e.total.toFixed(2)} PLN</Text>
                                    <Text style={style.orderStatus}>Status: {e.status}</Text> 
                                </View>
                            </TouchableOpacity>
                        )
                    )}) : <Text>Brak zamówień</Text>

                }

                <Text style={style.orderHeader}>Wysłane: </Text>
                {
                    orders && orders.length > 0 ? 
                    orders.map((e,k)=>{
                        return e.status!="W trakcie" && (
                        (
                            <TouchableOpacity key={k} style={style.orderContainer} onPress={()=>{navigation.navigate("OrderDetails", {order: e})}}> 
                                {/* Image */}
                                <View style={style.orderImage}>
                                    <Image source={{uri: e.orderItems[0].product.imageUrl??"https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"}} style={{width: 100, height: 100}}/>
                                </View>
                                {/* Description */}
                                <View style={style.orderDescription}>
                                    <Text style={style.orderHeader}>Zamówienie {e.orderId} z {e.createdAt}</Text>
                                    <Text style={style.orderTotal}>{e.total.toFixed(2)} PLN</Text>
                                    <Text style={style.orderStatus}>Status: {e.status}</Text> 
                                </View>
                            </TouchableOpacity>
                        )
                    )}) : <Text>Brak zamówień</Text>

                }
            </View>
        </Core>
    
    )
}

const style = StyleSheet.create({
    main: {

    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },
    orderContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
        padding: 10,
        backgroundColor: "#f7f7f7",
        borderRadius: 10
    },
    orderHeader: {
        fontWeight: "bold",
        color: "black",
        fontSize: 18,
        marginBottom: 5
    },
    orderImage: {
        flex: 3
    },
    orderDescription: {
        flex: 7
    },
    orderTotal: {
        fontWeight: "bold",
        color: COLORS.mainColor,
        fontSize: 17,
        marginBottom: 5
    },
    orderStatus: {
        color: "black",
        fontSize: 16,
        marginBottom: 5
    },
    orderDate: {
        color: "black",
        fontSize: 16,
        marginBottom: 5
    },
    
})

export default UsersOrders;