import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLOR, SHADOWS } from '../common/color';
import HomeStyles from '../../Styles/HomeStyles';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../../configs/firebase';
import { addDoc, collection, orderBy, query, onSnapshot, getDocs } from "firebase/firestore";
import ChatDetail from './ChatDetail';
import MyContext from '../../configs/MyContext';
import caculatorTimeAgo from "../../components/common/CaculatorTime"

const ChatSc = () => {
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatSessions, setChatSessions] = useState([]);
  const [user, dispatch] = useContext(MyContext);
  const [owner, setOwner] = useState();
  const navigation = useNavigation(); // Sử dụng hook useNavigation

  useEffect(() => {
    const fetchChatSessions = async () => {
      const chatSessionsRef = collection(firestore, 'chatSessions');
      const chatSessionsQuery = query(chatSessionsRef, orderBy('lastMessageTime', 'desc'));

      const unsubscribe = onSnapshot(chatSessionsQuery, (querySnapshot) => {
        const sessionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Lọc chỉ giữ lại các session mà ownerId hoặc userIdSend trùng với user.id đang đăng nhập
        const filteredSessions = sessionsData.filter(session => session.ownerIdReceive === user.id || session.userIdSend === user.id);
        setChatSessions(filteredSessions);
        console.log("SESSSION DATA", sessionsData);
        console.log("DTAA LỌC:", filteredSessions);
      });

      return () => unsubscribe();
    };

    fetchChatSessions();
  }, []);



  const navigateToChatDetail = (item) => {
    const ownerId = user.id === item.ownerIdReceive ? item.userIdSend : item.ownerIdReceive;
    navigation.navigate('ChatDetail', { ownerId });
  };

  const renderChatSessionItem = ({ item }) => (
    <TouchableOpacity style={styles.chatSessionContainer} onPress={() => navigateToChatDetail(item)}>
      <Image source={{ uri: user.id === item.ownerIdReceive ? item.userAvatarSend : item.ownerAvatarReceive }} style={styles.avatar} />
      <View style={styles.chatSessionInfo}>
        <Text style={styles.userName}>{user.id === item.ownerIdReceive ? item.usernameSend : item.ownerNameReceive}</Text>
        <Text style={styles.lastMessage}>
          {/* {user.id === item.ownerIdReceive ? item.ownerNameReceive + ": " : "Bạn: "} */}
          {item.lastMessage}</Text>
      </View>
      <Text style={styles.lastMessageTime}>{caculatorTimeAgo(item.lastMessageTime)}</Text>
    </TouchableOpacity>
  );


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
        iconColor="black"// Màu của biểu tượng tìm kiếm
        style={styles.searchBar}

      />
      {chatSessions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={require('../../assets/images/nomess.png')} style={styles.emptyImage} />
          <Text style={styles.emptyText}>Bạn chưa có tin nhắn nào!!</Text>
        </View>


      ) : (
        <FlatList
          data={chatSessions}
          renderItem={renderChatSessionItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  bellIcon: {
    marginRight: 10,
  },
  textHead: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: COLOR.bg_color1
  },
  chatSessionContainer: {
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
  chatSessionInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666666',
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#999999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
  },
});


export default ChatSc;
