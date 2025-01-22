import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Hamburger from "./Hamburger";
import { vh, vw } from "./Consts";
import { borderLeftStyle } from "../style/style";
import SideMenuElement, { ISideMenuElementProps } from "./SideMenu/SideMenuElement";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";


export interface IMenuProps {
    closePos?: number
}

type MenuScreenProp = NativeStackNavigationProp<RootStackParamList, 'Menu'>;

const SideMenu = (props:IMenuProps) => {

    const navigation = useNavigation<MenuScreenProp>()

    const [menuPos, setMenuPos]  = useState<number>(0)

    const loggedUser = null;

    const loggedLinks:Array<ISideMenuElementProps> = [
        {text: "Wyloguj się", onPress: ()=>{}},
        {text: "Ustawienia konta", onPress: ()=>{}, last:true},
        {text: "Twoje zamówienia", onPress: ()=>{}},
        {text: "Koszyk", onPress: ()=>{}},
        {text: "Skontaktuj się", onPress: ()=>{}, last: true},
    ]

    const notloggedLinks:Array<ISideMenuElementProps> = [
        {text: "Zaloguj się", onPress: ()=>{}},
        {text: "Koszyk", onPress: ()=>{navigation.navigate("Cart", {})}},
        {text: "Skontaktuj się", onPress: ()=>{}, last: true},
    ]

    const hamburgerClickHandle = () => {
        console.log(menuPos)
        setMenuPos(menuPos==0 ? props.closePos??0 : 0)
    }

    useEffect(()=>{
        
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