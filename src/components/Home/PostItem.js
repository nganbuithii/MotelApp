import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const PostItem = ({ avatar, content, desc }) => {
    return (
        <View style={styles.container}>
            <View>
                <Image source={avatar} style={styles.avatar} />
                <Text>Tên user</Text>
            </View>
            <Text>{desc}</Text>
        
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        marginRight: 10,
    },
    contentContainer: {
        flex: 1,
    },
    });

export default PostItem;
