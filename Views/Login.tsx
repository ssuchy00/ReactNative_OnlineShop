import React, { useEffect, useRef, useState } from "react";
import Core from "../Components/Core";
import { ColorValue, StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Input from "../Components/FormComponents/Input";
import Button from "../Components/FormComponents/Button";
import { borderBottomStyle, borderStyle, ButtonStyles } from "../style/style";
import { COLORS } from "../Components/Consts";
import { ColorProps } from "react-native-svg";
import { UserFunction } from "../Functions/UserFunctions";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { IUser } from "../Interfaces/IApiResponse";

export interface ILoginProps {}

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {

    const navigation = useNavigation<LoginScreenProp>()
    const [callbackMessage, setCallbackMessage] = useState<{msg: string, color: ColorValue} | null>(null)

    const emailRef = useRef<string>("")
    const passwordRef = useRef<string>("")


    const loginClickHandle = async () => {
        setCallbackMessage(null);
        const res = await UserFunction.login({email: emailRef.current, password: passwordRef.current});
        if(res==false)setCallbackMessage({msg: "Błąd logowania", color: "#f0211a"});
        else { 
            setCallbackMessage({msg: "Pomyślnie zalogowano", color: "#093"})
            setTimeout(()=>{
                checkIfLogged();
            }, 1000)
        }
    }

    const checkIfLogged = async () =>{
        const user = await UserFunction.getUser(); 
        console.log(user)
        if(user?.email!=null)navigation.navigate("Home")
    }


    useEffect(()=>{
        setCallbackMessage(null)
        checkIfLogged();
    }, [])

    return (
        <Core>
            <View>
                {/* Header */}
                <Text style={style.headerStyle}>Zaloguj się</Text>
                <TextInput onChange={(e)=>{emailRef.current = e.nativeEvent.text}} style={style.inputStyle} placeholder="E-mail" keyboardType="email-address" textContentType="emailAddress" spellCheck={false}/>
                <TextInput onChange={(e)=>{passwordRef.current = e.nativeEvent.text}} style={style.inputStyle} placeholder="Hasło" secureTextEntry={true} spellCheck={false}/>
                <Button 
                    text="Zaloguj się"
                    style={{...ButtonStyles.buttonStyle, ...style.buttonStyle}}
                    textStyle={{...ButtonStyles.textStyle, ...style.buttonTextStyle}}
                    onPress={loginClickHandle}
                />
                {/* Dont have account? */}
                <View style={style.donthaveaccountStyle}>
                    <Text style={style.donthaveaccountTextStyle}>Nie masz konta? </Text>
                    <TouchableOpacity onPress={()=>{ navigation.navigate("Register", {})}}>
                        <Text style={{...style.donthaveaccountTextStyle, ...style.registerTextStyle}}>Zarejestruj się</Text>
                    </TouchableOpacity>
                </View>
                
                {/* Callback text */}
                {callbackMessage && <Text style={{...style.callbackTextStyle, color: callbackMessage.color}}>{callbackMessage.msg}</Text>}
            </View>
        </Core>
    )
}

const style = StyleSheet.create({
    headerStyle: {
        fontSize: 30,
        color: "#333",
        fontWeight: "bold"
    },
    inputStyle: { 
        fontSize: 17,
        marginTop: 10,
        ...borderBottomStyle(1,"gray"), 
    },
    buttonStyle: {
        backgroundColor: COLORS.mainColor,
        marginTop: 25
    },
    buttonTextStyle: {
        color: "#fff",
    },
    callbackTextStyle: { 
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
    },
 
    donthaveaccountStyle: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        marginLeft: 10
    },
    donthaveaccountTextStyle: {
        fontSize: 20
    },
    registerTextStyle: {
        textDecorationLine: "underline",
        color: COLORS.mainColor
    }
})

export default Login