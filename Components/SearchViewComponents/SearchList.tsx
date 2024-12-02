import React from "react";
import { Text, View } from "react-native";
import { IProduct } from "../../Interfaces/IApiResponse";
import SearchListElement from "./SearchListElement";

export interface ISearchListProps {
    products: Array<IProduct>
}

const SearchList = (props:ISearchListProps) => {
    return (
        <View style={{marginBottom: 30}}>{props.products ? props.products.map((e,k)=>{
            return <SearchListElement product={e} key={k}/> 
        }) : <Text>Nie znaleziono produktów</Text>}</View>
    )
}

export default SearchList