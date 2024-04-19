
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLOR } from '../common/color';
import { FontAwesome5 } from '@expo/vector-icons';
import MyStyles from '../../Styles/MyStyles';
const NotificationsSc = () => (
  <View style={styles.container}>
    <View style={styles.tab}>
      <FontAwesome5 name="bell" size={24} color="black" />
      <Text style={styles.textHead}>Thông báo</Text>
    </View>

  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    position: "relative"
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "pink",
  },
  textHead: {
    //backgroundColor:COLOR.offWhite,
    // width:"100%",
    padding: 15,
    // position:"absolute",
    // top:22,
    fontSize: 18,
    color: COLOR.PRIMARY,
    fontWeight: "500"
  }
})
export default NotificationsSc;
