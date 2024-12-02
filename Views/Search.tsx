import React from "react";
import { Text, View } from "react-native";
import { IProduct } from "../Interfaces/IApiResponse";
import Core from "../Components/Core";
import SearchList from "../Components/SearchViewComponents/SearchList";

export interface ISearchProps {
    products: Array<IProduct>
}

const Search = ({route}:{route:{params:ISearchProps}}) => {
    return (
        <Core>
        <View>
            <SearchList products={route.params.products} />
        </View>
        </Core>
    )
}

export default Search