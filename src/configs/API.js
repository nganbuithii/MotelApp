import axios from "axios";

export const endpoints = {

    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'register': '/users/',


};
export const authApi = (accessToken) =>
axios.create({
    // baseURL: "http:// 192.168.1.6:5000/",
    baseURL:"https://thanhduong.pythonanywhere.com/",
    headers: {
    Authorization: `bearer ${accessToken}`,
    },
});

export default axios.create({
    // baseURL: "http:// 192.168.1.6:5000/",
    baseURL:"https://thanhduong.pythonanywhere.com/",
});
