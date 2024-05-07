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
    getImageMotel:(idMotel) => `/motels/${idMotel}/`, //GET
    deleteMotel:(idMotel) =>`/motels/${idMotel}/`,   //DELETE
    updateMotel:(idMotel) => `/motels/${idMotel}/`, //PATCH
    addPrice:(idMotel) => `/motels/${idMotel}/prices/`, //POST
    detailMotel:(idMotel) => `/motels/${idMotel}/`, //GET
    deleteImgMotel:(idMotel) => `/motels/${idMotel}/images/`,  //DELETE
    updatePrice:(idMotel) =>`/motels/${idMotel}/prices/`, //PATCH
    deletePrice:(idMotel) => `/motels/${idMotel}/prices/`, //DELETE
    createPost:"/post/for_lease/", //POST
    getAllPostForOwner:"/post/for_lease/",  //GET
    likePost:(idPost) => `/post/${idPost}/like/`,  //POST
    commentPost:(idPost) => `/post/${idPost}/comments/`, //POST
    deletePost:(idPost) => `/post/${idPost}/`, //DELETE
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
