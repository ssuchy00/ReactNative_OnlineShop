import { ColorValue, Dimensions, DimensionValue, StyleProp, StyleSheet } from "react-native";


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const vw = (percentWidth:number) => {
    return screenWidth * (percentWidth / 100)
}

export const vh = (percentHeight:number) => {
    return screenHeight * (percentHeight / 100)
}

export const center:StyleProp<any> = {
    marginLeft: "auto", marginRight: "auto"
} 


export const borderStyle:StyleProp<any> = (width: any, color?: ColorValue) => {
    return {
        borderWidth: width,
        borderColor: color??"black",
    }
}

export const borderBottomStyle:StyleProp<any> = (width: any, color?: ColorValue) => {
    return {
        borderBottomWidth: width,
        borderBottomColor: color??"black",
    }
}

export const borderTopStyle:StyleProp<any> = (width: any, color?: ColorValue) => {
    return {
        borderTopWidth: width,
        borderTopColor: color??"black",
    }
}
export const borderLeftStyle:StyleProp<any> = (width: any, color?: ColorValue) => {
    return {
        borderLeftWidth: width,
        borderLeftColor: color??"black",
    }
}

export const margin = (top:DimensionValue, right:DimensionValue, bottom:DimensionValue, left:DimensionValue) => {
    return {marginTop: top??0, marginRight: right??0, marginBottom: bottom??0, marginLeft: left??0} 
}

 

export const ButtonStyles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 10,
        padding: 10,
    },
    textStyle: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold"
    }

})
 