import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { ScrollView, StyleSheet, View } from "react-native";
import { vh, vw } from "./Consts";
import SearchPage from "./SearchPage";

const Core = (props:{children:React.JSX.Element}) => {
    return (
        <SafeAreaView style={style.mainStyle}>
            <Header />
            <ScrollView style={style.childrenStyle}>
                {props.children}
            </ScrollView>
            <SearchPage />
            <SideMenu closePos={-vw(80)}/>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    mainStyle: {
        position: "relative",
        height: vh(100) - 60
    },
    childrenStyle: {
        padding: 10,
        marginBottom: 40
    }
})

export default Core