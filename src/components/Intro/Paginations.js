    import React from 'react';
    import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import { COLOR } from '../common/color';
import IntroStyles from './IntroStyles';

    const { width } = Dimensions.get('window');
    const DOT_SIZE = 13;
    const DOT_SPACING = 15; // KHOẢNG CÁCH các chấm

    const Pagination = ({ data, scrollX }) => {
    return (
        <View style={IntroStyles.containerDot}>
            {data.map((_, index) => {
                const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: [COLOR.bg_color1, COLOR.color7, COLOR.bg_color1],
                    extrapolate: 'clamp',
                });
                return (
                    <Animated.View
                        key={index.toString()}
                        style={[styles.dot, { backgroundColor }]}
                    />
                );
            })}
        </View>
    );
    };

    const styles = StyleSheet.create({
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        margin: DOT_SPACING / 2,
    },
    });

    export default Pagination;
