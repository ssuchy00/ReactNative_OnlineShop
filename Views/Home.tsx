import React, { useEffect, useState } from "react";
import Core from "../Components/Core";
import { IItem } from "../Interfaces/IItem";
import HorizontalScrollList from "../Components/HomeComponents/HorizontalScrollList"; 
import APIHandler from "../Functions/APIHandler";
import { IApiResponse, IBrand, ICart, ICategory, IProduct } from "../Interfaces/IApiResponse";
import { IBrandsFetch, ICartFetch, ICategoryFetch, IProductPopular } from "../Interfaces/IApiQuery";

export const mock_items:Array<IItem> = [
    {id: 0, description: "description 1", image:"imagesrc1", name: "Turbosprężarka ChujCiWdupe Ford Mondeo MK 4", price: 21.00, category: 2},
    {id: 1, description: "description 2", image:"imagesrc2", name: "name 2 ", price: 22.37, category: 1},
    {id: 2, description: "description 3 ", image:"imagesrc3", name: "name 3", price: 23.37, category: 3},
    {id: 3, description: "description 4", image:"imagesrc4", name: "name 4", price: 24.37, category: 4},
]

export const mock_categories:Array<ICategory> = [
 
]

export const mock_brands:Array<IBrand> = [
 
]

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
            {popularProducts && <HorizontalScrollList elements={popularProducts} type={"items"}  elementSize={150} title="POPULARNE PRODUKTY"/>}
            {popularCategories && <HorizontalScrollList elements={popularCategories} type={"categories"} elementSize={150} title="POPULARNE CZĘŚCI"/>}
            {popularBrands && <HorizontalScrollList elements={popularBrands} type={"brands"} elementSize={200} title="POPULARNE MARKI"/>}
            </>
        </Core>
    )
}

export default Home