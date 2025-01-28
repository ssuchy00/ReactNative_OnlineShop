import React, { useEffect, useState } from "react";
import Core from "../Components/Core";
import { IItem } from "../Interfaces/IItem";
import HorizontalScrollList from "../Components/HomeComponents/HorizontalScrollList"; 
import APIHandler from "../Functions/APIHandler";
import { IApiResponse, IBrand, ICartRes, ICategory, IProduct } from "../Interfaces/IApiResponse";
import { IBrandsFetch, ICartFetch, ICategoryFetch, IProductPopular } from "../Interfaces/IApiQuery";

const Home = () => {

    const [popularProducts, setPopularProducts] = useState<Array<IProduct> | null>(null)
    const [popularCategories, setPopularCategories] = useState<Array<ICategory> | null>(null)
    const [popularBrands, setPopularBrands] = useState<Array<IBrand> | null>(null)

    const fetchPopular = async () => {
        // Popular products
        const queryData:IProductPopular = {}
        const _popular:IApiResponse<Array<IProduct>> = await APIHandler.functions.products_popular(queryData);
        setPopularProducts(_popular.data); 
    }

    const fetchCategories = async () => {
        const queryData:ICategoryFetch = {}
        const _categories:IApiResponse<Array<ICategory>> = await APIHandler.functions.categories(queryData)
        setPopularCategories(_categories.data)
    }

    const fetchBrands = async () => {
        const queryData:IBrandsFetch = {}
        const _brands:IApiResponse<Array<IBrand>> = await APIHandler.functions.brands(queryData)
        setPopularBrands(_brands.data)
    }

    useEffect(()=>{
        fetchPopular();
        fetchCategories();
        fetchBrands();
    }, [])

    return (
        <Core> 
            <>
            { popularProducts   && <HorizontalScrollList elements={popularProducts} type={"items"}  elementSize={150} title="POPULARNE PRODUKTY"/>}
            { popularCategories && <HorizontalScrollList elements={popularCategories} type={"categories"} elementSize={150} title="POPULARNE CZĘŚCI"/>}
            { popularBrands     && <HorizontalScrollList elements={popularBrands} type={"brands"} elementSize={200} title="POPULARNE MARKI"/>}
            </>
        </Core>
    )
}

export default Home