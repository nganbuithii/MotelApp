import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLOR, SHADOWS } from '../common/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API, { authApi, endpoints } from '../../configs/API';
import { ActivityIndicator } from 'react-native-paper';
import MyContext from '../../configs/MyContext';
import showToast from '../common/ToastMessage';
import Modal from 'react-native-modalbox';
import { ScrollView } from 'react-native-gesture-handler';


const Comment = ({ route }) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    const [user, dispatch] = useContext(MyContext);
    const [showModal, setShowModal] = useState(false);
    const [editingComment, setEditingComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [render, setRender] = useState(false);
    const [replyForComment, setReplyForComment] = useState({ id: null, username: '' });

    const { postId } = route.params;
    const inputRef = useRef(null);
    const getAllCommentByIdPost = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            let res = await authApi(token).get(endpoints["getComment"](postId));
            let sortedComments = res.data.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

            for (const comment of sortedComments) {
                // Lặp qua mỗi bình luận và lấy thông tin của từng reply
                for (const reply of comment.replies) {
                    const updatedReply = await getUserInfoFromReply(reply.user, reply);
                    if (updatedReply) {
                        // Cập nhật thông tin người dùng vào replies
                        const updatedReplies = comment.replies.map(r => r.id === updatedReply.id ? updatedReply : r);
                        comment.replies = updatedReplies;
                    }
                }
            }

            setComments(sortedComments);
            setLoading(false);
        } catch (ex) {
            console.error(ex);
        }
    };
    const handleReply = (id, username) => {
        setReplyForComment({ id, username });
        inputRef.current.focus(); // Focus vào ô input
    }

    useEffect(() => {
        getAllCommentByIdPost();
    }, [render]);
    const getUserInfoFromReply = async (userId, reply) => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            const res = await authApi(token).get(endpoints["detailOwner"](userId));
            const userData = res.data;
            // Cập nhật thông tin người dùng vào reply
            const updatedReply = { ...reply, user: userData };
            return updatedReply;
        } catch (ex) {
            console.error(ex);
            return null; // Trả về null nếu có lỗi
        }
    }




    const handleSend = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            const formData = new FormData();
            formData.append("content", content);
            console.log(formData);
            // Kiểm tra xem có phải là phản hồi bình luận không
            if (replyForComment.id !== null) {
                formData.append("reply_for", replyForComment.id);
            }
            await authApi(token).post(endpoints['commentPost'](postId), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Sau khi gửi bình luận thành công, cập nhật lại danh sách bình luận
            setRender(!render);
            setContent("");
            setReplyForComment({ id: null, username: '' });
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
    const handleEdit = (id, commentContent) => {
        setEditingCommentId(id); // Lưu id của comment
        setEditingComment(commentContent);
        setShowModal(true);
    }
    const handleUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            const formData = new FormData();
            formData.append("content", editingComment);
            console.log(editingCommentId);
            console.log(editingComment);
            console.log(token);
            let res = await authApi(token).patch(endpoints["updateComment"](editingCommentId), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("cập nhật thành công");
            setShowModal(false);
            setRender(!render);
        } catch (ex) {
            console.error(ex);
            showToast({ type: "error", text1: "Lỗi", text2: "Lỗi cập nhật bình luận" });
        }
    }

    const handleDelete = async (idComment) => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            Alert.alert(
                "Xác nhận",
                "Bạn có chắc chắn muốn xóa bình luận này?",
                [
                    {
                        text: "Hủy",
                        style: "cancel"
                    },
                    {
                        text: "Xóa",
                        onPress: async () => {
                            await authApi(token).delete(endpoints["deleteComment"](idComment));
                            console.log("xóa thành công");
                            showToast({ type: "success", text1: "Hoàn thành", text2: " Đã xóa bình luận" });
                            getAllCommentByIdPost();
                        },
                        style: "destructive"
                    }
                ]
            );
            setRender(!render);
        } catch (ex) {
            console.error(ex);
            showToast({ type: "error", text1: "Lỗi xóa bình luận", text2: ex });
        }
    }

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
                        <ScrollView style={{ marginBottom: 50 }}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.container}>
                                {comments.map((item, index) => (
                                    <View key={index} style={styles.commentContainer}>
                                        {/* Hiển thị avatar */}
                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                            <Image
                                                style={styles.avatar}
                                                source={{ uri: item.user.avatar }}
                                            />
                                            <View style={styles.commentDetails}>
                                                <Text style={{ fontWeight: "500", fontSize: 16, marginRight: "auto" }}>{item.user.username}</Text>
                                                <Text style={styles.comment}>{item.content}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.timeAgo}>{calculateTimeAgo(item.created_date)}</Text>


                                        {item.user.id === user.id ? (
                                            <View style={styles.commentActionContainer}>
                                                <TouchableOpacity style={styles.commentActionButton} onPress={() => handleEdit(item.id, item.content)}>
                                                    <Text style={styles.actionButtonText}> Chỉnh sửa</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.commentActionButton} onPress={() => handleDelete(item.id)}>
                                                    <Text style={styles.actionButtonText}>Xóa</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <TouchableOpacity style={styles.commentActionButton} onPress={() => handleReply(item.id)}>
                                                <Text style={styles.actionButtonText}>Phản hồi</Text>
                                            </TouchableOpacity>
                                        )}

                                        {item.replies.length > 0 && (
                                            <View style={styles.replyContainer}>
                                                {item.replies.map(reply => (
                                                    <View key={reply.id} style={styles.reply}>
                                                        <Image
                                                            style={styles.avatar}
                                                            source={{ uri: reply.user.avatar }}
                                                        />
                                                        <View style={styles.replyDetails}>
                                                            <Text style={{ fontWeight: "500", fontSize: 16 }}>{reply.user.username}</Text>
                                                            <Text>{reply.content}</Text>
                                                            <Text>{calculateTimeAgo(reply.created_date)}</Text>
                                                        </View>
                                                    </View>
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </View>
                        </ScrollView>


                    )}
                </View>

            )}
            {/* Modal chỉnh sửa */}
            <Modal
                isOpen={showModal}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.inputEdit}
                        placeholder="Nhập nội dung chỉnh sửa..."
                        value={editingComment}
                        onChangeText={text => setEditingComment(text)}
                    />

                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose, styles.closeButton]}
                        onPress={() => setShowModal(false)}
                    >
                        <FontAwesome name="close" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose, styles.updateButton]}
                        onPress={() => handleUpdate()}
                    >
                        <Text style={styles.textStyle}>Cập nhật</Text>

                    </TouchableOpacity>
                </View>

            </Modal>
            {/* Ô input nhập bình luận */}
            <View style={styles.fixedInputContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập bình luận của bạn..."
                        value={content}
                        onChangeText={text => setContent(text)}
                        ref={inputRef}
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
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 30,
        ...SHADOWS.medium,
    },
    commentContent: {
        flex: 1,
    },
    comment: {
        fontSize: 15,
        color: 'black',
    },
    commentDetails: {
        // flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
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
    timeAgo: {
        fontSize: 12,
        color: 'gray',
        marginLeft: 50
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "transparent"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
    },
    buttonClose: {
        backgroundColor: 'red',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateButton: {
        backgroundColor: COLOR.PRIMARY,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        backgroundColor: COLOR.bg_color1,
        padding: 40,
    },
    inputEdit: {
        backgroundColor: 'gray',
        padding: 30,
        width: "100%",
        marginBottom: 10,
        borderRadius: 30,
        marginTop: 30,
    },
    replyContainer: {
        marginLeft: 50,
        marginTop: 5,
    },
    reply: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    replyDetails: {
        marginLeft: 10,
    },
    commentActionContainer: {
        flexDirection: 'row',
        // marginTop: 5,
        // justifyContent:"flex-end",
        marginLeft: "auto"
    },
    commentActionButton: {
        marginLeft: "auto",
        paddingLeft: 20,
    },
    actionButtonText: {
        color: COLOR.PRIMARY,
        fontWeight: 'bold',
    },
});

export default Comment;