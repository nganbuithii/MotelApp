import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

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
    editComment:(idComment) => `/post/comments/${idComment}/`,
    deletePost:(idPost) => `/post/${idPost}/`, //DELETE
    updatePost:(idPost) => `/post/for_lease/${idPost}/`,  //PATCH
    detailOwner:(idOwner) => `/user/${idOwner}/` ,//get
    updateComment:(idComment) => `/post/comments/${idComment}/`,
    createPostForRent:"/post/for_rent/", // đăng bài bên người thuê
    follow:(idUser) => `/user/${idUser}/follow/`,  // theo dõi - post
    getComment:(idPost) => `/post/${idPost}/comments/`,  // lấy tất cả comment
    getAllPostForRent:"/post/for_rent", //Lây tất cả post tìm nhà    
    deleteComment:(idComment) => `/post/comments/${idComment}/`,
    getMotelFilter:"/motels", // lọc trọ theo filter
    getFollower:(idUser) => `/user/${idUser}/followers/`, // lẤY Ds người mình theo dõi  
    getFollowing:(idUser) => `/user/${idUser}/following/`, // lẤY Ds người đang theo dõi   mk
    updatePostRent:(idPost) => `/post/for_rent/${idPost}/`,
    getPostOfUser:(idUser) => `/user/${idUser}/post/`, // lấy các bài đăng của user id
    vnpay:`/vnpay/payment_url/`,
    
    
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
