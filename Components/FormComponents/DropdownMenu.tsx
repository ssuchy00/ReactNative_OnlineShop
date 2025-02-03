import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface IDropdownMenuProps {
    options: Array<IDropdownMenuOption>,
    onChange: (option:number)=>void,
    title?:string
}

export interface IDropdownMenuOption {
    name: string,
    key: number
}


const DropdownMenu = (props:IDropdownMenuProps) => {

    const [placeholder, setPlaceholder] = useState<string>("Select item")
    const [options, setOptions] = useState<Array<IDropdownMenuOption>>([]);

    const addPlaceholder = () => {
        const _options = props.options;
        _options.unshift({key:0,name:"Wybierz"});
        setOptions(_options);
        setPlaceholder(_options[0].name) 
    }

    useEffect(()=>{
        addPlaceholder()
    },[props.options])

    useEffect(()=>{
        //console.log("USEEFFECT",options)
    }, [options]) 

    return (
        <View style={style.mainStyle}>
            <Text style={style.headerStyle}>{props.title}</Text>
            <Dropdown 
                data={options}
                labelField={"name"}
                onChange={(e)=>props.onChange(e.key)}
                valueField="key"
                style={style.dropdownStyle}
                dropdownPosition="top"
                placeholder={placeholder}
            />
        </View>
    )
}

const style = StyleSheet.create({
    mainStyle: {
        marginTop: 30
    },

    dropdownStyle: {
        width: '100%',
        backgroundColor: "#efefef",
        padding: 10,
        marginTop: 5,
    },
    headerStyle: {
        fontSize: 25
    }
})

export default DropdownMenu