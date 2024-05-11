import React from 'react';
import { View, Text } from 'react-native';

const RentPostsList = ({ posts }) => {
    return (
        <View>
            {/* Hiển thị danh sách bài đăng tìm nhà */}
            {posts.map((post) => (
                // Render các bài đăng
                <View key={post.id}>
                    <Text>{post.title}</Text>
                    <View style={styles.postContainer}>
                        <View style={styles.userInfoContainer}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("DetailOwner", { ownerId: post.user.id, })} >
                                <Image
                                    source={{ uri: post.user.avatar }}
                                    style={styles.userAvatar}
                                />
                            </TouchableOpacity>
                            <Text style={styles.userName}>{post.user.username}</Text>
                        </View>
                        <TouchableOpacity style={styles.btnFollow}>
                            <Text style={{ color: "#fff" }}> Theo dõi</Text>
                            <Entypo name="plus" size={12} color="#fff" />
                        </TouchableOpacity>
                        {post.user.id === user.id && (
                            <TouchableWithoutFeedback onPress={() => setShowOptions({ ...showOptions, [post.id]: !showOptions[post.id] })}>
                                <SimpleLineIcons name="options-vertical" size={20} color="black" />
                            </TouchableWithoutFeedback>
                        )}
                        <View>
                            <View style={{ flexDirection: "row" }}>
                                <Entypo name="location-pin" size={20} color="orange" />
                                {/* <Text style={{ color: "gray" }}>
                                    {post.motel.ward}, {post.motel.district}, {post.motel.city}
                                </Text> */}
                            </View>
                            <View>
                                <Text style={HomeStyles.desc}>{post.content}</Text>
                                {/* Ảnh bài đăng */}
                                <FlatList
                                    data={post.motel.images}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id.toString()}
                                    horizontal // Hiển thị ngang
                                    pagingEnabled // Cuộn trang theo trang
                                    showsHorizontalScrollIndicator={false} // Ẩn thanh trượt ngang
                                    onViewableItemsChanged={onViewableItemsChanged}
                                />
                            </View>
                            {/* Hiển thị badge */}
                            <View style={HomeStyles.badgeContainer}>
                                <Text style={HomeStyles.badgeText}>
                                    {currentIndex + 1}/{post.motel.images.length}
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>
            ))}
        </View>
    );
};

export default RentPostsList;
