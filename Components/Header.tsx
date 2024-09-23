import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "./Consts";
import Hamburger from "./Hamburger";

const Header = () => {
    return (
        <View style={style.mainStyle}>
            {/* Logo */}
            <View style={style.logoStyle}>
                <Text style={{...style.logoTextStyle, color: COLORS.mainColor}}>OTO</Text>
                <Text style={{...style.logoTextStyle, color: "black"}}>SZROTO</Text>
            </View>
        </View>
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