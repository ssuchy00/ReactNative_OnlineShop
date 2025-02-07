import React, { useEffect, useState } from "react";
import { IItem } from "../../Interfaces/IItem";
import { ImageBackground, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { IHorizontalScrollListElement } from "../../Interfaces/IHorizontalScrollListElement";
import { borderStyle } from "../../style/style";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App"; 
import { IProduct } from "../../Interfaces/IApiResponse";
import { Image } from "react-native"; 
import APIHandler from "../../Functions/APIHandler";

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export interface IHorizontalScrollList_ItemProps {
    item: IProduct,
    style?: StyleProp<ViewStyle>
}

const HorizontalScrollList_Item = (props:IHorizontalScrollList_ItemProps) => {

    const navigation = useNavigation<HomeScreenProp>()
    const [image, setImage] = useState<string | null>(null)

    const getImage = async() => {
        if(props.item.imageUrl.at(0)=='p')setImage("https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500");
        else setImage(props.item.imageUrl)
        //setImage(Buffer.from(response.data, 'binary').toString('base64'))
    }

    const onClickHandle = () => { 
        navigation.navigate("Item", {item: props.item})
    }

    useEffect(()=>{
        getImage()
    }, [])

    return (
        <TouchableOpacity onPress={onClickHandle} style={{...StyleSheet.flatten(props.style), ...style.mainStyle}}>
            <View style={style.topContainerStyle}>
                {/* Box */}
                <View style={style.boxStyle}></View>
                {/* Image */}
                <View style={style.imageContainerStyle}>
                    {image && <Image source={image?{uri: image}:require("../../src/img/1.png")} style={style.imageStyle}/>}
                </View>

            </View>

            {/* Title */}
            <View style={style.textContainerStyle}>
                <Text style={{...style.textStyle, ...style.nameStyle}}>{props.item.name}</Text>
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
        height: 45,
        margin: '5%',
        marginTop: 5,
        overflow: "hidden"
    },
    textStyle: {
        color: "black"
    },
    nameStyle: {
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold'
    }, 
})
 

export default HorizontalScrollList_Item