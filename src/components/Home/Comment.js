import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLOR, SHADOWS } from '../common/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API, { authApi, endpoints } from '../../configs/API';
import { ActivityIndicator } from 'react-native-paper';
import MyContext from '../../configs/MyContext';
import showToast from '../common/ToastMessage';
import Modal from 'react-native-modalbox';


const Comment = ({ route }) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    const [user, dispatch] = useContext(MyContext);
    const [showModal, setShowModal] = useState(false);
    const [editingComment, setEditingComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [render, setRender] = useState(false);

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
    }, [render]);

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
            setRender(!render);
            setContent("");
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
                        // Hiển thị danh sách bình luận
                        <FlatList
                            style={{ marginBottom: 50 }}
                            data={comments}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={styles.commentContainer}>
                                    {/* Hiển thị avatar */}
                                    <Image
                                        style={styles.avatar}
                                        source={{ uri: item.user.avatar }}
                                    />
                                    {/* <Text>id: {item.id}</Text> */}
                                    <View>
                                        <Text style={{ fontWeight: "500", fontSize: 16 }}>{item.user.username}</Text>
                                        {/* Nội dung và thời gian của bình luận */}
                                        <View style={styles.commentContent}>
                                            <Text style={styles.comment}>{item.content}</Text>
                                            <Text style={styles.timeAgo}>{calculateTimeAgo(item.created_date)}</Text>
                                        </View>
                                        { /* Nếu user là người comment, hiển thị nút sửa và xóa */}
                                        {item.user.id === user.id && (
                                            <View style={styles.commentActionContainer}>
                                                <TouchableOpacity style={styles.commentActionButton}
                                                    onPress={() => handleEdit(item.id, item.content)} // Pass id và nội dung của comment vào hàm handleEdit
                                                >
                                                    <Text style={{ fontWeight: "500", color: COLOR.color_1 }}> Chỉnh sửa</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={styles.commentActionButton}
                                                    onPress={() => handleDelete(item.id)}
                                                >
                                                    <Text style={{ fontWeight: "500", color: COLOR.color_1 }}>Xóa</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        { /* Nếu user không phải là người comment, hiển thị nút phản hồi */}
                                        {item.user.id !== user.id && (
                                            <View style={styles.commentActionContainer}>

                                                <TouchableOpacity style={styles.commentActionButton}>
                                                    <Text style={{ fontWeight: "500", color: COLOR.color_1 }}>Phản hồi</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>

                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.commentList}

                        />

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
        fontSize: 15,
        // paddingHorizontal:30,
        width: "85%",
        color: COLOR.gray,
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
    commentActionContainer: {
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 130
    },
    commentActionButton: {
        marginRight: 10,
        padding: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        // backgroundColor: "#fff",
    },
    // Các style của component và modal ở đây
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
        backgroundColor: COLOR.color6,
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
        backgroundColor: COLOR.color6,
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
        backgroundColor: COLOR.color11,
        padding: 40,
    },
    inputEdit: {
        backgroundColor: COLOR.bg_color1,
        padding: 30,
        width: "100%",
        marginBottom: 10,
        borderRadius: 30,
        marginTop: 30,
    }
});

export default Comment;
