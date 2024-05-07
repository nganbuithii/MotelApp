import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLOR } from '../common/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, endpoints } from '../../configs/API';

const Comment = () => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState();

    const handleSend = async() => {
        // try{
        //     const token = await AsyncStorage.getItem("access-token");
        //     console.log(token);
        //     const formData = new FormData();
        //     formData.append("content", content);
        //     await authApi(token).post(endpoints['commentPost'], formData);
        // }catch(ex){
        //     console.error(ex);
        //     console.log("comment thất bại");
        // }
    };

    return (
        <View style={styles.container}>
            {/* Hiển thị ảnh khi chưa có bình luận */}
            {comments.length === 0 && (
                <Image
                    style={styles.image}
                    source={require('../../assets/images/nocmt.png')}
                />
            )}

            {/* Hiển thị danh sách bình luận */}
            <FlatList
                data={comments}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <Text style={styles.comment}>{item}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.commentList}
            />
            {/* Ô input nhập bình luận */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập bình luận của bạn..."
                    value={content}
                    onChangeText={text => setContent(text)}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <FontAwesome name="send" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    image: {
        width: '100%',
        height: '50%',
        resizeMode: 'contain',
        marginBottom: 20,
    },
    commentList: {
        flexGrow: 1,
    },
    commentContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    comment: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        // paddingHorizontal: 10,
        paddingLeft:20,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor:COLOR.PRIMARY,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        // borderRadius: 5,
        
    },
    sendText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop:5,
    },
});

export default Comment;
