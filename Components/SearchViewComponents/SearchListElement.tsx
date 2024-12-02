import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IBrand, ICategory, IManufacturer, IProduct } from "../../Interfaces/IApiResponse";
import { margin } from "../../style/style";
import { COLORS, vw } from "../Consts";
import APIHandler from "../../Functions/APIHandler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native"; 
import Overflow from "./Overflow";

export interface ISearchListElementProps {
    product: IProduct
}
 
type SearchScreenProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;


const SearchListElement = (props:ISearchListElementProps) => {

    const navigation = useNavigation<SearchScreenProp>();

    const [categories, setCategories] = useState<Array<ICategory>>([])
    const [brands, setBrands] = useState<Array<IBrand>>([])
    const [manufacturer, setManufacturer] = useState<Array<IManufacturer>>([])
    const [serverError, setServerError] = useState<string | null>(null);

    const onPressHandle = () => {
        navigation.navigate("Item", {item:props.product})
    }

    const GetCategories = async () => {
        const res = await APIHandler.functions.categories([]);
        if(res.status!=200)setServerError("Błąd serwera");
        else setServerError(null);
        setCategories(res.data);
    }

    const GetBrands = async () => {
        const res = await APIHandler.functions.brands([]);
        if(res.status!=200)setServerError("Błąd serwera");
        else setServerError(null);
        setBrands(res.data);
    }

    const GetManufacturers = async () => {
        const res = await APIHandler.functions.manufacturers([]);
        if(res.status!=200)setServerError("Błąd serwera");
        else setServerError(null);
        setManufacturer(res.data);
    }

    useEffect(()=>{
        GetCategories();
        GetBrands();
        GetManufacturers();
    }, [])

    return (
        serverError!=null ? <Text>{serverError}</Text> :
        <TouchableOpacity style={style.mainStyle} onPress={onPressHandle}>
            
            {/* Image view */}
            <View style={style.imageViewStyle}></View>
            {/* right view */}
            <View style={style.rightViewStyle}>
                {/* Name */}
                <Text style={style.titleStyle}>{props.product.name}</Text>
                {/* Middle View */}
                <View style={style.middleViewStyle}>
                    <Text style={style.middleTextStyle}>{categories.filter(f=>props.product.categoryId==f.categoryId)[0]?.name??""} • </Text> 
                    <Text style={style.middleTextStyle}>{brands.filter(f=>props.product.brandId==f.brandId)[0]?.name??""} • </Text>
                    <Text style={style.middleTextStyle}>{manufacturer.filter(f=>props.product.manufacturerId==f.manufacturerId)[0]?.name??""}</Text>
                </View> 
                {/* Price View */}
                <View>
                    <Text style={style.priceStyle}>{props.product.price.toFixed(2)} PLN</Text>
                </View>
            </View> 
            
            {/* overflow */} 
            <Overflow style={style.overflowStyle}/>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    mainStyle: { 
        ...margin(10,0,0,0),
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: "#fff",
        overflow: "hidden",
        position: "relative"
    },
    imageViewStyle: {
        width: vw(26),
        aspectRatio: 1,
        backgroundColor: "lightgray",
        ...margin(5,0,5,5)
    },
    rightViewStyle: {
        padding: 10,
        display: "flex",
        flexDirection: "column",
    },
    titleStyle: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 18,
        flex: 1
    },
    middleViewStyle: {
        display: 'flex',
        flexDirection: 'row',  
        flex: 1
    },
    middleTextStyle: {
        fontSize: 16,
        fontWeight: "bold"
    },
    priceStyle: {
        fontSize: 24,
        color: COLORS.mainColor, 
        fontWeight: "bold", 
        flex: 1
    },
    overflowStyle: {
        position: "absolute",
        top: 0,
        right: 0, 
        height: '100%' 
    }
   
})

export default SearchListElement