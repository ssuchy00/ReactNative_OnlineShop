import React from "react";
import { Text, View } from "react-native";
import { IProduct } from "../../Interfaces/IApiResponse";

export interface ISearchListElementProps {
    product: IProduct
}

const SearchListElement = (props:ISearchListElementProps) => {
    return (
        <View>
            <Text>{props.product.productId}</Text>
        </View>
    )
}

export default SearchListElement