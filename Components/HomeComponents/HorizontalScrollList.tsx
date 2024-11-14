import React, { ReactDOM, ReactElement, ReactNode, useEffect, useState } from "react";
import { CellRendererProps, ScrollView, StyleSheet, Text, View } from "react-native";
import HorizontalScrollListElement from "./HorizontalScrollListElement"; 
import { IItem } from "../../Interfaces/IItem";
import { borderLeftStyle, margin } from "../../style/style"; 
import HorizontalScrollList_Item from "./HorizontalScrollList_Item";
import { IHorizontalScrollListElement } from "../../Interfaces/IHorizontalScrollListElement";
import HorizontalScrollList_Category from "./HorizontalScrollList_Category"; 
import HorizontalScrollList_Brand from "./HorizontalScrollList_Brand";
import { IBrand, ICategory, IProduct } from "../../Interfaces/IApiResponse";


export interface IHorizontalScrollListProps {
    elements: Array<IProduct | ICategory | IBrand>
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
                        const e_t = e as IProduct
                        return <HorizontalScrollList_Item style={{...style.elementStyle, width: props.elementSize}}  key={k} item={e_t}/>
                    })
                }
                {
                    props.type=="categories" && props.elements.map((e,k)=>{ 
                        const e_t = e as ICategory
                        return <HorizontalScrollList_Category style={{...style.elementStyle, width: props.elementSize}}  key={k} item={{id:e_t.categoryId, title:e_t.name,img:e_t.imageUrl}}/>
                    })
                }
                {
                    props.type=="brands" && props.elements.map((e,k)=>{ 
                        const e_t = e as IBrand
                        return <HorizontalScrollList_Brand style={{...style.elementStyle, width: props.elementSize}}  key={k} item={{id:e_t.brandId, title:e_t.name,img:e_t.logoUrl}}/>
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