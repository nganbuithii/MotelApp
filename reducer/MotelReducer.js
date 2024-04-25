// // motelReducer.js
// export const motelReducer = (state, action) => {
//     switch (action.type) {
//         case 'ADD_MOTEL':
//             return {
//                 ...state,
//                 motels: [...state.motels, action.payload],
//             };
//         case 'DELETE_MOTEL':
//             // Xử lý xóa nhà trọ
//             return {
//                 ...state,
//                 motels: state.motels.filter(motel => motel.id !== action.payload),
//             };
//         // Xử lý các action khác nếu cần
//         default:
//             return state;
//     }
// };
