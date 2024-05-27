import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { COLOR, SHADOWS } from '../common/color';
import { Octicons } from '@expo/vector-icons';
import MyContext from '../../configs/MyContext';
import { collection, query, onSnapshot, orderBy, where } from "firebase/firestore";
import HomeStyles from '../../Styles/HomeStyles';
import { firestore } from "../../configs/firebase";
import caculatorTimeAgo from '../common/CaculatorTime';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const NotificationsSc = () => {
  const [user] = useContext(MyContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Sử dụng useNavigation để lấy đối tượng navigation
  const navigation = useNavigation();

  useEffect(() => {
    const notificationsCollectionRef = collection(firestore, "Notifications");
    const q = query(
      notificationsCollectionRef,
      where("ownerPostId", "==", user.id),
      orderBy("time", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allNotifications = querySnapshot.docs.map(doc => doc.data());
      setNotifications(allNotifications);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const handleNotificationPress = (notification) => {
    // Kiểm tra nếu nội dung thông báo là "đã bình luận bài viết của bạn" thì mới chuyển hướng
    if (notification.content === "đã bình luận bài viết của bạn") {
      console.log("Thông báo đã được nhấp vào:", notification);
      // Sử dụng navigation.navigate để điều hướng đến màn hình Comment và truyền props
      navigation.navigate("Comment", { postId: notification.postId });
    }
  }

  return (
    <View style={styles.container}>
      <View style={HomeStyles.tab}>
        <Octicons name="bell-fill" size={24} color={COLOR.PRIMARY} style={HomeStyles.bellIcon} />
        <Text style={HomeStyles.textHead}>Thông báo</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLOR.PRIMARY} />
        </View>
      ) : (
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {notifications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image source={require('../../assets/images/noNotification.jpg')} style={{}} />
              <Text style={{ textAlign: "center", fontSize: 20 }}>Bạn chưa có thông báo mới!</Text>
            </View>
          ) : (
            notifications.map((notification, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.notification} 
                onPress={() => handleNotificationPress(notification)}
              >
                <Image
                  source={{ uri: notification.userAvatar }}
                  style={styles.avatar}
                />
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationText}>
                    <Text style={styles.bold}>{notification.username} </Text>
                    {notification.content}
                  </Text>
                  <Text style={styles.dateText}>{caculatorTimeAgo(notification.time)}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
    padding: 15,
    backgroundColor: COLOR.offWhite,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    ...SHADOWS.medium,
    borderLeftColor: COLOR.PRIMARY,
    borderLeftWidth: 5,
    marginBottom: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 15,
    borderWidth: 2,
    borderColor: COLOR.color11,
  },
  notificationContent: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',

  },
  notificationText: {
    fontSize: 16,
    color: COLOR.black,
  },
  bold: {
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#777',
    paddingBottom: 10,

  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationsSc;
