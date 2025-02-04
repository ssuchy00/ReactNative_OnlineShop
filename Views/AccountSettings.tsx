import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import Core from "../Components/Core";
import { IAddress, IApiResponse, IUser } from "../Interfaces/IApiResponse";
import { UserFunction } from "../Functions/UserFunctions";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import APIHandler from "../Functions/APIHandler";
import Button from "../Components/FormComponents/Button";
import { borderBottomStyle, ButtonStyles, margin } from "../style/style";
import { COLORS, vw } from "../Components/Consts";

export interface IAccountSettings {
}

type AccountSettingsScreenProp = NativeStackNavigationProp<RootStackParamList, 'AccountSettings'>;

const AccountSettings = () => {

    const navigation = useNavigation<AccountSettingsScreenProp>();

    const [user, setUser] = useState<IUser | null>(null)
    const [address, setAddress] = useState<IAddress | null>(null)

    const [userDataChanged, setUserDataChanged] = useState<boolean | null>(null)
    const [addressDataChanged, setAddressDataChanged] = useState<boolean | null>(null)
    const [passwordChanged, setPasswordChanged] = useState<boolean | null>(null)

    const firstNameRef = useRef<string>("")
    const lastNameRef = useRef<string>("")
    const phoneNumberRef = useRef<string>("")
    const streetRef = useRef<string>("")
    const houseNumberRef = useRef<string>("")
    const flatNumberRef = useRef<string>("")
    const postalCodeRef = useRef<string>("")
    const cityRef = useRef<string>("")

    const passwordRef = useRef<string>("")
    const newPassword2Ref = useRef<string>("")
    const newPasswordRef = useRef<string>("")


    const getUser = async() => {
        const _user = await UserFunction.getUser()
        console.log("getuser", _user)
        setUser(_user);
        if(_user==null)navigation.navigate("Login", {}) 
    }

    const getAddress = async() => {
        if(user==null)return
        const _address = await APIHandler.functions.addres_fetch(user)
        setAddress(_address.data[0])
        console.log("getaddress", _address.data[0])
    }  
    
    const saveUser = async() => {
        if(user==null)return;
        console.log("saveuserdata", firstNameRef.current, lastNameRef.current, phoneNumberRef.current)
        const _user:IApiResponse<IUser> = await APIHandler.functions.userUpdate(
            {
            userId: user.userId, 
            firstName: firstNameRef.current=="" ? user.firstName : firstNameRef.current, 
            lastName: lastNameRef.current=="" ? user.lastName : lastNameRef.current, 
            email: user.email, 
            phoneNumber: phoneNumberRef.current=="" ? user.phoneNumber : phoneNumberRef.current,
            role: user.role,
            password: user.password
            }
        ) 
        console.log("saveuser", _user)
        if(_user.data?.email!=null) setUserDataChanged(true);
        else setUserDataChanged(false);
        UserFunction.setUser(_user.data?.email==null ? user : _user.data)
    }

    const saveAddress = async() => {
        if(user==null)return;
        console.log("saveaddressdata", streetRef.current, houseNumberRef.current, flatNumberRef.current, postalCodeRef.current, cityRef.current)
         const _address:IApiResponse<IAddress> = await APIHandler.functions.address_add(
            {
                addressId: address?.addressId??0,
                userId: user.userId,
                street: streetRef.current=="" ? address?.street??"" : streetRef.current,
                houseNumber: houseNumberRef.current=="" ? address?.houseNumber??"" : houseNumberRef.current,
                flatNumber: flatNumberRef.current=="" ? address?.flatNumber??"" : flatNumberRef.current,
                postalCode: postalCodeRef.current=="" ? address?.postalCode??"" : postalCodeRef.current,
                city: cityRef.current=="" ? address?.city??"" : cityRef.current
            }
        )

        console.log("saveaddress", _address)
        if(_address.data?.city!=null) setAddressDataChanged(true);
        else setAddressDataChanged(false);
        
    }

    const savePassword = async() => {
        if(user==null)return;
        if(newPasswordRef.current!=newPassword2Ref.current) return setPasswordChanged(false);
        console.log("savepassword", passwordRef.current, newPasswordRef.current)
        const _user:IApiResponse<IUser> = await APIHandler.functions.userPasswordChange(user, newPasswordRef.current, passwordRef.current) 
        console.log("savepassword", _user)
        if(_user.data?.email!=null) setPasswordChanged(true);
        else setPasswordChanged(false);
        UserFunction.setUser(_user.data?.email==null ? user : _user.data)
    }

    useEffect(() => {
        //check if user is logged in
        setAddressDataChanged(null)
        setUserDataChanged(null)
        getUser();
        getAddress();
    }, []) 

    useEffect(()=>{
        getAddress();
    }, [user])

 

    return (
        <Core>
            <KeyboardAvoidingView style={styles.main} >
                <Text style={styles.header}>Ustawienia konta</Text>
                {user && 
                <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                    <TextInput style={{...styles.input, ...styles.input4, color: "#555"}} placeholder="E-mail" keyboardType="email-address" editable={false}>{user.email}</TextInput>   
                    <TextInput onChange={e=>firstNameRef.current=e.nativeEvent.text} style={{...styles.input, ...styles.input4}} placeholder="Imię">{user.firstName}</TextInput>   
                    <TextInput style={{...styles.input, ...styles.input4}} placeholder="Nazwisko">{user.lastName}</TextInput>   
                    { userDataChanged==true && <Text style={{color: "green"}}>Pomyślnie zmieniono dane</Text>}
                    {userDataChanged!=null && userDataChanged==false && <Text style={{color: "red"}}>Nie udało się zmienić danych</Text>}
                    
                    <Button 
                        text={"Zapisz zmiany"}
                        onPress={() => {
                            saveUser()
                        }}
                        style={{...ButtonStyles.buttonStyle, ...styles.button}}
                        textStyle={{...ButtonStyles.textStyle, ...styles.buttonText}}
                        />
                    {/* space */}
                    <View style={{height: 20}}></View>
                    <Text style={styles.subheader}>Dane adresowe</Text>
                    <TextInput onChange={e=>phoneNumberRef.current=e.nativeEvent.text}  style={{...styles.input, ...styles.input4}} placeholder="Numer telefonu">{user.phoneNumber}</TextInput>
                    <TextInput onChange={e=>streetRef.current=e.nativeEvent.text} style={{...styles.input, ...styles.input4}} placeholder="Nazwa ulicy">{address?.street}</TextInput>
                    
                    <TextInput onChange={e=>houseNumberRef.current=e.nativeEvent.text} style={{...styles.input, ...styles.input2}} placeholder="Numer domu">{address?.houseNumber}</TextInput>
                    <TextInput onChange={e=>flatNumberRef.current=e.nativeEvent.text} style={{...styles.input, ...styles.input2, marginLeft: 20,}} placeholder="Numer mieszkania">{address?.flatNumber}</TextInput>
                    
                    <TextInput onChange={e=>postalCodeRef.current=e.nativeEvent.text} style={{...styles.input, ...styles.input1}} placeholder="Kod pocztowy">{address?.postalCode}</TextInput>
                    <TextInput onChange={e=>cityRef.current=e.nativeEvent.text} style={{...styles.input, ...styles.input3, marginLeft: 20,}} placeholder="Miasto">{address?.city}</TextInput>
                    { addressDataChanged==true && <Text style={{color: "green"}}>Pomyślnie zmieniono dane</Text>}
                    {addressDataChanged!=null && addressDataChanged==false && <Text style={{color: "red"}}>Nie udało się zmienić danych</Text>}
                    <Button 
                        text={"Zapisz zmiany"}
                        onPress={() => {
                            saveAddress()
                        }}
                        style={{...ButtonStyles.buttonStyle, ...styles.button}}
                        textStyle={{...ButtonStyles.textStyle, ...styles.buttonText}}
                        /> 
                </View>} 
                {/* space */} 
                <Text style={styles.subheader}>Zmień hasło</Text>
                <TextInput onChange={e=>newPasswordRef.current=e.nativeEvent.text} style={{...styles.input, ...styles.input4 }} placeholder="Nowe hasło" secureTextEntry={true}></TextInput>   
                <TextInput onChange={e=>newPassword2Ref.current=e.nativeEvent.text} style={{...styles.input, ...styles.input4 }} placeholder="Powtórz nowe hasło" secureTextEntry={true}></TextInput>   
                <TextInput onChange={e=>passwordRef.current=e.nativeEvent.text} style={{...styles.input, ...styles.input4 }} placeholder="Dotychczasowe hasło"  secureTextEntry={true}></TextInput>   
                { passwordChanged==true && <Text style={{color: "green"}}>Pomyślnie zmieniono hasło</Text>}
                {passwordChanged!=null && passwordChanged==false && <Text style={{color: "red"}}>Nie udało się zmienić hasła</Text>}
                    
                <Button 
                        text={"Zmień hasło"}
                        onPress={() => {
                            savePassword()
                        }}
                        style={{...ButtonStyles.buttonStyle, ...styles.button}}
                        textStyle={{...ButtonStyles.textStyle, ...styles.buttonText}}
                        /> 
            </KeyboardAvoidingView>
        </Core>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#252525"
    },
    subheader: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#353535",
        width: vw(100)
    },
    input: {
        ...borderBottomStyle(1, "gray"),
    },
    input1: {
        width: vw(25) - 20
    },
    input2: {
        width: vw(50) - 20
    },
    input3: {
        width: vw(75) - 20
    },
    input4: {
        width: vw(100) - 20
    },
    button: {
        backgroundColor: COLORS.mainColor,
        margin: 10,
        width: vw(100) - 40,
        height: 50,
        marginBottom: 20,
        marginTop: 15
    },
    buttonText: {
        color: "white",
        fontSize: 22
    }
})

export default AccountSettings;