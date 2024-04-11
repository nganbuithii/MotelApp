import { Animated, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useRef,useState } from "react";
// import { Data } from "../../assets/data";
import {Data} from "./Data"
import SliderItem from "./SliderItem";
import Pagination from "./Paginations";
const Slider = ({ navigation }) => {
const [index, setIndex] = useState(0);
const scrollX = useRef(new Animated.Value(0)).current;
const handleOnScroll = event => {
    Animated.event([
    {
        nativeEvent: {
        contentOffset: {
            x: scrollX,
        },
        },
    },
    ],
    {
    useNativeDriver:false
    })(event);
};

return (
    <View>
    <FlatList
        data={Data}
        renderItem={({ item }) => <SliderItem items={item} navigation={ navigation }/>}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
    />
    <Pagination data={Data} scrollX={scrollX} />
    </View>
);
};

export default Slider;


