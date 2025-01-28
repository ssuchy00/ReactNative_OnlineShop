import React, { useRef, useState } from "react";
import Core from "../Components/Core";
import { ColorValue, StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Input from "../Components/FormComponents/Input";
import Button from "../Components/FormComponents/Button";
import { borderBottomStyle, borderStyle, ButtonStyles } from "../style/style";
import { COLORS } from "../Components/Consts";
import { ColorProps } from "react-native-svg";
import { IRegisterUser, REGISTER_CALLBACK, REGISTER_CALLBACK_STRING, UserFunction } from "../Functions/UserFunctions";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { IUser } from "../Interfaces/IApiResponse";

export interface IRegisterProps {}

type RegisterScreenProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const Register = () => {

    const navigation = useNavigation<RegisterScreenProp>()
    const [callbackMessages, setCallbackMessages] = useState<Array<{msg: string, color: ColorValue}> | null>(null)

    const emailRef = useRef<string>("")
    const passwordRef = useRef<string>("")
    const password2Ref = useRef<string>("")
    const nameRef = useRef<string>("")
    const lastnameRef = useRef<string>("")
    const rulesAccept = useRef<boolean>(false) 



    const registerClickHandle = async () => {
        setCallbackMessages(null);
        const data:IRegisterUser = {
            email: emailRef.current,
            firstName: nameRef.current,
            lastName: lastnameRef.current,
            password: passwordRef.current,
            password2: password2Ref.current,
            rules: rulesAccept.current,
            
        }
        const res = await UserFunction.register(data);
        
        if(res!=0) {
            console.log(res.toString(2), (res>>REGISTER_CALLBACK.lastnameLength)&1)

            if(((res>>REGISTER_CALLBACK.nameLength)&1)==1)
                setCallbackMessages(prev=>[...prev??[], {msg: REGISTER_CALLBACK_STRING.nameLength, color: "red"}])
            if(((res>>REGISTER_CALLBACK.lastnameLength)&1)==1)
                setCallbackMessages(prev=>[...prev??[], {msg: REGISTER_CALLBACK_STRING.lastnameLength, color: "red"}])
            if(((res>>REGISTER_CALLBACK.emailFormat)&1)==1)
                setCallbackMessages(prev=>[...prev??[], {msg: REGISTER_CALLBACK_STRING.emailFormat, color: "red"}])
            if(((res>>REGISTER_CALLBACK.passwordLength)&1)==1)
                setCallbackMessages(prev=>[...prev??[], {msg: REGISTER_CALLBACK_STRING.passwordLength, color: "red"}])
            if(((res>>REGISTER_CALLBACK.checkPassword)&1)==1)
                setCallbackMessages(prev=>[...prev??[], {msg: REGISTER_CALLBACK_STRING.checkPassword, color: "red"}])
            if(((res>>REGISTER_CALLBACK.rulesAccepted)&1)==1)
                setCallbackMessages(prev=>[...prev??[], {msg: REGISTER_CALLBACK_STRING.rulesAccepted, color: "red"}])
            if(((res>>REGISTER_CALLBACK.otherProblem)&1)==1)
                setCallbackMessages(prev=>[...prev??[], {msg: REGISTER_CALLBACK_STRING.otherProblem, color: "red"}])
        
        }else{
            setCallbackMessages([{msg: "Pomyślnie zarejestrowano", color: "#093"}])
            setTimeout(()=>{
                navigation.navigate("Login", {})
            }, 1000)
            
        }
    }

    return (
        <Core>
            <View style={{marginBottom: 20}}>
                {/* Header */}
                <Text style={style.headerStyle}>Zarejestruj się</Text>
                <TextInput onChange={(e)=>{emailRef.current = e.nativeEvent.text}} style={style.inputStyle} placeholder="E-mail" keyboardType="email-address" textContentType="emailAddress" spellCheck={false}/>
                <TextInput onChange={(e)=>{nameRef.current = e.nativeEvent.text}} style={style.inputStyle} placeholder="Imię" spellCheck={true}/>
                <TextInput onChange={(e)=>{lastnameRef.current = e.nativeEvent.text}} style={style.inputStyle} placeholder="Nazwisko" spellCheck={true}/>
                <TextInput onChange={(e)=>{passwordRef.current = e.nativeEvent.text}} style={style.inputStyle} placeholder="Hasło" secureTextEntry={true} spellCheck={false}/>
                <TextInput onChange={(e)=>{password2Ref.current = e.nativeEvent.text}} style={style.inputStyle} placeholder="Powtórz hasło" secureTextEntry={true} spellCheck={false}/>
                <Button  
                    text="Zarejestruj się"
                    style={{...ButtonStyles.buttonStyle, ...style.buttonStyle}}
                    textStyle={{...ButtonStyles.textStyle, ...style.buttonTextStyle}}
                    onPress={registerClickHandle}
                />
                {/* Dont have account? */}
                <View style={style.donthaveaccountStyle}>
                    <Text style={style.donthaveaccountTextStyle}>Masz konto? </Text>
                    <TouchableOpacity onPress={()=>{ navigation.navigate("Login", {})}}>
                        <Text style={{...style.donthaveaccountTextStyle, ...style.registerTextStyle}}>Zaloguj się</Text>
                    </TouchableOpacity>
                </View>
                
                {/* Callback text */}
                {callbackMessages && callbackMessages.map((e,k)=> {
                    return <Text key={"callback_"+k} style={{...style.callbackTextStyle, color: e.color}}>{e.msg}</Text>})
                }
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
        fontSize: 15, 
        marginTop: 5,
        marginLeft: 10
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

export default Register