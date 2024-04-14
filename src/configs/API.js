import axios from "axios";

const HOST ="https://motel.pythonanywhere.com";

export const endpoints = {
    'current-user':'/users/current_user/',
    login: "/o/token/", // Đây là đường dẫn tới endpoint để đăng nhập
    // Các endpoints khác có thể được định nghĩa tại đây
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
