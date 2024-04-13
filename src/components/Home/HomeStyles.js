    import { StyleSheet } from "react-native";

export default StyleSheet.create({

        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        postBar: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            // backgroundColor: '#f0f0f0',
            borderRadius: 10,
            marginVertical: 10,
            width: '100%', // Độ rộng 100%
        },
        postInputContainer: {
            flex: 1,
            marginLeft: 10,
            backgroundColor: '#f0f0f0',
            padding:10,
            borderRadius:10
        },
        postInput: {
            flex: 1,
            fontSize: 16,
            backgroundColor: 'transparent', // Màu nền của ô TextInput là trong suốt
        },
        plusButton: {
            padding: 5,
        },
        image: {
            width: 50, // Độ rộng của ảnh
            height: 50, // Độ cao của ảnh
            resizeMode: 'cover', // Chế độ hiển thị của ảnh
            marginRight: 10,
        },
    })