import React, { useEffect, useState } from "react";
import { IItem } from "../../Interfaces/IItem";
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { IHorizontalScrollListElement } from "../../Interfaces/IHorizontalScrollListElement";
import { borderStyle } from "../../style/style";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import APIHandler from "../../Functions/APIHandler";
import { Image } from "react-native";

export interface IHorizontalScrollList_BrandProps {
    item: IHorizontalScrollListElement,
    style?: StyleProp<ViewStyle>
}

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HorizontalScrollList_Brand = (props:IHorizontalScrollList_BrandProps) => {

    const navigation = useNavigation<HomeScreenProp>();

    const [image, setImage] = useState<string | null>(null)

    const getImage = async() => {
        if(props.item.img.at(0)=='p')setImage("https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500");
        else setImage(props.item.img) 
    }
    useEffect(()=>{
        getImage()
    }, [])

    const itemPress = async () => {
        const res = await APIHandler.functions.searchProducts({
            brandId: props.item.id, 
            categoryId: null, 
            manufacturerId: null,
            originality: "all",
            searchText: ""
        })
       
        navigation.navigate("Search", {products: res.data})
        
        // //console.log(res)
    }

    return (
        <TouchableOpacity onPress={itemPress} style={{...StyleSheet.flatten(props.style), ...style.mainStyle}}>
            <View style={style.topContainerStyle}>
                {/* Box */}
                <View style={style.boxStyle}></View>
                {/* Image */}
                <View style={style.imageContainerStyle}>
                    <Image source={image?{uri: image}:require("../../src/img/1.png")} style={style.imageStyle}/>
                </View>

            </View>

            {/* Title */}
            <View style={style.textContainerStyle}>
                <Text style={{...style.textStyle, ...style.nameStyle}}>{props.item.title}</Text>
            </View>
        </TouchableOpacity>
    )
}


const style = StyleSheet.create({
    mainStyle: {
        
    },
    topContainerStyle: {
        position: "relative",
        width: '100%',
        aspectRatio: 1
    },
    imageContainerStyle: {
        aspectRatio: 1,
        position: "absolute",
        width: '100%',
        // backgroundColor: "blue",
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    }, 
    boxStyle: {
        width: '90%',
        aspectRatio: 1,
        backgroundColor: "lightgray",
        borderRadius: 10,
        position: "absolute",
        margin: '5%',

    },
    textContainerStyle: {
        width: '90%',
        margin: '5%',
        marginTop: 5,
        height: 45
    },
    textStyle: {
        color: "black"
    },
    nameStyle: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold'
    }, 
})
 

export default HorizontalScrollList_Brand