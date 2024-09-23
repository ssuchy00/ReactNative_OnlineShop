import React from "react";
import { ScrollView, Text } from "react-native";
import Core from "../../Components/Core";
import { IItem } from "../../android/Interfaces/IItem";
import HorizontalScrollList from "../../Components/HomeComponents/HorizontalScrollList";
import { ICategory } from "../../android/Interfaces/ICategory";

export const mock_items:Array<IItem> = [
    {id: 1, description: "description 1", image:"imagesrc1", name: "name 1", price: 21.37, category: 2},
    {id: 2, description: "description 2", image:"imagesrc2", name: "name 2 ", price: 22.37, category: 1},
    {id: 3, description: "description 3 ", image:"imagesrc3", name: "name 3", price: 23.37, category: 3},
    {id: 4, description: "description 4", image:"imagesrc4", name: "name 4", price: 24.37, category: 4},
]

export const mock_categories:Array<ICategory> = [
    {id: 1, name: "Nazwa 1"},
    {id: 2, name: "Nazwa 2"},
    {id: 3, name: "Nazwa 3"},
    {id: 4, name: "Nazwa 4"},
]

const Home = () => {
    return (
        <Core> 
            <>
            <HorizontalScrollList elements={mock_items} elementSize={150} title="POPULARNE MARKI"/>
            <HorizontalScrollList elements={mock_items} elementSize={150} title="POPULARNE CZĘŚCI"/>
            <HorizontalScrollList elements={mock_items} elementSize={200} title="POPULARNE PRODUKTY"/>
            </>
        </Core>
    )
}

export default Home