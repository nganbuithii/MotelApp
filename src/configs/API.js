import axios from "axios";

const HOST ="https://motel.pythonanywhere.com";

export const endpoints = {
    current_user:'/user/current_user/',
    login: "/o/token/", 
    register:"/user/",
    postMotel:"/motels/",
    upImgMotel:(idMotel) => `/motels/${idMotel}/images/`,  //POST
    updateUser:"/user/current_user/",  //PATCH
    detailMotelOwner:(idUser) => `/user/${idUser}/motels/`,   //GET
    getImageMotel:(idMotel) => `/motels/${idMotel}`, //GET
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
