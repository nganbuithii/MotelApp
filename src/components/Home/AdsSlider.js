import React, { useState } from "react";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Dimensions, Image, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AdsSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState([
        { id: 1, imageUrl: require('../../assets/images/ad1.jpg') },
        { id: 2, imageUrl: require('../../assets/images/ad2.jpg') },
        { id: 3, imageUrl: require('../../assets/images/ad3.jpg') },
        { id: 4, imageUrl: require('../../assets/images/ad4.jpg') },
        { id: 5, imageUrl: require('../../assets/images/ad5.jpg') },
    ]);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Image source={item.imageUrl} style={styles.image} resizeMode="cover" />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Carousel
                data={images}
                renderItem={renderItem}
                sliderWidth={windowWidth}
                itemWidth={windowWidth * 0.8}
                layout={'tinder'}
                layoutCardOffset={'9'}
                loop={true}
                autoplay={true}
                autoplayInterval={5000}
                onSnapToItem={(index) => setActiveIndex(index)}
            />
            <Pagination
                dotsLength={images.length}
                activeDotIndex={activeIndex}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.dotStyle}
                inactiveDotStyle={styles.inactiveDotStyle}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "pink",
        height: 200, // Set a fixed height for the container view
    },
    item: {
        width: windowWidth * 0.8, // Adjust width based on your design
        height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 10,
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    inactiveDotStyle: {
        // Customize inactive dot style here
    },
});

export default AdsSlider;
