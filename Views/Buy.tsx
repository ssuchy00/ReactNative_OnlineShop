import React, { useEffect } from "react";
import Core from "../Components/Core"; 
import { IAddress, ICartItem } from "../Interfaces/IApiResponse";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { borderBottomStyle, ButtonStyles } from "../style/style";
import { COLORS, vw } from "../Components/Consts";
import APIHandler from "../Functions/APIHandler";
import { UserFunction } from "../Functions/UserFunctions";
import Button from "../Components/FormComponents/Button";
import axios, { AxiosError } from "axios";

export interface IBuyProps {
    cart: Array<ICartItem>
}

const Buy = ({route}:{route:{params:IBuyProps}}) => { 


    const [addressData, setAddressData] = React.useState<IAddress | null>(null)

    const fetchData = async() =>{
        const user = await UserFunction.getUser();
        if(user==null)return;
        const response = await APIHandler.functions.addres_fetch(user);
        console.log(response.data)
        setAddressData(response.data[0]);
    }

    useEffect(()=>{
        fetchData()
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
                    <Text style={style.sumElementText2}>{route.params.cart.reduce((a,b)=>a+(b.product.price*b.quantity),0).toFixed(2)} PLN</Text>
                </View>

                {/* Form with user data and address fields to send. By default taken from api */}
               
                <View style={style.form}> 
                    {/* <Text style={{...style.formLabel, ...style.input2}}>Dane adresowe</Text> */}
                    <TextInput style={{...style.formInput, ...style.input4}} placeholder="Ulica">{addressData?.street}</TextInput>
                    <TextInput style={{...style.formInput, ...style.input2}} placeholder="Numer domu">{addressData?.houseNumber}</TextInput>
                    <TextInput style={{...style.formInput, ...style.input2}} placeholder="Numer mieszkania" >{addressData?.flatNumber}</TextInput>
                    <TextInput style={{...style.formInput, ...style.input1}} placeholder="Kod pocztowy" keyboardType="numeric">{addressData?.postalCode}</TextInput>
                    <TextInput style={{...style.formInput, ...style.input3}} placeholder="Miasto" >{addressData?.city}</TextInput>
                </View> 

                {/* Button to send order */}
                <Button
                    style={style.buttonStyle} 
                    textStyle={style.buttonText} 
                    onPress={async ()=>{
                        
                         
                    }}
                    text="Zamów"
                    />
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
    form: {
        padding: 10, 
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    formLabel: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        width: vw(100),
    },
    formInput: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginBottom: 10, 
        margin: 5
    },
    input1: {
        width: vw(22) - 20
    },
    input2: {
        width: vw(47) - 20
    },
    input3: {
        width: vw(72) - 20
    },
    input4: {
        width: vw(92) - 20
    },
    buttonStyle: {
        ...ButtonStyles.buttonStyle,
        backgroundColor: COLORS.mainColor,
        width: "100%",
        marginBottom: 20,
    },
    buttonText: {
        ...ButtonStyles.textStyle,
        color: "#fff",
        lineHeight: 30,
    }

})

export default Buy