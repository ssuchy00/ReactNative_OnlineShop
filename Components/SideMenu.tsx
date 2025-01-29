import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Hamburger from "./Hamburger";
import { vh, vw } from "./Consts";
import { borderLeftStyle } from "../style/style";
import SideMenuElement, { ISideMenuElementProps } from "./SideMenu/SideMenuElement";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import { ICartProps } from "../Views/Cart";
import { ILoginProps } from "../Views/Login";
import { UserFunction } from "../Functions/UserFunctions";


export interface IMenuProps {
    closePos?: number
}

type MenuScreenProp = NativeStackNavigationProp<RootStackParamList, 'Menu'>;

const SideMenu = (props:IMenuProps) => {

    const navigation = useNavigation<MenuScreenProp>()

    const [menuPos, setMenuPos]  = useState<number>(0)
    const [loggedUser, setLoggedUser] = useState<string | null>(null);

    type ViewType = "Cart" | "Login" | "Home"
    type ParamsType = ICartProps | ILoginProps | {}

    const Navigate = (view:ViewType, params:ParamsType | null = null) => {
        hamburgerClickHandle();
        if(view=="Home")navigation.navigate(view);
        else navigation.navigate(view, params??{})
    }

    const loggedLinks:Array<ISideMenuElementProps> = [
        {text: "Wyloguj się", onPress: ()=>{Navigate("Home");hamburgerClickHandle();UserFunction.logout()}},
        {text: "Ustawienia konta", onPress: ()=>{}, last:true},
        {text: "Twoje zamówienia", onPress: ()=>{}},
        {text: "Koszyk", onPress: ()=>{Navigate("Cart", {})}},
        {text: "Skontaktuj się", onPress: ()=>{}, last: true},
    ]

    const notloggedLinks:Array<ISideMenuElementProps> = [
        {text: "Zaloguj się", onPress: ()=>{Navigate("Login",{})}},
        {text: "Koszyk", onPress: ()=>{Navigate("Cart", {})}},
        {text: "Skontaktuj się", onPress: ()=>{}, last: true},
    ]

    const hamburgerClickHandle = () => {
        console.log(menuPos)
        setMenuPos(menuPos==0 ? props.closePos??0 : 0)
        getLoggedUser();
    }

    const getLoggedUser = async () =>{
        const user = await UserFunction.getUser();
        if(user==null)setLoggedUser(null);
        else setLoggedUser(user?.firstName)  
    }

    useEffect(()=>{
        getLoggedUser();
        setMenuPos(props.closePos??0)
    }, []) 

    return (
        <View style={{...style.mainStyle, right: menuPos}}>
            {/* Hamburger */}
            <Hamburger onPress={hamburgerClickHandle}/>

            {/* Menu */}
            <View style={style.menuStyle}>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <Text style={style.headerStyle}>Cześć{loggedUser?", ":""}</Text>
                    <Text style={{...style.headerStyle, fontWeight: "bold"}}>{loggedUser??""}!</Text>
                    
                </View>
                {/* Links */}
                <View>
                    {
                        loggedUser && loggedLinks.map((e,k)=>{
                            return <SideMenuElement text={e.text} onPress={e.onPress} last={e.last} key={k}/>
                        })
                    }
                    {
                        !loggedUser && notloggedLinks.map((e,k)=>{
                            return <SideMenuElement text={e.text} onPress={e.onPress} last={e.last} key={k}/>
                        })
                    }
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    mainStyle: {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        right: -vw(80)
    },
    menuStyle: {
        width: vw(80),
        height: vh(100),
        backgroundColor: "white",
        padding: 10,
        ...borderLeftStyle(1)
    },
    headerStyle: {
        fontSize: 30,
        color: "black"
    }
})

export default SideMenu