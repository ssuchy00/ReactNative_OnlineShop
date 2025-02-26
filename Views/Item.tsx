import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native"; 
import Core from "../Components/Core";
import { COLORS, vw } from "../Components/Consts";
import { borderBottomStyle, ButtonStyles, margin } from "../style/style";
import { IApiResponse, ICartRes, ICategory, IManufacturer, IProduct } from "../Interfaces/IApiResponse";
import { _originality } from "../Components/SearchPage/SearchForm";
import APIHandler from "../Functions/APIHandler";
import Button from "../Components/FormComponents/Button";
import { SessionHandler } from "../Functions/SessionHandler";
import { UserFunction } from "../Functions/UserFunctions";
import { CartFunctions } from "../Functions/CartFunctions";

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

    const [countInCart, setCountInCart] = useState<number>(0)


    useEffect(()=>{
        fetchData();
    }, []) 

    const addToCartHandle =async () => {
        const user = await UserFunction.getUser()
        if(user==null)
        {
            const count:number = await CartFunctions.AddToCart(route.params.item);
            setCountInCart(count);
        }else {
            await CartFunctions.AddToCartAPI(route.params.item);
            const count_res = await CartFunctions.GetCartAPI()
            const count = count_res?.cartItems.filter(f=>f.product.productId==route.params.item.productId)[0].quantity??0
            setCountInCart(count);
        }  
    } 

    const [image, setImage] = useState<string | null>(null);

    const getImage = async() => {
        if(route.params.item.imageUrl.at(0)=='p')setImage("https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500");
        else setImage(route.params.item.imageUrl)
        //setImage(Buffer.from(response.data, 'binary').toString('base64'))
    }

    useEffect(()=>{
        getImage();
    }, [])

    return (
        <Core>
            <View style={style.mainStyle}>
                {/* Image */}
                <View style={style.imgViewStyle}>
                    {image && <Image source={{uri: image}} style={style.imgViewStyle}/>}
                </View>
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
                {countInCart > 0 && <Text>W koszyku: {countInCart}</Text>}
                <Button 
                    text="Dodaj do koszyka"                    
                    style={{...ButtonStyles.buttonStyle, backgroundColor: COLORS.mainColor, marginTop: 30, marginBottom: 20}}
                    textStyle={{...ButtonStyles.textStyle, color: "#fff"}}
                    onPress={addToCartHandle}
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