import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Core from "../Components/Core";
import { IUser } from "../Interfaces/IApiResponse";
import { UserFunction } from "../Functions/UserFunctions";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";

export interface IAccountSettings {
}

type AccountSettingsScreenProp = NativeStackNavigationProp<RootStackParamList, 'AccountSettings'>;

const AccountSettings = () => {

    const navigation = useNavigation<AccountSettingsScreenProp>();

    const [user, setUser] = useState<IUser | null>(null)
    const getUser = async() => {
        const _user = await UserFunction.getUser()
        console.log("getuser", _user)
        setUser(_user);
        if(_user==null)navigation.navigate("Login", {}) 
    }

    useEffect(() => {
        //check if user is logged in
        getUser();
    }, [])

 

    return (
        <Core>
            <View>
                <Text>Ustawienia konta</Text>
                {user && 
                <View>
                    <TextInput placeholder="E-mail" keyboardType="email-address" editable={false}>{user.email}</TextInput>   
                    <TextInput placeholder="Imię">{user.firstName}</TextInput>   
                    <TextInput placeholder="Nazwisko">{user.lastName}</TextInput>   
                    {/* space */}
                    <View style={{height: 20}}></View>
                    <TextInput placeholder="Numer telefonu"></TextInput>
                    <TextInput placeholder="Adres"></TextInput>
                </View>}
            </View>
        </Core>
    )
}

export default AccountSettings;