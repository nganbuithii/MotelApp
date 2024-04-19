import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLOR, SHADOWS } from '../common/color';
import { Octicons } from '@expo/vector-icons';
import MyContext from '../../configs/MyContext';
import { ScrollView } from 'react-native-gesture-handler';
import HomeStyles from './HomeStyles';

const NotificationsSc = () => {
  const [user] = useContext(MyContext);

  return (
    <View style={styles.container}>
    

      <View style={HomeStyles.tab}>
        <Octicons name="bell-fill" size={24} color={COLOR.PRIMARY} style={HomeStyles.bellIcon} />
        <Text style={HomeStyles.textHead}>Thông báo</Text>
        {/* <Image
        source={require('../../assets/images/bell.gif')}
        style={styles.avatar}
      /> */}
      </View>

      {/* Thông báo 1 */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.notification}>
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
          <View style={styles.notificationContent}>
            <Text style={[styles.notificationText, styles.bold]}>
              {user.username}
            </Text>
            <Text style={styles.notificationText}> đã theo dõi bạn</Text>
          </View>
          <Text style={styles.dateText}>Hôm nay</Text>
        </View>

        {/* Thông báo 2 */}
        <View style={styles.notification}>
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
          <View style={styles.notificationContent}>
            <Text style={[styles.notificationText, styles.bold]}>
              {user.username}
            </Text>
            <Text style={styles.notificationText}> đã thích bài đăng của bạn nhà trọ fioifhuguiwfh</Text>
          </View>
          <Text style={styles.dateText}>Hôm nay</Text>
        </View>

        {/* Thông báo 3 */}
        <View style={styles.notification}>
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
          <View style={styles.notificationContent}>
            <Text style={[styles.notificationText, styles.bold]}>
              {user.username}
            </Text>
            <Text style={[styles.notificationText, styles.txt]}> đã theo dõi bạn</Text>
          </View>
        </View>
        <View style={styles.notification}>
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
          <View style={styles.notificationContent}>
            <Text style={[styles.notificationText, styles.bold]}>
              {user.username}
            </Text>
            <Text style={[styles.notificationText, styles.txt]}> đã theo dõi bạn</Text>
          </View>
        </View>
        <View style={styles.notification}>
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
          <View style={styles.notificationContent}>
            <Text style={[styles.notificationText, styles.bold]}>
              {user.username}
            </Text>
            <Text style={[styles.notificationText, styles.txt]}> đã theo dõi bạn</Text>
          </View>
        </View>
        <View style={styles.notification}>
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
          <View style={styles.notificationContent}>
            <Text style={[styles.notificationText, styles.bold]}>
              {user.username}
            </Text>
            <Text style={[styles.notificationText, styles.txt]}> đã theo dõi bạn</Text>
          </View>
        </View>



      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,

    marginHorizontal: 2
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  // tab: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent:"center",
  //   width: "100%",
  //   backgroundColor: COLOR.color11,
  //   paddingVertical: 25,
  //   paddingLeft: 10,
  //   ...SHADOWS.medium,
  // },
  // textHead: {
  //   fontSize: 18,
  //   color: COLOR.PRIMARY,
  //   fontWeight: "500",
  //   textAlign: "center",
  //   marginTop: 10,
  //   marginLeft: 10
  // },
  // bellIcon: {
  //   marginRight: 3,
  //   marginTop:10
  // },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    backgroundColor: COLOR.offWhite,
    borderRadius: 5,
    width: '96%',
    ...SHADOWS.medium,
    borderLeftColor: COLOR.PRIMARY,
    borderLeftWidth: 7,
    marginTop: 5
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 3,
    borderColor: COLOR.color11
  },
  notificationContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 25
  },
  notificationText: {
    fontSize: 16,
  },
  txt: {
    marginRight: 50
  },
  bold: {
    fontWeight: 'bold',
  },
  dateText: {
    marginLeft: 'auto',
    fontSize: 14,
    color: '#777',
  },
});

export default NotificationsSc;
