// // TrọContext.js
// import React, { createContext, useState, useContext } from 'react';

// // Tạo một Context mới
// const MotelContext = createContext();

// // Tạo một Provider để cung cấp dữ liệu cho các thành phần con
// export const MotelProvider = ({ children }) => {
//     // State để lưu trữ thông tin trọ
//     const [motelInfo, setMotelInfo] = useState({});

//     // Hàm để cập nhật thông tin trọ
//     const updateMotelInfo = (newInfo) => {
//         setMotelInfo(newInfo);
//     };

//     // Trả về MotelContext.Provider với value là state và hàm cập nhật
//     return (
//         <MotelContext.Provider value={{ motelInfo, updateMotelInfo }}>
//             {children}
//         </MotelContext.Provider>
//     );
// };

// // Tạo một hook để sử dụng trong các thành phần con
// export const useMotel = () => useContext(MotelContext);
