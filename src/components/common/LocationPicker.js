import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from 'axios';

const LocationPicker = ({ city, setCity, district, setDistrict, ward, setWard }) => {
    const [cities, setCities] = useState([]); // State để lưu trữ danh sách các tỉnh/thành phố
    const [districts, setDistricts] = useState([]); // State để lưu trữ danh sách các quận/huyện
    const [wards, setWards] = useState([]); // State để lưu trữ danh sách các xã/phường

    // Fetching Cities
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                if (response.data.error === 0) {
                    setCities(response.data.data); // Cập nhật state với danh sách tỉnh/thành phố
                }
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };
        fetchCities();
    }, []);

    // Fetching Districts
    const fetchDistricts = async (cityId) => {
        try {
            const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${cityId}.htm`);
            if (response.data.error === 0) {
                setDistricts(response.data.data); // Cập nhật state với danh sách quận/huyện
            }
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    // Fetching Wards
    const fetchWards = async (districtId) => {
        try {
            const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
            if (response.data.error === 0) {
                setWards(response.data.data); // Cập nhật state với danh sách xã/phường
            }
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };

    const handleCityChange = (cityId) => {
        setCity(cityId);
        fetchDistricts(cityId);
    };

    const handleDistrictChange = (districtId) => {
        setDistrict(districtId);
        fetchWards(districtId);
    };

    // Bước 1: Tạo bảng ánh xạ ID và tên
    const cityMapping = {};
    cities.forEach(city => {
        cityMapping[city.id] = city.full_name;
    });

    const districtMapping = {};
    districts.forEach(district => {
        districtMapping[district.id] = district.full_name;
    });

    const wardMapping = {};
    wards.forEach(ward => {
        wardMapping[ward.id] = ward.full_name;
    });

    // Hàm chuyển đổi ID thành tên
    const getNameById = (id, mapping) => {
        return mapping[id] || '';
    };

    return (
        <View>
            <View style={styles.selectContainer}>
                <RNPickerSelect
                    value={city}
                    onValueChange={handleCityChange}
                    placeholder={{ label: 'Chọn tỉnh/thành phố', value: null }}
                    items={cities.map(city => ({ label: city.full_name, value: city.id }))}
                />
            </View>
            <View style={styles.selectContainer}>
                <RNPickerSelect
                    value={district}
                    onValueChange={handleDistrictChange}
                    placeholder={{ label: 'Chọn quận/huyện', value: null }}
                    items={districts.map(district => ({ label: district.full_name, value: district.id }))}
                />
            </View>
            <View style={styles.selectContainer}>
                <RNPickerSelect
                    value={ward}
                    onValueChange={setWard}
                    placeholder={{ label: 'Chọn xã/phường', value: null }}
                    items={wards.map(ward => ({ label: ward.full_name, value: ward.id }))}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    selectContainer: {
        marginVertical: 5,
        backgroundColor:"#FFF",
        borderRadius:15
    },
});

export default LocationPicker;
