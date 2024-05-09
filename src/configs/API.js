import axios from "axios";

const HOST ="https://motel.pythonanywhere.com";

export const endpoints = {
    current_user:'/user/current_user/',
    login: "/o/token/", 
    register:"/user/",
    postMotel:"/motels/",
    upImgMotel:(idMotel) => `/motels/${idMotel}/images/`,  //POST
    updateUser:"/user/current_user/",  //PATCH
    detailMotelOwner:(idUser) => `/user/${idUser}/motels/`,   //lấy tất cả nhà trọ của user
    getImageMotel:(idMotel) => `/motels/${idMotel}/`, //GET
    deleteMotel:(idMotel) =>`/motels/${idMotel}/`,   //DELETE
    updateMotel:(idMotel) => `/motels/${idMotel}/`, //PATCH
    addPrice:(idMotel) => `/motels/${idMotel}/prices/`, //POST
    detailMotel:(idMotel) => `/motels/${idMotel}/`, //chi tiết nhà trọ
    deleteImgMotel:(idMotel) => `/motels/images/${idMotel}/`,  //DELETE
    updatePrice:(idMotel) =>`/motels/${idMotel}/prices/`, //PATCH
    deletePrice:(idPrice) => `/motels/prices/${idPrice}/`, //DELETE
    createPost:"/post/for_lease/", //POST
    getAllPostForOwner:"/post/for_lease/",  //lấy tất cả bài đăng
    likePost:(idPost) => `/post/${idPost}/like/`,  //like bài
    commentPost:(idPost) => `/post/${idPost}/comments/`, //POST
    deletePost:(idPost) => `/post/${idPost}/`, //DELETE
    updatePost:(idPost) => `/post/for_lease/${idPost}/`,  //PATCH

    detailOwner:(idOwner) => `/user/${idOwner}/` ,//get
    follow:(idUser) => `/user/${idUser}/follow/`,  // theo dõi - post
    getComment:(idPost) => `/post/${idPost}/comments/`  // lấy tất cả comment
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
