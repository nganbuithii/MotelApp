import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLOR } from '../common/color';

const TermService = ({onPress}) => {
    return (
        <ScrollView contentContainerStyle={styles.container} onPress={onPress}>
        <Text style={styles.title}>Điều Khoản Sử Dụng</Text>
        <View style={styles.section}>
            <Text style={styles.heading}>1. Chấp Nhận Điều Khoản</Text>
            <Text style={styles.content}>
            Bằng cách sử dụng ứng dụng này, bạn đồng ý tuân thủ các điều khoản và điều kiện dưới đây.
            </Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.heading}>2. Quyền Sở Hữu</Text>
            <Text style={styles.content}>
            Tất cả các quyền sở hữu trí tuệ trong ứng dụng này thuộc về chúng tôi.
            </Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.heading}>3. Phạm Vi Sử Dụng</Text>
            <Text style={styles.content}>
            Bạn chỉ được sử dụng ứng dụng này cho mục đích cá nhân và không được phép sửa đổi, sao chép hoặc phân phối nội dung mà không có sự cho phép của chúng tôi.
            </Text>
        </View>
        {/* Thêm các phần khác tương tự ở đây */}
        <Text style={styles.title}>Điều Khoản Dịch Vụ</Text>
        <View style={styles.section}>
            <Text style={styles.heading}>1. Thanh Toán</Text>
            <Text style={styles.content}>
            Bạn phải thanh toán phí sử dụng dịch vụ theo hình thức và lịch trình được quy định.
            </Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.heading}>2. Hủy Dịch Vụ</Text>
            <Text style={styles.content}>
            Bạn có thể hủy dịch vụ bất kỳ lúc nào, nhưng không có hoàn tiền cho khoản phí đã thanh toán.
            </Text>
        </View>
        {/* Thêm các phần khác tương tự ở đây */}
        <Text style={styles.title}>Điều Khoản Về Tìm Kiếm Nhà Trọ</Text>
        <View style={styles.section}>
            <Text style={styles.heading}>1. Thông Tin Tìm Kiếm</Text>
            <Text style={styles.content}>
            Ứng dụng này cung cấp dịch vụ tìm kiếm nhà trọ dựa trên thông tin người dùng cung cấp.
            </Text>
        </View>
        <View style={styles.section}>
            <Text style={styles.heading}>2. Đảm Bảo An Toàn</Text>
            <Text style={styles.content}>
            Chúng tôi cam kết bảo vệ thông tin cá nhân và đảm bảo an toàn cho người dùng khi sử dụng dịch vụ tìm kiếm nhà trọ.
            </Text>
        </View>
    
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color:COLOR.PRIMARY
    },
    section: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:COLOR.gray
    },
    content: {
        fontSize: 16,
    },
    });

export default TermService;
