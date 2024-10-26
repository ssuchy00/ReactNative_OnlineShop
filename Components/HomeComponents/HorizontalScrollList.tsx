import React, { ReactDOM, ReactElement, ReactNode, useEffect, useState } from "react";
import { CellRendererProps, ScrollView, StyleSheet, Text, View } from "react-native";
import HorizontalScrollListElement from "./HorizontalScrollListElement";
import { mock_items } from "../../Views/Home";
import { IItem } from "../../Interfaces/IItem";
import { borderLeftStyle, margin } from "../../style/style";
import { ICategory } from "../../Interfaces/ICategory";
import HorizontalScrollList_Item from "./HorizontalScrollList_Item";
import { IHorizontalScrollListElement } from "../../Interfaces/IHorizontalScrollListElement";
import HorizontalScrollList_Category from "./HorizontalScrollList_Category";
import { IBrand } from "../../Interfaces/IBrand";
import HorizontalScrollList_Brand from "./HorizontalScrollList_Brand";


export interface IHorizontalScrollListProps {
    elements: Array<IItem | ICategory | IBrand>
    elementSize: number
    title: string,
    type: "categories" | "items" | "brands"
} 

const HorizontalScrollList = (props:IHorizontalScrollListProps) => {
 

    return (
        <View style={style.mainStyle}>
            <Text style={style.titleSize}>{props.title}</Text>
            <ScrollView horizontal>
                {
                    props.type=="items" && props.elements.map((e,k)=>{ 
                        return <HorizontalScrollList_Item style={{...style.elementStyle, width: props.elementSize}}  key={k} item={{id:e.id, title:e.name,img:e.image}}/>
                    })
                }
                {
                    props.type=="categories" && props.elements.map((e,k)=>{ 
                        return <HorizontalScrollList_Category style={{...style.elementStyle, width: props.elementSize}}  key={k} item={{id:e.id, title:e.name,img:e.image}}/>
                    })
                }
                {
                    props.type=="brands" && props.elements.map((e,k)=>{ 
                        return <HorizontalScrollList_Brand style={{...style.elementStyle, width: props.elementSize}}  key={k} item={{id:e.id, title:e.name,img:e.image}}/>
                    })
                }
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    mainStyle: {
       ...margin(20,0,20,0)
    },

    elementStyle: { 
        ...margin(10,15,10,0), 
    },
    titleSize: {
        fontSize: 28,
        color: "#111",
        fontWeight: 'bold'
    }
})

export default HorizontalScrollList