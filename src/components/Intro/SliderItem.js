import {StyleSheet, Text,View,Image,Dimensions,Animated,ImageBackground, Easing} from "react-native";
import React, { useRef } from "react";
import Start from "./Start";
import {COLOR} from '../common/color'
const { width, height } = Dimensions.get("screen");
import IntroStyles from "./IntroStyles";

const SliderItem = ({ items,navigation  }) => {
    return (
    <View style={IntroStyles.containerItem}>
        <ImageBackground source={items.image} resizeMode="cover" style={IntroStyles.backgroundImage}>
                <View style={IntroStyles.overlay}>
                    <View style={IntroStyles.content}>
                        <Text style={IntroStyles.title}>{items.title}</Text>
                        <Text style={IntroStyles.description}>{items.description}</Text>
                    </View>
                    <View style={IntroStyles.buttonStart}>
                        {items.id == 4 ? <Start navigation={navigation}/> : <></>}
                    </View>
                </View>
            </ImageBackground>
    </View>
    );
};

export default SliderItem;
    

