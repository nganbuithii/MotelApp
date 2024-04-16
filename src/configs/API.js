import axios from "axios";

const HOST ="https://motel.pythonanywhere.com";

export const endpoints = {
    current_user:'/user/current_user/',
    login: "/o/token/", 
    register:"/user/"
};

// Tạo một phiên bản axios với các cài đặt đã được cung cấp
export const authApi = (accessToken) =>
    axios.create({
        baseURL: HOST,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

// Xuất một phiên bản axios với cài đặt mặc định
export default axios.create({
    baseURL: HOST
});
