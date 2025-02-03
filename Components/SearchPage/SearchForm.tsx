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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";


interface ISearchFormParams {
    openPageFunction?: ()=>void,
    closePageFunction?: ()=>void,
    isOpen?: boolean
}

export const _originality = [
    {key: "all", text: "Wszystkie"},
    {key: "oryginal", text: "Oryginał"},
    {key: "zamiennik", text: "Zamiennik"}
]

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const SearchForm = (props:ISearchFormParams) => {

    const navigation = useNavigation<HomeScreenProp>()

    const onSearchPhraseChange = (text:string) => {
        setSearchPhrase(text)
    }

    const onFocusHandle = () => {
        if(props.openPageFunction)
            props.openPageFunction()
    }

    const [originality, setOriginality] = useState<Array<IOptionsSwitchOption>>([])
    const [categories, setCategories] = useState<Array<IDropdownMenuOption>>([]) 
    const [brands, setBrands] = useState<Array<IDropdownMenuOption>>([])
    const [manufacturers, setManufacturers] = useState<Array<IDropdownMenuOption>>([])

    const [searchPhrase, setSearchPhrase] = useState<string>()
    const [choosenOriginality, setChoosenOriginality] = useState<string>()
    const [choosenCategory, setChoosenCategory] = useState<number>(0)
    const [choosenBrand, setChoosenBrand] = useState<number>(0)
    const [choosenManufacturer, setChoosenManufacturer] = useState<number>(0)
    
   

    const fetchOriginality = async () => {
        
        setOriginality(_originality)

        setChoosenOriginality(_originality[0].key)
    }

    const fetchCategories = async () => {
        const _categories:IApiResponse<Array<ICategory>> = await APIHandler.functions.categories({});
        if(_categories.status!=200 || _categories.data==null)return;

        let keys:Array<IDropdownMenuOption> = await _categories.data.map((e)=>{
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
    
    const searchPress = async () => {
        //console.log(searchPhrase, choosenOriginality, choosenCategory, choosenBrand, choosenManufacturer)
        const res = await APIHandler.functions.searchProducts({
            brandId: choosenBrand, 
            categoryId: choosenCategory, 
            manufacturerId: choosenManufacturer,
            originality: choosenOriginality??"",
            searchText: searchPhrase??""
        })
        props.closePageFunction && props.closePageFunction();
        navigation.navigate("Search", {products: res.data})
        
        // //console.log(res)
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
                onSwitch={(e)=>{setChoosenOriginality(e)}}
                options={originality}
            />  
            <DropdownMenu 
                onChange={(e)=>{setChoosenCategory(e)}}
                options={categories}
                title="Rodzaj części"
            />

            <DropdownMenu 
                onChange={(e)=>{setChoosenBrand(e)}}
                options={brands}
                title="Marka samochodu"
            />

            <DropdownMenu 
                onChange={(e)=>{setChoosenManufacturer(e)}}
                options={manufacturers}
                title="Producent części"
            />

            <Button 
                text="Szukaj"
                style={{...ButtonStyles.buttonStyle, backgroundColor: COLORS.mainColor, marginTop: 20}}
                textStyle={{...ButtonStyles.textStyle, color: "#fff"}}
                onPress={searchPress}
            />
        </View>
    )
}

export default SearchForm