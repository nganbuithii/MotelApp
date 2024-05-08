import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MyStyles from '../../Styles/MyStyles';
import { COLOR } from '../common/color';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HomeStyles from '../../Styles/HomeStyles';
const SearchSc = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={24} color={COLOR.PRIMARY} />
        <TextInput style={styles.inputSearch} placeholder='Tìm kiếm'/>
      </View>

      {/* Bộ lọc */}
      <TouchableOpacity style={HomeStyles.profileContainer} onPress={() => navigation.navigate("SearchFilter")}>
        <View style={MyStyles.flex}>
          <Entypo name="location-pin" size={24} color="black" />
          <Text>Khu vực :</Text>
          <Text style={styles.txtLocation}>TP.Hồ chí minh</Text>
          {/* <View style={HomeStyles.iconContainer}>
            <FontAwesome name="filter" size={24} color="black" />
          </View> */}
        
        </View>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  inputSearch: {
    marginLeft: 10,
    flex: 0.95,
    fontSize: 16,
  },
  txtLocation:{
    color:COLOR.PRIMARY,
    fontWeight:"500"
  },
  icFilter:{
    marginLeft:"auto"
  }
});

export default SearchSc;
