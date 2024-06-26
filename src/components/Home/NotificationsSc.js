import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { COLOR, SHADOWS } from '../common/color';
import { Octicons } from '@expo/vector-icons';
import MyContext from '../../configs/MyContext';
import { collection, query, onSnapshot, orderBy, where } from "firebase/firestore";
import HomeStyles from '../../Styles/HomeStyles';
import { firestore } from "../../configs/firebase";
import caculatorTimeAgo from '../common/CaculatorTime';
import { useNavigation } from '@react-navigation/native';
import LoadingPage from '../Loading/LoadingPage';

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
    if (notification.content.includes("thích")) {
      console.log("Thông báo đã được nhấp vào:", notification);
      navigation.navigate("DetailPost",{postId:notification.postId});
    } else if (notification.content.includes("bình luận")) {
      console.log("Thông báo đã được nhấp vào:", notification);
      navigation.navigate("Comment", { postId: notification.postId, ownerPostId:notification.ownerPostId });
    } else if (notification.content.includes("theo dõi")) {
      console.log("Thông báo đã được nhấp vào:", notification);
      // navigation.navigate("Comment", { postId: notification.postId, ownerPostId:notification.ownerPostId });
      navigation.navigate("DetailOwner", { ownerId: notification.userLike});
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
          <LoadingPage/>
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
    marginTop: 5,
    padding: 15,
    backgroundColor: COLOR.offWhite,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    ...SHADOWS.medium,
    borderLeftColor: COLOR.PRIMARY,
    borderLeftWidth: 5,
    marginBottom: 5,
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
    width:"98%"
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
