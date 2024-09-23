import React from "react";
import { Text, View } from "react-native";
import Input from "../FormComponents/Input";
import OptionsSwitch, { IOptionsSwitchOption } from "../FormComponents/OptionsSwitch";
import DropdownMenu, { IDropdownMenuOption } from "../FormComponents/DropdownMenu";
import Button from "../FormComponents/Button";
import { ButtonStyles } from "../../android/style/style";
import { COLORS } from "../Consts";


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

    return (
        <View>
            <Input text={"Wyszukaj"} onChange={onSearchPhraseChange} onFocus={onFocusHandle} isFormOpen={props.isOpen}/>
            <OptionsSwitch 
                text="Rodzaj"
                onSwitch={()=>{}}
                options={options}
            />
            <DropdownMenu 
                onChange={()=>{}}
                options={types}
                title="Rodzaj części"
            />

            <DropdownMenu 
                onChange={()=>{}}
                options={types}
                title="Marka samochodu"
            />

            <DropdownMenu 
                onChange={()=>{}}
                options={types}
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