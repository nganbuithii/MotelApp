import React, { useCallback, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { firestore } from "../../configs/firebase";
import { addDoc, collection, orderBy, query, onSnapshot, updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
import MyContext from "../../configs/MyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import { COLOR } from "../common/color";
import HomeStyles from "../../Styles/HomeStyles";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import LoadingPage from "../Loading/LoadingPage";

const ChatDetail = ({ route }) => {
  const { ownerId } = route.params;
  const [user, dispatch] = useContext(MyContext);
  const chatId = [user.id.toString(), (ownerId || '').toString()].sort().join('_') + '_message';
  const navigation = useNavigation();
  const [owner, setOwner] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInfoOwner = async () => {
    try {
      const token = await AsyncStorage.getItem("access-token");
      const res = await authApi(token).get(endpoints["detailOwner"](ownerId));
      setOwner(res.data);
      console.log("SET OWNER THÀNH CÔNG");
      console.log("LẤY DATAAAA");
      console.log(res.data);
      setLoading(false);
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    getInfoOwner();
  }, []);

  useEffect(() => {
    const subscriber = collection(firestore, "chats", chatId, "messages");
    const shortSubscriber = query(subscriber, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(shortSubscriber, (querySnapshot) => {
      const allMessages = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), createdAt: doc.data().createdAt.toDate() };
      });
      setMessages(allMessages);
    });
    return () => unsubscribe();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const timestamp = new Date();
    const chatSessionDocRef = doc(firestore, "chatSessions", chatId);

    try {
      // Kiểm tra xem owner đã được gán dữ liệu hay chưa
      if (owner != null) {
        const chatSessionDoc = await getDoc(chatSessionDocRef);
        if (!chatSessionDoc.exists()) {
          await setDoc(chatSessionDocRef, {
            ownerIdReceive: ownerId,
            ownerNameReceive: owner.username,
            ownerAvatarReceive: owner.avatar,
            userIdSend: user.id,
            usernameSend: user.username,
            userAvatarSend: user.avatar,
            lastMessage: msg.text,
            lastMessageTime: timestamp,
            isSeen: false,
          });
          console.log("Lưu vào chat session thành công");
        } else {
          await updateDoc(chatSessionDocRef, {
            lastMessage: msg.text,
            lastMessageTime: timestamp
          });
          console.log("Cập nhật last message thành công");
        }
      } else {
        console.error("Không tìm thấy thông tin chủ sở hữu");
        return;
      }
    } catch (error) {
      console.error("Lỗi khi lưu tin nhắn vào chat session:", error);
    }

    const myMsg = {
      ...msg,
      sendBy: user.id,
      sendTo: ownerId,
      createdAt: msg.createdAt,
      isSeen: false
    };

    try {
      await addDoc(collection(firestore, "chats", chatId, "messages"), myMsg);
      console.log("gửi tin thành công")
    } catch (error) {
      console.error("Lỗi khi thêm tin nhắn vào chats:", error);
    }
  }, [owner]);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'white', // Màu văn bản khi tin nhắn được gửi
          },
          left: {
            color: 'black', // Màu văn bản khi tin nhắn được nhận
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: COLOR.bg_color1, // Màu nền khi tin nhắn được nhận
          },
          right: {
            backgroundColor: COLOR.PRIMARY, // Màu nền khi tin nhắn được gửi
          },
        }}
      />
    );
  };

  const exitChat = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[HomeStyles.tab, { position: "relative" }]}>
        <TouchableWithoutFeedback onPress={exitChat}>
          <Ionicons name="arrow-back-outline" size={24} color={COLOR.PRIMARY} style={{ position: "absolute", top: -8, left: -150 }} />
        </TouchableWithoutFeedback>

        <Entypo name="chat" size={24} color={COLOR.PRIMARY} style={[HomeStyles.bellIcon]} />
        {owner && (
          <Text style={HomeStyles.textHead}>{owner.username}</Text>
        )}
      </View>
      {loading ? <LoadingPage /> : (
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{ _id: user.id }}
          renderAvatar={(props) => (
            <Avatar.Image {...props} source={{ uri: owner.avatar }} size={32} />
          )}
          renderBubble={renderBubble}
          placeholder="Nhập tin nhắn..."
          alwaysShowSend={true}
          // showUserAvatar={user.avatar}
          multiline
          
        />
      )}
    </View>
  );
};

export default ChatDetail;
