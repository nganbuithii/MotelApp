import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import AnimatedMapRegion from "react-native-maps/lib/AnimatedRegion";
import { AnimatedRegion } from "react-native-maps";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Searchbar } from 'react-native-paper';

const MapSearch = () => {
    
    const [searchQuery, setSearchQuery] = React.useState('');
    
    const onRegionChange = (region) => {
        console.log(region)
    }
    return (
        <View style={styles.container}>
            {/* <Text> hELO MAP</Text> */}
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={{backgroundColor:COLOR.bg_color1, marginBottom:10}}
            />
            <TouchableOpacity style={styles.imagePicker} >
                <SimpleLineIcons name="location-pin" size={24} color="black" />
                <Text >Vị trí</Text>
            </TouchableOpacity>
            <MapView
                style={{ width: "100%", height: 300 }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton
                onRegionChangeComplete={onRegionChange}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:30,
        // padding: 10,
        // position: 'relative',
    },
    imagePicker: {
        backgroundColor: "pink",
        padding: 30
    }
})
export default MapSearch;