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
        case "add_prices": // Thêm giá vào trạng thái người dùng
            return { ...currentState, prices: action.payload };

    }
    return currentState;
}

export default MyUserReducer;