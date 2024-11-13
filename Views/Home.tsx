import React, { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import Core from "../Components/Core";
import { IItem } from "../Interfaces/IItem";
import HorizontalScrollList from "../Components/HomeComponents/HorizontalScrollList";
import { ICategory } from "../Interfaces/ICategory";
import HorizontalScrollList_Item from "../Components/HomeComponents/HorizontalScrollList_Item";
import { IBrand } from "../Interfaces/IBrand";
import axios from "axios";

export const mock_items:Array<IItem> = [
    {id: 0, description: "description 1", image:"imagesrc1", name: "Turbosprężarka ChujCiWdupe Ford Mondeo MK 4", price: 21.00, category: 2},
    {id: 1, description: "description 2", image:"imagesrc2", name: "name 2 ", price: 22.37, category: 1},
    {id: 2, description: "description 3 ", image:"imagesrc3", name: "name 3", price: 23.37, category: 3},
    {id: 3, description: "description 4", image:"imagesrc4", name: "name 4", price: 24.37, category: 4},
]

export const mock_categories:Array<ICategory> = [
    {id: 0, name: "Nazwa 1", image: "blabla1"},
    {id: 1, name: "Nazwa 2", image: "blabla2"},
    {id: 2, name: "Nazwa 3", image: "blabla3"},
    {id: 3, name: "Nazwa 4", image: "blabla4"},
]

export const mock_brands:Array<IBrand> = [
    {id: 0, image: "Image 1", name: "Brand 1"},
    {id: 1, image: "Image 2", name: "Brand 2"},
    {id: 2, image: "Image 3", name: "Brand 3"},
]

const Home = () => {

    const fetch = async () => {
        const res = await axios.get("http://192.168.1.8:8080/users/user/login");
        console.log(res.data);
    }

    useEffect(()=>{
        fetch();
    }, [])

    return (
        <Core> 
            <>
            <HorizontalScrollList elements={mock_items} type={"items"}  elementSize={150} title="POPULARNE PRODUKTY"/>
            <HorizontalScrollList elements={mock_categories} type={"categories"} elementSize={150} title="POPULARNE CZĘŚCI"/>
            <HorizontalScrollList elements={mock_brands} type={"brands"} elementSize={200} title="POPULARNE MARKI"/>
            </>
        </Core>
    )
}

export default Home