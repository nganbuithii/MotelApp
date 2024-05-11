import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLOR } from '../common/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API, { authApi, endpoints } from '../../configs/API';
import { ActivityIndicator } from 'react-native-paper';

const Comment = ({ route }) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    const { postId } = route.params;

    const getAllCommentByIdPost = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            let res = await authApi(token).get(endpoints["getComment"](postId));
            let sortedComments = res.data.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
            setComments(sortedComments);
            setLoading(false);
        } catch (ex) {
            console.error(ex);
        }
    };

    useEffect(() => {
        getAllCommentByIdPost();
    }, []);

    const handleSend = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            const formData = new FormData();
            formData.append("content", content);
            console.log(formData);
            await authApi(token).post(endpoints['commentPost'](postId), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Sau khi gửi bình luận thành công, cập nhật lại danh sách bình luận
            getAllCommentByIdPost();
        } catch (ex) {
            console.error(ex);
            console.log("comment thất bại");
        }
    };

    // Hàm tính toán khoảng thời gian từ thời điểm tạo bình luận đến hiện tại
    const calculateTimeAgo = (createdDate) => {
        const now = new Date();
        const created = new Date(createdDate);
        const diff = Math.abs(now - created);
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0) {
            return `${days} ngày trước`;
        } else if (hours > 0) {
            return `${hours} giờ trước`;
        } else {
            return `${minutes} phút trước`;
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <View style={{ flex: 1 }}>
                    {/* Hiển thị ảnh khi không có bình luận */}
                    {comments.length === 0 ? (
                        <Image
                            style={styles.image}
                            source={require('../../assets/images/nocmt.png')}
                        />
                    ) : (
                        // Hiển thị danh sách bình luận
                        <FlatList
                            style={{marginBottom:50}}
                            data={comments}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={styles.commentContainer}>
                                    {/* Hiển thị avatar */}
                                    <Image
                                        style={styles.avatar}
                                        source={{ uri: item.user.avatar }}
                                    />
                                    <View>
                                        <Text tyle={styles.comment}>{item.user.username}</Text>
                                    {/* Nội dung và thời gian của bình luận */}
                                    <View style={styles.commentContent}>
                                        <Text style={styles.comment}>{item.content}</Text>
                                        <Text style={styles.timeAgo}>{calculateTimeAgo(item.created_date)}</Text>
                                    </View>
                                    </View>
                                    
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.commentList}
                            
                        />
                    )}
                </View>
            )}
            {/* Ô input nhập bình luận */}
            <View style={styles.fixedInputContainer}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        position: 'relative',
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    comment: {
        fontSize: 16,
    },
    fixedInputContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        paddingLeft: 20,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: COLOR.PRIMARY,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    timeAgo: {
        fontSize: 12,
        color: 'gray',
    },
});

export default Comment;
