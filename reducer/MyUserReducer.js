const MyUserReducer = (currentState, action) => {
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            return null;
        case "update_user":
            return action.payload;// Cập nhật thông tin người dùng khi nhận action update_user
        case "update_motel":
            return { ...currentState, motel: action.payload };

    }
    return currentState;
}

export default MyUserReducer;