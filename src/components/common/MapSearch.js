import {
    StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Alert, Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import MapView, { BingMapsProvider, Marker, Circle, } from "react-native-maps";

const windowWidth = Dimensions.get("window").width;
import { AntDesign } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { COLOR } from "./color";
import SearchSc from "../Home/SearchSc";

const MapSearch = ({ navigation, route }) => {
    const [animation] = useState(new Animated.Value(400));
    // const [searchQuery, setSearchQuery] = React.useState('');
    const textInputRef = useRef(null);
    const API_key =
        "ArvHYzlNC_zl-qapSPj9KUSjb17DNAmCTHf0Lv-_sWiptCT-R26Ss9wvW5n9ytMr ";

    const [latitude, setLatitude] = useState(10.809929161020303);
    const [longitude, setLongitude] = useState(106.65257484882906);

    const [searchQuery, setsearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [searching, setsearching] = useState(false);
    const [showConfirmButton, setShowConfirmButton] = useState(false);


    const handleFocus = () => {
        setsearching(true);
    };

    const handleUnFocus = () => {
        setsearching(false);
    };

    const handleFind = async (t) => {
        setsearchQuery(t);
        textInputRef.current.blur();
        setsearching(false);
        try {
            const response = await fetch(
                `https://dev.virtualearth.net/REST/v1/Locations?query=${t}&key=${API_key}`
            );
            const data = await response.json();
            const firstLocation = data.resourceSets[0].resources[0];
            const newlatitude = firstLocation.point.coordinates[0];
            const newlongitude = firstLocation.point.coordinates[1];

            // Set new latitude and longitude
            // This will update the map region
            setLatitude(newlatitude);
            setLongitude(newlongitude);
            setShowConfirmButton(true);
        } catch (error) {
            console.error("Error searching location:", error);
            Alert.alert(
                "Error",
                "An error occurred while searching for the location. Please try again later."
            );
        }
    };

    const handleQuery = async (t) => {
        setsearchQuery(t);
        setShowConfirmButton(!(t === "" || searching));
        if (t == "") {
            return;
        }
        try {
            const response = await fetch(
                `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${t}&key=${API_key}`
            );
            const data = await response.json();
            const suggestion = data.resourceSets[0].resources[0].value.map(
                (a) => a.address.formattedAddress
            );
            setSuggestions(suggestion);
        } catch (error) {
            console.error("Error searching suggestions:", error);
        }
    };

    const animatedStyle = {
        transform: [
            {
                translateY: animation,
            },
        ],
    };
    const handleConfirmLocation = async () => {
        try {
            const response = await fetch(
                `https://dev.virtualearth.net/REST/v1/Locations?query=${searchQuery}&key=${API_key}`
            );
            const data = await response.json();
            const firstLocation = data.resourceSets[0].resources[0];
            const locationName = firstLocation.name; // Lấy tên vị trí
            console.log(latitude);
            console.log(locationName);
            console.log(longitude);
            const previousScreen = route.params?.previousScreen;

            // Tùy thuộc vào màn hình trước đó, thực hiện điều hướng tương ứng
            switch (previousScreen) {
                case 'SearchSc':
                    navigation.navigate('SearchSc', { lat: latitude, lon: longitude, nameLoc: locationName });
                    break;
                case 'RegisterMotel':
                    navigation.navigate('RegisterMotel', { lat: latitude, lon: longitude, nameLoc: locationName });
                    break;
                case 'CreatePostRent':
                    navigation.navigate('CreatePostRent', { lat: latitude, lon: longitude, nameLoc: locationName });
                    break;
                default:
                    navigation.goBack(); // Trường hợp mặc định, quay lại màn hình trước
                    break;
            }
        } catch (error) {
            console.error("Error searching location:", error);
            Alert.alert(
                "Error",
                "An error occurred while searching for the location. Please try again later."
            );
        }
    };
    
    return (
        <View style={styles.container}>
            <Searchbar
                // style={styles.searchInput}
                placeholder="Nhập vị trí bạn tìm..."
                value={searchQuery}
                onChangeText={handleQuery}
                onFocus={handleFocus}
                onBlur={handleUnFocus}
                ref={textInputRef}
                placeholderTextColor="black"
                style={{ marginTop: 10, backgroundColor: COLOR.color12 }}
                iconColor="#fff"
            />

            <View style={styles.suggestion}>
                {suggestions.length == 0 || searching == false ? (
                   <></>
                ) : (
                    <>
                        {suggestions.map((s, index) => (
                            <TouchableOpacity key={index} onPress={() => handleFind(s)}>
                                <Text style={styles.txtsugestion}>{s}</Text>
                            </TouchableOpacity>
                        ))}
                    </>
                )}
            </View>
                {showConfirmButton && (
                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLocation}>
                        <Text style={styles.confirmButtonText}>Xác nhận vị trí</Text>
                    </TouchableOpacity>
                )}
            <MapView
                provider={BingMapsProvider}
                apiKey={API_key}
                style={{ flex: 1 }}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    title="Home"
                    description="Marker Description"
                />
            </MapView>

        </View>
    );
};

export default MapSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    labelsearch: {
        width: (windowWidth * 90) / 100,
        position: "absolute",
        zIndex: 999,
        top: 50,
        height: 40,
        backgroundColor: "#fff",
        left: (windowWidth - (windowWidth * 90) / 100) / 2,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 15,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    searchInput: {
        width: "70%",
    },
    suggestion: {
        width: (windowWidth * 90) / 100,
        position: "absolute",
        zIndex: 999,
        left: (windowWidth - (windowWidth * 90) / 100) / 2,
        top: 100,
        backgroundColor: "lightgreen",
        // padding:30,
        borderRadius: 30,
    },
    txtsugestion: {
        fontSize: 14,
        // borderBottomColor: "gray",
        // borderWidth: 1,
        padding: 10,
        borderBottomColor: "#fff",
        borderBottomWidth: 2,
        // padding:10,
        marginHorizontal: 20,
        paddingVertical: 15
    },
    confirmButtonText: {
        color: COLOR.PRIMARY,
        textAlign:"center",
        fontWeight:"bold",
        fontSize:16
    },
    confirmButton: {
        padding: 20,
        backgroundColor:"lightgreen",
        borderRadius: 30,
        marginHorizontal: 90,
        marginTop:10
    }
});
