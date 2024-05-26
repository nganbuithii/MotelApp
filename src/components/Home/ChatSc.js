import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLOR, SHADOWS } from '../common/color';
import HomeStyles from '../../Styles/HomeStyles';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../../configs/firebase';
import { addDoc, collection, orderBy, query, onSnapshot, getDocs } from "firebase/firestore";
import ChatDetail from './ChatDetail';

const ChatSc = () => {
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatSessions, setChatSessions] = useState([]);
  const [owner, setOwner] = useState();
  const navigation = useNavigation(); // Sử dụng hook useNavigation

  useEffect(() => {
    const fetchChatSessions = async () => {
      const chatSessionsRef = collection(firestore, 'chatSessions');
      const chatSessionsQuery = query(chatSessionsRef, orderBy('lastMessageTime', 'desc'));

      const unsubscribe = onSnapshot(chatSessionsQuery, (querySnapshot) => {
        const sessionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChatSessions(sessionsData);
      });

      return () => unsubscribe();
    };
  
    fetchChatSessions();
  }, []);

  

  const navigateToChatDetail = (item) => {
    // Thực hiện chuyển đến trang chat detail với thông tin người dùng
    console.log('Navigate to chat detail for:', item);
    // Ví dụ:
    // navigation.navigate('ChatDetail', { chatSession: item });
  };

  const renderChatSessionItem = ({ item }) => (
    <TouchableOpacity style={styles.userContainer} onPress={() => navigation.navigate('ChatDetail', { ownerId: item.ownerId })} >

     
      <Image source={{ uri: item.ownerAvatar }} style={styles.avatar} />
      <View style={styles.lastMessageContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{item.ownerName}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
        <Text>{owner}</Text>
        <Text style={styles.lastMessageTime}>{formatTime(item.lastMessageTime)}</Text>
      </View>
    </TouchableOpacity>
  );
  
  // Hàm định dạng thời gian
  const formatTime = (time) => {
    // Kiểm tra nếu thời gian là một object
    if (typeof time === 'object' && time.seconds && time.nanoseconds) {
      // Chuyển đổi thời gian thành dạng địa phương có thể hiển thị
      const date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
      return date.toLocaleString(); // Chuyển đổi thời gian thành chuỗi địa phương
    }
    return ''; // Trả về chuỗi trống nếu không thành công
  };
  
    const Test = () => {
      console.log(owner);
    }

  return (
    <View style={{ flex: 1 }}>
      <View style={HomeStyles.tab}>
        <MaterialCommunityIcons name="wechat" size={30} color={COLOR.PRIMARY} style={HomeStyles.bellIcon} />
        <Text style={HomeStyles.textHead}>Tin nhắn của bạn</Text>
      </View>

      <Searchbar
        placeholder="Search"
        value={searchQuery}
        iconColor={COLOR.PRIMARY} // Màu của biểu tượng tìm kiếm
        style={styles.searchBar}
      />

      <FlatList
        data={chatSessions}
        renderItem={renderChatSessionItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};




const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#999999',
  },
});


export default ChatSc;
