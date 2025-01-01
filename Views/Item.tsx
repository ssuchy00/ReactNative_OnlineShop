import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native"; 
import Core from "../Components/Core";
import { COLORS, vw } from "../Components/Consts";
import { borderBottomStyle, ButtonStyles, margin } from "../style/style";
import { IApiResponse, ICategory, IManufacturer, IProduct } from "../Interfaces/IApiResponse";
import { _originality } from "../Components/SearchPage/SearchForm";
import APIHandler from "../Functions/APIHandler";
import Button from "../Components/FormComponents/Button";

export interface IItemProps {
    item:IProduct,
}

const Item = ({route}:{route:{params:IItemProps}}) => { 
    const [originality, setOriginality] = useState<string>()

    const [manufacturer, setManufacturer] = useState<IManufacturer>()
    const [category, setCategory] = useState<ICategory>()

    const fetchData = async () => {
        const resManufacturer:IApiResponse<Array<IManufacturer>> = await APIHandler.functions.manufacturers({});
        setManufacturer(resManufacturer.data?.filter(f=>f.manufacturerId==route.params.item.manufacturerId)[0])

        const resCategory:IApiResponse<Array<ICategory>> = await APIHandler.functions.categories({});
        setCategory(resCategory.data?.filter(f=>f.categoryId==route.params.item.categoryId)[0])
    }

    useEffect(()=>{
        fetchData();
    }, [])

    return (
        <Core>
            <View style={style.mainStyle}>
                {/* Image */}
                <View style={style.imgViewStyle}></View>
                {/* Title */}
                <Text style={style.titleStyle}>{route.params.item.name}</Text>
                {/* Price */}
                <Text style={style.priceStyle}>{route.params.item.price.toFixed(2)} PLN</Text>
                {/* Description */}
                <Text style={style.descriptionStyle}>{route.params.item.description}</Text>
                
                {/* Specification */}
                <Text style={style.specificationStyle}>Originality: {_originality.filter(f=>f.key==route.params.item.originality)[0].text}</Text>
                <Text style={style.specificationStyle}>Producent: {manufacturer?.name??"-"}</Text>
                <Text style={style.specificationStyle}>Kategoria: {category?.name??"-"}</Text>

                {/* Add to cart */}
                <Button 
                    text="Dodaj do koszyka"                    
                    style={{...ButtonStyles.buttonStyle, backgroundColor: COLORS.mainColor, marginTop: 30, marginBottom: 20}}
                    textStyle={{...ButtonStyles.textStyle, color: "#fff"}}
                />
            </View>
        </Core>
    )
}

const style = StyleSheet.create({
    mainStyle: {
        padding: 0,
        marginBottom: 10
    }, 
    
    imgViewStyle: {
        ...margin(-10, 0, 10, -10),
        width: vw(100),
        aspectRatio: 1,
        backgroundColor: "lightgray"
    },
    imgStyle: {

    },
    titleStyle: {
        fontSize: 30,
        color: "black"
    },
    descriptionStyle: {
        fontSize: 20,
        color: "gray",
        marginTop: 30,
        marginBottom: 10,
        paddingBottom: 20,
        ...borderBottomStyle(1, "lightgray")
    },
    priceStyle: {
        color: COLORS.mainColor,
        fontSize: 35,
        fontWeight: "bold"
    },
    specificationStyle: {
        fontSize: 16,
        marginBottom: 5
    }
})

export default Item