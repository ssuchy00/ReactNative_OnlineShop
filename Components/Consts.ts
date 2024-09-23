import { Dimensions } from "react-native";

export const COLORS = {
    mainColor: "#D66700"
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const vw = (percentWidth:number) => {
    return screenWidth * (percentWidth / 100)
}

export const vh = (percentHeight:number) => {
    return screenHeight * (percentHeight / 100)
}