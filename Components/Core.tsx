import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { StyleSheet, View } from "react-native";
import { vh, vw } from "./Consts";
import SearchPage from "./SearchPage";

const Core = (props:{children:React.JSX.Element}) => {
    return (
        <SafeAreaView style={style.mainStyle}>
            <Header />
            <SideMenu closePos={-vw(80)}/>
            <View style={style.childrenStyle}>
                {props.children}
            </View>
            <SearchPage />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    mainStyle: {
        position: "relative",
        height: vh(100) - 60
    },
    childrenStyle: {
        padding: 10
    }
})

export default Core