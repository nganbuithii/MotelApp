import {
    StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert, Animated,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import MapView, { BingMapsProvider, Marker } from "react-native-maps";
const windowWidth = Dimensions.get("window").width;
import { Searchbar } from 'react-native-paper';
import { COLOR} from '../common/color';
import * as Location from 'expo-location';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import { Octicons } from "@expo/vector-icons";
const MapSearch = ({ navigation, route }) => {
    const [animation] = useState(new Animated.Value(400));
    const textInputRef = useRef(null);
    const API_key =
        "ArvHYzlNC_zl-qapSPj9KUSjb17DNAmCTHf0Lv-_sWiptCT-R26Ss9wvW5n9ytMr ";
    const [data, setData] = useState([]);
    const [latitude, setLatitude] = useState(10.809929161020303);
    const [longitude, setLongitude] = useState(106.65257484882906);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setsearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [searching, setsearching] = useState(false);
    const [showConfirmButton, setShowConfirmButton] = useState(false);
    const { selectedCity, selectedDistrict, selectedWard, other, idMotel } = route.params;
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    // let locationText;


    useEffect(() => {
        const queryParts = [];
        if (other) queryParts.push(other);
        if (selectedWard) queryParts.push(selectedWard);
        if (selectedDistrict) queryParts.push(selectedDistrict);
        if (selectedCity) queryParts.push(selectedCity);
        if (queryParts != null) {
            const query = queryParts.join(', ');
            setsearchQuery(query);
            if (query) {
                handleFind(query);
                
            }
        }
        console.log(other);
        console.log(selectedCity);
        console.log(queryParts);

        getCurrentLocation();



    }, [selectedCity, selectedDistrict, selectedWard, other]);
    const getCurrentLocation = async () => {
        try {
            setLoading(true);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setAddress(location.coords.latitude + ", " + location.coords.longitude);
            setLongitude(location.coords.longitude);
            setLatitude(location.coords.latitude);

            getAddressFromCoords(location.coords.latitude, location.coords.longitude);
        } catch (error) {
            console.error('Error getting current location:', error);
        } finally {
            setLoading(false);
        }
    };

    const getAddressFromCoords = async (latitude, longitude) => {
        const API_key = "ArvHYzlNC_zl-qapSPj9KUSjb17DNAmCTHf0Lv-_sWiptCT-R26Ss9wvW5n9ytMr";
        const url = `http://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}?key=${API_key}`;
        console.log(url);
        try {
            const response = await axios.get(url);
            console.log("RESPONSE", response);
            if (response.data.resourceSets.length > 0 && response.data.resourceSets[0].resources.length > 0) {
                const formattedAddress = response.data.resourceSets[0].resources[0].address.formattedAddress;
                console.log(formattedAddress);
                setAddress(formattedAddress);
                setsearchQuery(formattedAddress);
                if (formattedAddress) {
                    handleFind(formattedAddress);
                }
            } else {
                setErrorMsg('Không thể lấy địa chỉ hiện tại');
            }
        } catch (error) {
            setErrorMsg('Lỗi lấy vị trí');
            console.error(error);
        }
    };

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
                case 'Editpost':
                    navigation.navigate('Editpost', { lat: latitude, lon: longitude, nameLoc: locationName });
                    break;
                case 'EditMotel':
                    navigation.navigate('EditMotel', { lat: latitude, lon: longitude, nameLoc: locationName, idMotel: idMotel });
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
    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            const params = {};
            if (longitude) { params['lon'] = longitude; }
            if (latitude) { params['lat'] = latitude; }
            console.log("PARAMS:", params);
            let res = await authApi(token).get(endpoints["getMotelFilter"], {
                params: params
            });
            console.log("ok");
            console.log(res.data);
            setData(res.data.results);

        } catch (ex) {
            console.error(ex);
        }
    };
    const handleDetail = (idMotel) => {
        console.log(idMotel);
        navigation.navigate("PostDetail", { idMotel: idMotel })
    }
    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => handleDetail(item.id)}>
            <View style={styles.itemContainer}>
                {/* Phần hình ảnh */}
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/images/1.jpg')} style={styles.image} />
                </View>
                {/* Phần thông tin */}
                <View style={styles.infoContainer}>
                    {/* <View style={styles.infoRow}>
                        <Octicons name="location" size={15} color={COLOR.PRIMARY} />
                        <Text style={styles.infoText}>{item.city}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Octicons name="location" size={15} color={COLOR.PRIMARY} />
                        <Text style={styles.infoText}>{item.district}</Text>
                    </View> */}
                    <View style={styles.infoRow}>
                        <Octicons name="location" size={15} color={COLOR.PRIMARY} />
                        <Text style={styles.infoText}>{item.other_address}</Text>
                    </View>

                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    return (
        <ScrollView style={{ flex: 1 }}>
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
                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLocation}>
                            <Text style={styles.confirmButtonText}>Xác nhận vị trí</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
                            <Text style={styles.confirmButtonText}>Tìm kiếm xung quanh</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <FlatList
                    horizontal
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    // ListEmptyComponent={<Text style={styles.noResultText}>Không tìm thấy kết quả phù hợp.</Text>}
                    contentContainerStyle={styles.listContent}
                />
                <MapView
                    provider={BingMapsProvider}
                    apiKey={API_key}
                    style={{ flex: 1, height: 400 }}
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
        </ScrollView>
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
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    },
    confirmButton: {
        padding: 10,
        backgroundColor: COLOR.PRIMARY,
        borderRadius: 30,
        // marginHorizontal: 90,
        marginTop: 10,
        marginLeft:20,
        marginRight:10
    },
    //RENDERITEM
    itemContainer: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10,
        width: windowWidth - 20, // Sử dụng chiều rộng của màn hình trừ đi các khoảng cách padding
        marginHorizontal: 10,
    },
    imageContainer: {
        width: "100%", // Chiều rộng của hình ảnh
        height: 150, // Chiều cao của hình ảnh
        borderRadius: 10,
        marginRight: 10,
    },
    image: {
        width: '100%', // Đảm bảo hình ảnh lấp đầy không gian của phần tử cha
        height: '100%', // Đảm bảo hình ảnh lấp đầy không gian của phần tử cha
        borderRadius: 10,
    },
    infoContainer: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        // justifyContent: 'space-between', // Xóa thuộc tính này để giữ cho các phần tử trong infoContainer xếp chồng lên nhau
    },
    infoRow: {
        flexDirection: "row",
    },
    infoText: {
        marginLeft: 10,
    }
});
