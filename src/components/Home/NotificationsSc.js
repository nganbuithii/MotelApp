import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { COLOR, SHADOWS } from '../common/color';
import { Octicons } from '@expo/vector-icons';
import MyContext from '../../configs/MyContext';
import { collection, query, onSnapshot, orderBy, where } from "firebase/firestore";
import HomeStyles from '../../Styles/HomeStyles';
import { firestore } from "../../configs/firebase";
import caculatorTimeAgo from '../common/CaculatorTime';

const NotificationsSc = () => {
  const [user] = useContext(MyContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notificationsCollectionRef = collection(firestore, "Notifications");
    const q = query(
      notificationsCollectionRef,
      where("ownerPostId", "==", user.id), // Thêm điều kiện lọc
      orderBy("time", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allNotifications = querySnapshot.docs.map(doc => doc.data());
      setNotifications(allNotifications);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={HomeStyles.tab}>
        <Octicons name="bell-fill" size={24} color={COLOR.PRIMARY} style={HomeStyles.bellIcon} />
        <Text style={HomeStyles.textHead}>Thông báo</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image source={require('../../assets/images/noNotification.jpg')} style={{}} />
            <Text style={{textAlign:"center", fontSize:20,}}>Bạn chưa có thông báo mới!</Text>
          </View>
        ) : (
          notifications.map((notification, index) => (
            <View key={index} style={styles.notification}>
              <Image
                source={{ uri: notification.userAvatar }}
                style={styles.avatar}
              />
              <View style={styles.notificationContent}>
                <Text style={[styles.notificationText, styles.bold]}>
                  {notification.username}
                </Text>
                <Text style={styles.notificationText}>{notification.content}</Text>
              </View>
              <Text style={styles.dateText}>{caculatorTimeAgo(notification.time)}</Text>
            </View>
          ))
        )}
      </ScrollView>
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
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    color: COLOR.black,
  },
  bold: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#777',
    marginLeft: 'auto',
  },
});

export default NotificationsSc;
