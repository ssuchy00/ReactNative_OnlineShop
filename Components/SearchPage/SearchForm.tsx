import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Input from "../FormComponents/Input";
import OptionsSwitch, { IOptionsSwitchOption } from "../FormComponents/OptionsSwitch";
import DropdownMenu, { IDropdownMenuOption } from "../FormComponents/DropdownMenu";
import Button from "../FormComponents/Button";
import { ButtonStyles } from "../../style/style";
import { COLORS } from "../Consts";
import APIHandler from "../../Functions/APIHandler";
import { IApiResponse, IBrand, ICategory, IManufacturer } from "../../Interfaces/IApiResponse";


interface ISearchFormParams {
    openPageFunction?: ()=>void,
    isOpen?: boolean
}

const SearchForm = (props:ISearchFormParams) => {

    const onSearchPhraseChange = (text:string) => {
        console.log(text)
    }

    const onFocusHandle = () => {
        if(props.openPageFunction)
            props.openPageFunction()
    }

    const options:Array<IOptionsSwitchOption> = [
        {key: "new", text: "Nowe"},
        {key: "used", text: "Używane"},
    ]

    const types:Array<IDropdownMenuOption> = [
        {key: 0, name: "Typ 1"},
        {key: 1, name: "Typ 2"},
        {key: 2, name: "Typ 3"},
    ]

    const [originality, setOriginality] = useState<Array<IOptionsSwitchOption>>([])
    const [categories, setCategories] = useState<Array<IDropdownMenuOption>>([])
    const [brands, setBrands] = useState<Array<IDropdownMenuOption>>([])
    const [manufacturers, setManufacturers] = useState<Array<IDropdownMenuOption>>([])

    const fetchOriginality = async () => {
        setOriginality([
            {key: "oryginal", text: "Oryginał"},
            {key: "zamiennik", text: "Zamiennik"}
        ])
    }

    const fetchCategories = async () => {
        const _categories:IApiResponse<Array<ICategory>> = await APIHandler.functions.categories({});
        if(_categories.status!=200 || _categories.data==null)return;

        let keys:Array<IDropdownMenuOption> = _categories.data.map((e)=>{
            return {key: e.categoryId, name: e.name}
        })
        setCategories(keys);
    }

    const fetchBrands = async () => {
        const _brands:IApiResponse<Array<IBrand>> = await APIHandler.functions.brands({});
        if(_brands.status!=200 || _brands.data==null)return;

        let keys:Array<IDropdownMenuOption> = _brands.data.map((e)=>{
            return {key: e.brandId, name: e.name}
        })
        setBrands(keys);
    }

    const fetchManufacturers = async () => {
        const _manufacturers:IApiResponse<Array<IManufacturer>> = await APIHandler.functions.manufacturers({});
        if(_manufacturers.status!=200 || _manufacturers.data==null)return;

        let keys:Array<IDropdownMenuOption> = _manufacturers.data.map((e)=>{
            return {key: e.manufacturerId, name: e.name}
        })
        setManufacturers(keys);
    }
    
    useEffect(()=>{
        fetchOriginality();
        fetchCategories();
        fetchBrands();
        fetchManufacturers();
    }, [])

    return (
        <View>
            <Input text={"Wyszukaj"} onChange={onSearchPhraseChange} onFocus={onFocusHandle} isFormOpen={props.isOpen}/>
            <OptionsSwitch 
                text="Rodzaj"
                onSwitch={()=>{}}
                options={originality}
            />
            <DropdownMenu 
                onChange={()=>{}}
                options={categories}
                title="Rodzaj części"
            />

            <DropdownMenu 
                onChange={()=>{}}
                options={brands}
                title="Marka samochodu"
            />

            <DropdownMenu 
                onChange={()=>{}}
                options={manufacturers}
                title="Producent części"
            />

            <Button 
                text="Szukaj"
                style={{...ButtonStyles.buttonStyle, backgroundColor: COLORS.mainColor, marginTop: 20}}
                textStyle={{...ButtonStyles.textStyle, color: "#fff"}}
            />
        </View>
    )
}

export default SearchForm