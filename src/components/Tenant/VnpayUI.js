import React, { useState, useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, ActivityIndicator, Alert } from 'react-native';
import LoadingPage from '../Loading/LoadingPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, endpoints } from '../../configs/API';

export default function VnpayUI({ route, navigation }) {
    const { url, idMotel } = route.params;
    const webViewRef = useRef(null);
    const [loading, setLoading] = useState(true);

    // Xử lý sự kiện khi trang của WebView thay đổi
    const handleNavigationStateChange = async (navState) => {
        const { url: newUrl } = navState;
        console.log("NEW URL", newUrl);

        // Phân tích URL để lấy thông tin
        const urlParts = newUrl.split('?');
        if (urlParts.length > 1) {
            const queryParams = urlParts[1].split('&');
            const params = {};
            queryParams.forEach((param) => {
                const parts = param.split('=');
                params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
            });
            // Lấy các giá trị cần thiết từ params

            const vnp_TxnRef = params['vnp_TxnRef'];//
            const vnp_ResponseCode = params['vnp_ResponseCode'];//
            const vnp_PayDate = params['vnp_PayDate'];//
            const vnp_TransactionStatus = params['vnp_TransactionStatus']; //
            

            // Log các giá trị
            console.log("vnp_PayDate:", vnp_PayDate);
            console.log("vnp_TransactionStatus:", vnp_TransactionStatus);
            console.log("vnp_TransactionNo:", vnp_TxnRef);
            console.log("vnp_ResponseCode:", vnp_ResponseCode);

            if (vnp_ResponseCode != null) {
                try {
                    const token = await AsyncStorage.getItem("access-token");
                    const formData = new FormData();
                    formData.append('vnp_PayDate', vnp_PayDate);
                    formData.append('vnp_TransactionStatus', vnp_TransactionStatus);
                    formData.append('vnp_TransactionNo', vnp_TxnRef);
                
                    console.log("ID MOTEL", idMotel);
                    console.log(token);
                    let res = await authApi(token).post(endpoints["cocTro"](idMotel), formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    console.log("Thanh toán thành công", res);
                } catch (ex) {
                    // console.error(ex);
                    Alert.alert("Thông báo lỗi", "Lỗi Thanh toán bạn hãy thử lại sau");
                }

                setTimeout(() => {
                    navigation.navigate('Home'); // Chuyển hướng về màn hình Home sau 5 giây
                }, 5000);
            }
        }
    };

    // Hiển thị màn hình Loading khi đang xử lý
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Sau khi xử lý xong, ẩn màn hình Loading
        }, 5000); // Timeout sau 5 giây
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <LoadingPage />
    }

    return (
        <WebView
            ref={webViewRef}
            style={styles.container}
            source={{ uri: url }}
            onNavigationStateChange={handleNavigationStateChange}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
    },
});
