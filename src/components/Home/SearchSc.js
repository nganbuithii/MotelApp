import React, { useContext, useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator,  } from "react-native";
import { COLOR, SHADOWS } from "../common/color";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome, FontAwesome5, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ButtonAuth from "../common/ButtonAuth";
import SearchStyle from "../../Styles/SearchStyle";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import HomeStyles from "../../Styles/HomeStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";

const SearchSc = () => {
  const [cities, setCities] = useState([]); // State để lưu trữ danh sách các tỉnh/thành phố
  const [districts, setDistricts] = useState([]); // State để lưu trữ danh sách các quận/huyện
  const [wards, setWards] = useState([]);

  const [loading, setLoading] = useState(false);
  const [ward, setWard] = useState(null);
  const [district, setDistrict] = useState(null);
  const [city, setCity] = useState(null);
  const [other, setOther] = useState(null);
  const [priceFilter, setPriceFilter] = useState();
  const [areaFilter, setAreaFilter] = useState();
  const [searchStarted, setSearchStarted] = useState(false);


  const [data, setData] = useState([]);

  // Hàm để lấy danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
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

  // Hàm để lấy danh sách xã/phường dựa trên quận/huyện được chọn
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
  // Hàm xử lý khi tỉnh/thành phố được chọn
  const handleCityChange = (cityId) => {
    fetchDistricts(cityId); // Gọi hàm để lấy danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
  };

  // Hàm xử lý khi quận/huyện được chọn
  const handleDistrictChange = (districtId) => {
    fetchWards(districtId); // Gọi hàm để lấy danh sách xã/phường dựa trên quận/huyện được chọn
  };

  // Lấy danh sách tỉnh/thành phố khi component được render
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
  // Tạo bảng dữ liệu ánh xạ ID và tên của tỉnh/thành phố, quận/huyện
  const cityMapping = {};
  cities.forEach(city => {
    cityMapping[city.id] = city.full_name;
  });

  const districtMapping = {};
  districts.forEach(district => {
    districtMapping[district.id] = district.full_name;
  });

  // Hàm để chuyển đổi ID thành tên tỉnh/thành phố, quận/huyện
  // const getCityNameById = (cityId) => {
  //   return cityMapping[cityId] || '';
  // };

  // const getDistrictNameById = (districtId) => {
  //   return districtMapping[districtId] || '';
  // };
  // Tạo bảng dữ liệu ánh xạ ID và tên của xã/phường
  const wardMapping = {};
  wards.forEach(ward => {
    wardMapping[ward.id] = ward.full_name;
  });

  // Hàm để chuyển đổi ID thành tên xã/phường
  // const getWardNameById = (wardId) => {
  //   return wardMapping[wardId] || '';
  // };
  const handleSubmit = async () => {
    try {
      setSearchStarted(true); // Đánh dấu việc bắt đầu tìm kiếm
      const token = await AsyncStorage.getItem("access-token");
      const params = {};

      if (ward) { params['ward'] = ward; }
      if (district) { params['district'] = district; }
      if (city) { params['city'] = city; }
      if (other) { params['other_address'] = other; }
      if (priceFilter == "descrease") {
        params['ordering'] = '-price';
      } else if (priceFilter == "increase") {
        params['ordering'] = 'price';
      }
      else {
        params['price'] = priceFilter;
      }
      if (areaFilter == "desc") {
        params['ordering'] = '-area'
      }
      else if (areaFilter == "asc") {
        params['ordering'] = 'area'
      }
      else {
        params['area'] = areaFilter;
      }
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
  const handleClearFilter = () => {
    setCity(null);
    setDistrict(null);
    setWard(null);
    setOther(null);
    setPriceFilter(null);
    setAreaFilter(null);
    // Sau khi cập nhật state, gọi hàm handleSubmit để tải lại dữ liệu theo các giá trị mặc định
    setData([]);
  };
  const renderItem = ({ item }) => (
    <View style={SearchStyle.itemContainer}>
      <Image source={require('../../assets/images/1.jpg')} style={SearchStyle.image} />
      <View style={SearchStyle.infoContainer}>
        <Text style={SearchStyle.title}><Octicons name="location" size={15} color={COLOR.PRIMARY} />ㅤ{item.city}</Text>
        <Text><Octicons name="location" size={15} color={COLOR.PRIMARY} />ㅤ{item.district}</Text>
        <Text><Octicons name="location" size={15} color={COLOR.PRIMARY} />ㅤ{item.other_address}</Text>
        <Text>Giá: {item.price} VNĐ</Text>
        <Text>Diện tích: {item.area} m2</Text>
        <TouchableOpacity>
          <Text style={{ textAlign: "right", color: "lightgreen" }}> Xem chi tiết <AntDesign name="caretright" size={15} color="lightgreen" /> </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
  return (
    <View style={SearchStyle.container}>

      <View style={HomeStyles.tab} >
        <MaterialCommunityIcons name="filter-menu" size={24} color={COLOR.PRIMARY} style={HomeStyles.bellIcon} />
        <Text style={HomeStyles.textHead}>Lọc tìm kiếm </Text>

      </View>
      <TouchableOpacity  style={SearchStyle.xoaLoc} onPress={handleClearFilter}>
        <MaterialIcons name="filter-alt-off" size={24} color="black" />
        <Text> Xóa lọc</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={SearchStyle.scrollView}>

        <View style={SearchStyle.selectContainer}>
          <RNPickerSelect
            value={city}
            onValueChange={(value) => {
              setCity(value);
              handleCityChange(value); 
            }}
            placeholder={{ label: 'Chọn tỉnh/thành phố', value: null }}
            items={cities.map(city => ({ label: city.full_name, value: city.full_name }))}
          />
        </View>
        <View style={SearchStyle.selectContainer}>
          <RNPickerSelect
            value={district}
            onValueChange={(value) => {
              setDistrict(value);
              handleDistrictChange(value); // Gọi hàm xử lý khi quận/huyện được chọn
            }}
            placeholder={{ label: 'Chọn quận/huyện', value: null }}
            items={districts.map(district => ({ label: district.full_name, value: district.full_name }))}
          />
        </View>

        <View style={SearchStyle.selectContainer}>
          <RNPickerSelect
            value={ward}
            onValueChange={(value) => setWard(value)}
            placeholder={{ label: 'Chọn xã/phường', value: null }}
            items={wards.map(ward => ({ label: ward.full_name, value: ward.full_name }))}
          />
        </View>
        <View style={SearchStyle.inputContainer}>
          <Ionicons
            style={SearchStyle.icon}
            name="location-sharp"
            size={24}
            color="black"
          />
          <TextInput
            style={SearchStyle.input}
            value={other}
            onChangeText={setOther}
            placeholder="Địa chỉ khác"
          />
        </View>
        <View style={SearchStyle.selectContainer}>
          <RNPickerSelect
            value={priceFilter}
            onValueChange={(value) => setPriceFilter(value)}
            placeholder={{ label: 'Lọc theo giá', value: null }}
            items={[
              { label: 'Giá giảm', value: 'descrease' },
              { label: 'Giá tăng', value: 'increase' },
              { label: 'Dưới 2 triệu', value: 'under_2m' },
              { label: 'Từ 2 đến 5 triệu', value: '2m_to_5m' },
              { label: 'Trên 8 triệu', value: 'over_8m' },
            ]}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => { // Thêm icon vào select box
              return <AntDesign name="caretdown" size={12} color="gray" />
            }}

          /></View>

        <View style={SearchStyle.selectContainer}>
          <RNPickerSelect
            value={areaFilter}
            onValueChange={(value) => setAreaFilter(value)}
            placeholder={{ label: 'Lọc theo diện tích', value: null }}
            items={[
              { label: 'Dưới 20m²', value: 'under_20m' },
              { label: 'Từ 20m² đến 50m²', value: '20m_to_50m' },
              { label: 'Trên 100m²', value: '50m_to_100m' },
              { label: 'Diện tích giảm dần', value: 'desc' },
              { label: 'Diện tích tăng dần', value: 'asc' },
            ]}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            Icon={() => { // Thêm icon vào select box
              return <AntDesign name="caretdown" size={12} color="gray" />
            }}
          /></View>

        <View style={SearchStyle.buttonContainer}>
          {loading ? (<ActivityIndicator />) : (
            <ButtonAuth title=" Áp dụng" onPress={handleSubmit} />)}
        </View>

        {searchStarted ? (
  <View>
    {data.length > 0 ? (
      data.map(item => renderItem({ item, key: item.id })) // Thêm key cho mỗi phần tử
    ) : (
      <Text style={SearchStyle.noResultText} key="no-result">Không tìm thấy kết quả phù hợp.</Text>
    )}
  </View>
) : null}


      </ScrollView>
      {/* </View> */}
    </View>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    color: '#000',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#fff',
  },
  iconContainer: {
    top: 15,
    right: 15,
  },
});
export default SearchSc;
