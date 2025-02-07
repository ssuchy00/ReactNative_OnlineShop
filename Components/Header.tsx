import React from "react";
import { Pressable, StyleSheet, Text, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { COLORS } from "./Consts";
import Hamburger from "./Hamburger";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type MainScreenProp = NativeStackNavigationProp<RootStackParamList, 'Menu'>;

const Header = () => {
    const navigation = useNavigation<MainScreenProp>()
    return (
        <Pressable style={style.mainStyle} onPress={()=>{navigation.navigate("Home")}}>
            {/* Logo */}
            <View style={style.logoStyle}>
                <Text style={{...style.logoTextStyle, color: COLORS.mainColor}}>OTO</Text>
                <Text style={{...style.logoTextStyle, color: "black"}}>SZROTO</Text>
            </View>
        </Pressable>
    )
}
const style = StyleSheet.create({
    mainStyle: {
        backgroundColor: "#D9D9D9",
        padding: 10
    },
    logoStyle: {
        display: "flex",
        flexDirection: "row"
    },
    logoTextStyle: {
        fontSize: 35,
        fontStyle: "italic",
        fontWeight: "bold",
        letterSpacing: -2
    }
})


export default Header