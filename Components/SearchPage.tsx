import React, { useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, Pressable, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { vh, vw } from "./Consts";
import { borderStyle } from "../style/style";
import SearchForm from "./SearchPage/SearchForm";

const SearchPage = () => {

    const elRef = useRef<ScrollView>(null)
    const [position, setPosition] = useState<number>(0)
    const [elSize, setElSize] = useState<{width:number,height:number}>()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const getElSize = (e:LayoutChangeEvent) => {
        setElSize(e.nativeEvent.layout)
    }

    const openPage = () => {
        setPosition(vh(10))
        setIsOpen(true);
    }

    const closePage = () => {
        setPosition(vh(100) - 100)
        setIsOpen(false);

    }

    const switchOpen = () => {
        setIsOpen(!isOpen)
    }

    useEffect(()=>{
        
    }, [])

    useEffect(()=>{
        console.log(elSize?.height, vh(100), position, isOpen)
        if(isOpen)
            openPage();
        else 
            closePage();
    }, [elSize, isOpen])

    return (
        <>
        <Pressable 
            onPress={()=>setIsOpen(false)}
            style={{backgroundColor: "rgba(0,0,0,0.5)", width: vw(100), height: vh(100), position: "absolute", top: 0,
                display: (!isOpen?"none":"flex"), zIndex: 999
            }}>

        </Pressable>
        <ScrollView onLayout={getElSize} ref={elRef} style={{...style.mainStyle, top: position}}>
            <SearchForm isOpen={isOpen} openPageFunction={()=>setIsOpen(true)} closePageFunction={()=>{setIsOpen(false)}}/>
            <TouchableOpacity onPress={switchOpen} style={style.topBarStyle}></TouchableOpacity>
        </ScrollView>
        </>
    )
}

const style = StyleSheet.create({
    mainStyle: {
        zIndex: 100000,
        backgroundColor: "#fff",
        borderRadius: 20,
        width: vw(100),
        position: "absolute",
        top: vh(100) - 100,
        padding: 10,
        ...borderStyle(1, "lightgray")

    },
    topBarStyle: {
        position: "absolute",
        top: 0,
        left: 0,
        width: '100%',
        height: 40
    }
})

export default SearchPage;