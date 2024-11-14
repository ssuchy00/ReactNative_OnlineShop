import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface IDropdownMenuProps {
    options: Array<IDropdownMenuOption>,
    onChange: ()=>void,
    title?:string
}

export interface IDropdownMenuOption {
    name: string,
    key: string|number
}


const DropdownMenu = (props:IDropdownMenuProps) => {

    const [placeholder, setPlaceholder] = useState<string>("Select item")

    useEffect(()=>{
        props.options.unshift({key:0,name:"Select item"});
        setPlaceholder(props.options[0].name)
    }, [])

    return (
        <View style={style.mainStyle}>
            <Text style={style.headerStyle}>{props.title}</Text>
            <Dropdown 
                data={props.options}
                labelField={"name"}
                onChange={props.onChange}
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