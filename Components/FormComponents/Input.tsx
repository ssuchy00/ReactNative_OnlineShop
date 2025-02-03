import React, { LegacyRef, MutableRefObject, ReactDOM, ReactElement, ReactNode, useEffect, useRef } from "react";
import { NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, View } from "react-native";
import { borderBottomStyle, borderStyle, borderTopStyle } from "../../style/style";

interface IInputProps {
    text?:string,
    onChange?: (text:string)=>void,
    onFocus?: ()=>void,
    isFormOpen?: boolean
}

const Input = (props:IInputProps) => {

    const inputRef = useRef<TextInput>(null)

    const onChange = (event:NativeSyntheticEvent<TextInputChangeEventData>) => {
        if(props.onChange)
            props.onChange(event.nativeEvent.text);
    }

    const onFocus = () => {
        if(props.onFocus)
            props.onFocus();
    }

    useEffect(()=>{
        //console.log("INPUT",props.isFormOpen)
        if(!props.isFormOpen)
            inputRef.current?.blur();
    }, [props.isFormOpen])

    return (
        <View>
            <Text style={{fontSize: 25}}>{props.text}</Text>
            <TextInput placeholder="Szukaj..." ref={inputRef} onFocus={onFocus} onChange={onChange} style={{ borderTopWidth: 0, fontSize: 18, color: "#333", ...borderBottomStyle(1, "lightgray",)}}/>
       </View>
    )
}

export default Input

