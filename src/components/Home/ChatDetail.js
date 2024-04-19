import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MyContext from '../../configs/MyContext';

const ChatDetail = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [user, dispatch] = useContext(MyContext);

  const handleSendMessage = () => {
    if (inputText.trim() === '') {
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      // Add sender information here
      sender: {
        name: 'Me',
        avatar: require('../../assets/images/a1.png'), // Change this to your avatar source
      },
      // Add a flag to identify your messages
      isMyMessage: true,
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.isMyMessage && styles.myMessageContainer]}>
            <View style={styles.avatarContainer}>
              <Image source={item.sender.avatar} style={styles.avatar} />
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.senderName}>{item.sender.name}</Text>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        inverted // Hiển thị tin nhắn từ phía dưới lên
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  myMessageContainer: {
    justifyContent: 'flex-end', // Hiển thị tin nhắn của bạn ở bên phải
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageContent: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
  },
});

export default ChatDetail;
