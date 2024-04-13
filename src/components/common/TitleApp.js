import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TitleApp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NACA Motel</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#ffffff', // Màu nền của phần tiêu đề
  },
  text: {
    fontSize: 24, // Kích thước font chữ
    fontWeight: 'bold', // Độ đậm của font chữ
    color: '#333333', // Màu chữ
    textTransform: 'uppercase', // Chuyển đổi chữ thành in hoa
  },
});

export default TitleApp;
