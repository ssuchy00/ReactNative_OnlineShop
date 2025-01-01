import React from "react";
import { View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";

const Overflow = (props:{style:any}) => {
    return (
        <View style={props.style}>
            <Svg width="61" height="245" viewBox="0 0 61 245" fill="none">
                <Rect
                    x="0.746643"
                    y="0.0209961"
                    width="60.1224"
                    height="244.247"
                    fill="url(#paint0_linear_808_2)"
                />
                <Defs>
                    <LinearGradient
                    id="paint0_linear_808_2"
                    x1="60.869"
                    y1="133.418"
                    x2="15.1815"
                    y2="133.418"
                    gradientUnits="userSpaceOnUse"
                    >
                    <Stop stopColor="#fff" />
                    <Stop offset="1" stopColor="#737373" stopOpacity="0" />
                    </LinearGradient>
                </Defs>
            </Svg>
        </View>

    )
}

export default Overflow