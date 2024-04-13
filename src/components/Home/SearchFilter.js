import React, { useState } from "react";
import { View, Text } from "react-native";
import DropdownCus from "../common/Dropdown";

const Data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];


const SearchFilter = () => {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (value) => {
        setSelectedValue(value);
    };

    return (
        <View>
            <Text>Tìm phòng theo khu vực</Text>
            <View>
                <DropdownCus data={Data} value={selectedValue} onChange={handleChange} />
                <Text>Giá trị được chọn: {selectedValue ? selectedValue.label : ""}</Text>
            </View>

        
            


        </View>
    );
};

export default SearchFilter;
