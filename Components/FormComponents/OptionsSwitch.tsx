import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../Consts";
import { borderStyle } from "../../style/style";

interface IOptionsSwitchProps {
    text:string
    options:Array<IOptionsSwitchOption>
    onSwitch: (option:string)=>void,
    
}

export interface IOptionsSwitchOption {
    text: string,
    key: string
}

const OptionsSwitch = (props:IOptionsSwitchProps) =>{

    const [currentOption, setCurrentOption] = useState<number>(0);

    const switchOption = async () => {
        const maxOption = props.options.length - 1;
        const _curr = currentOption+1<=maxOption?currentOption+1:0
        await setCurrentOption(_curr)
        props.onSwitch(props.options[_curr].key);
    }
    

    return (
        <View style={style.mainStyle}>
            <Text style={style.headerStyle}>{props.text}</Text>
            <Pressable onPress={switchOption} style={style.switchStyle}>
                {
                    props.options.map((e,k)=>{
                        const isCurrentOption = currentOption==k; 
                        return (
                            <View key={"opt"+k} style={{...style.optionStyle, width: (100/props.options.length).toString()+"%", ...(isCurrentOption?style.choosenOptionStyle:null), ...borderStyle(0)}}>
                                <Text style={{...style.textStyle, ...(isCurrentOption?style.choosenTextStyle:null)}} key={"text"+k}>{e.text}</Text>
                            </View>
                        )
                    })
                }
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    mainStyle: {
        marginTop: 50
        // backgroundColor: "lightgray"
    },
    switchStyle: {
        display: "flex",
        flexDirection: 'row',
        marginTop: 10,
        height: 35,
        borderRadius: 10,
        backgroundColor: "#D9D9D9",
        ...borderStyle(1, '#D9D9D9'),
    },
    optionStyle: {
    },
    choosenOptionStyle: {
        backgroundColor: COLORS.mainColor,
        borderRadius: 10
    },
    textStyle: {
        width: '100%',
        textAlign: 'center',
        fontSize: 18,
        height: '100%',
        textAlignVertical: 'center',
        color: "#000"
    },
    choosenTextStyle: {
        color: "#fff"
    },
    headerStyle: {
        fontSize: 25
    }
})

export default OptionsSwitch