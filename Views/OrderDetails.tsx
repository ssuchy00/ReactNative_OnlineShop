import { StyleSheet, Touchable, TouchableOpacity, View } from "react-native"
import Core from "../Components/Core"
import { Text } from "react-native"
import { IApiResponse, ICartItem, IOrder, IUser } from "../Interfaces/IApiResponse"
import { COLORS } from "../Components/Consts"
import CartItem from "../Components/CartComponents/CartItem"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../App"
import Button from "../Components/FormComponents/Button"
import { borderBottomStyle, ButtonStyles } from "../style/style"
import { ICart } from "../Functions/CartFunctions"
import { IBuyProps } from "./Buy"
import { useEffect, useState } from "react"
import { UserFunction } from "../Functions/UserFunctions"
import APIHandler from "../Functions/APIHandler"

export interface IOrderDetailsProps {
    order: IOrder,
    updateOrders?: ()=>void
}

type OrderDetailsScreenProp = NativeStackNavigationProp<RootStackParamList, 'OrderDetails'>;

const OrderDetails = ({route}:{route:{params:IOrderDetailsProps}}) => {

    const navigation = useNavigation<OrderDetailsScreenProp>()
    const [user, setUser] = useState<IUser | null>();
    const [order, setOrder] = useState<IOrder>();
    const getUser = async() =>{
        const _user = await UserFunction.getUser();
        setUser(_user);
    }

    const sendOrder = async () => {
        if(user?.role!='admin')return;
        const res:IApiResponse<IOrder> = await APIHandler.functions.sendOrder({id:route.params.order.orderId});
        console.log(res);
        if(res.data!=null)
        {
            setOrder(res.data)
            console.log("CYCUNIE");
            console.log(route.params.updateOrders)
            if(route.params.updateOrders!=undefined)route.params.updateOrders();
        }else{
        }
    }


    useEffect(()=>{ 
        setOrder(route.params.order)
        getUser();
    }, [])

    return (
        <Core>
            <View>
                <View>
                    <Text style={style.headerStyle}>Zamówienie nr {route.params.order.orderId} z {route.params.order.createdAt}</Text>
                    {
                        order?.orderItems.map((e,k)=>{
                            return (
                                <TouchableOpacity key={k} style={style.cartElement} onPress={()=>{navigation.navigate("Item", {item: e.product})}}>
                                    <Text style={style.cartElementText1}>{e.product.name}</Text>
                                    <Text style={style.cartElementText2}> x {e.quantity}</Text>
                                    <Text style={style.cartElementText3}>{e.product.price} PLN</Text>
                                </TouchableOpacity>
                            )     
                        })      
                    } 
                    <Text style={{fontSize: 18, color: "black"}}>Adres: </Text>
                    <Text style={{fontSize: 16}}>{route.params.order.deliveryAddress}</Text>
                    <View style={{marginTop: 20}}/>
                    <Text style={{fontSize: 18, color: "black"}}>Status: {order?.status}</Text> 
                    {/* Sum */}
                    <View style={style.sumContainerStyle}>
                        <Text style={style.sumContainerTextStyle}>Razem: </Text>
                        <Text style={{...style.sumContainerTextStyle, ...style.sumStyle}}>{route.params.order.total.toFixed(2)} PLN</Text>
                    </View>
                </View>
                 
                {/* Buy now button */}
                {user?.role!="admin" && (
                <Button 
                    text="Zamów ponownie"
                    style={{...ButtonStyles.buttonStyle ,backgroundColor: COLORS.mainColor, width: "100%", marginTop: -20, marginBottom: 20}} 
                    textStyle={{...ButtonStyles.textStyle, color: "#fff"}}
                    onPress={()=>{
                        let newCart:IBuyProps = {
                            cart: route.params.order.orderItems.map((e)=>{
                                return {
                                    cartItemId: e.orderItemId,
                                    product: e.product,
                                    quantity: e.quantity
                                }
                            })
                        };
                        console.log(newCart)
                        navigation.navigate("Buy", {cart: newCart.cart});
                    }}
                    /> )}
                 
                    {user?.role=="admin" && order?.status=="W trakcie"  ? <Button 
                        text="Wyślij zamówienie" 
                        onPress={()=>{sendOrder();}}
                        style={{...ButtonStyles.buttonStyle ,backgroundColor: COLORS.mainColor, width: "100%", marginTop: -20, marginBottom: 20}} 
                        textStyle={{...ButtonStyles.textStyle, color: "#fff"}}
                    
                    /> : <Text>Zamówienie zostało wysłane</Text>
                    }
            </View>
        </Core>
    )
}

const style = StyleSheet.create({
    headerStyle: {
        fontSize: 26,
        color: "#252525", 
        fontWeight: "bold",
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
        fontSize: 20,
        marginTop: 40
    },

    sumStyle: {
        color: COLORS.mainColor,
        fontWeight: "bold",
        marginBottom: 30,
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
})

export default OrderDetails