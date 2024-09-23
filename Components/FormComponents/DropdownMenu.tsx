import React from "react";
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
    return (
        <View style={style.mainStyle}>
            <Text style={style.headerStyle}>{props.title}</Text>
            <Dropdown 
                data={props.options}
                labelField={"name"}
                onChange={props.onChange}
                valueField="key"
                style={style.dropdownStyle}
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