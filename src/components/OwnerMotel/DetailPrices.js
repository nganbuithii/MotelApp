import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { AntDesign, Entypo, FontAwesome5, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { COLOR, SHADOWS } from "../common/color";
import ButtonAuth from "../common/ButtonAuth";
import EditMotelStyle from "../../Styles/EditMotelStyle";
import { authApi, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const DetailPrices = ({ route }) => {
    const { idMotel, label, period } = route.params;

    const [selectedIcon, setSelectedIcon] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIconVisible, setModalIconVisible] = useState(false); // State cho modal chọn icon
    const [showUnitInput, setShowUnitInput] = useState(false); // State cho việc hiển thị input đơn vị đo

    const [tenDichVu, setTenDichVu] = useState("");
    const [phiDichVu, setPhiDichVu] = useState("");
    const [donViDo, setDonViDo] = useState("");



    const openModal = () => {
        setModalVisible(true);
    };
    const openIconModal = () => {
        setModalIconVisible(true); // Mở modal chọn icon
    };
    const selectIcon = (icon) => {
        setSelectedIcon(icon);
        setModalIconVisible(false); // Đóng modal chọn icon
    };
    const showToast1 = () => {
        Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Thêm thông tin thành công.',
            visibilityTime: 3000, // Thời gian tồn tại của toast (milliseconds)
            autoHide: true, // Tự động ẩn toast sau khi hết thời gian tồn tại
        });
    }
    const showToast2 = () => {
        Toast.show({
            type: 'error',
            text1: 'Thất bại',
            text2: 'Thêm thông tin thất bại.',
            visibilityTime: 3000, // Thời gian tồn tại của toast (milliseconds)
            autoHide: true, // Tự động ẩn toast sau khi hết thời gian tồn tại
        });
    }
    const selectService = (service) => {
        setSelectedService(service);
        if (service === "Theo chỉ số đồng hồ") {
            setShowUnitInput(true); // Hiển thị input đơn vị đo nếu chọn "Theo chỉ số đồng hồ"
        } else {
            setShowUnitInput(false); // Ẩn input đơn vị đo khi chọn dịch vụ khác
        }
        setModalVisible(false);
    };
    const handleSubmit = async () => {
        try {
            

            

        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <View style={styles.container}>
            <View style={modalVisible ? styles.modalBackground : null} />
            <View style={styles.box}>
            <Text>ID Motel: {idMotel}</Text>
            <Text>Label: {label}</Text>
            <Text>Period: {period}</Text>

                <Text style={EditMotelStyle.label}>Tên dịch vụ</Text>
                <View style={EditMotelStyle.inputContainer}>
                    <FontAwesome6 name="hand-holding-heart" style={EditMotelStyle.icon} size={24} color="green" />
                    <TextInput value={label}
                        onChangeText={(text) => setTenDichVu(text)} style={EditMotelStyle.input} placeholder="Nhập tên dịch vụ" />

                </View>
                <Text style={EditMotelStyle.label}>Phí dịch vụ</Text>
                <View style={EditMotelStyle.inputContainer}>
                    <Fontisto name="money-symbol" style={EditMotelStyle.icon} size={24} color="green" />
                    <TextInput value={phiDichVu}
                        onChangeText={(text) => setPhiDichVu(text)} style={EditMotelStyle.input} placeholder="Nhập phí dịch vụ" />
                </View>
                <Text style={EditMotelStyle.label}>Thu phí dựa trên</Text>
                <View style={EditMotelStyle.inputContainer}>
                    <MaterialCommunityIcons name="vector-arrange-below" style={EditMotelStyle.icon} size={24} color="green" />
                    <TouchableOpacity style={EditMotelStyle.input} onPress={openModal}>
                        <Text>{selectedService || "Chọn dịch vụ"}</Text>
                    </TouchableOpacity>
                </View>
                {/* Hiển thị input đơn vị đo khi chọn "Theo chỉ số đồng hồ" */}
                
                {showUnitInput && (
                    
                    
                    <View style={EditMotelStyle.inputContainer}>
                        <Entypo name="ruler" style={EditMotelStyle.icon} size={24} color="green" />

                        <TextInput value={donViDo}
                            onChangeText={(text) => setDonViDo(text)} style={EditMotelStyle.input} placeholder="Nhập đơn vị đo (Vd: Kwh, m3...)" />
                    </View>)}
                {/* Background mờ */}
                {modalVisible && <View style={styles.modalBackground} />}
                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={styles.modalIt} onPress={() => selectService("Theo chỉ số đồng hồ")}>
                                <Text style={styles.modalText}>Theo chỉ số đồng hồ</Text>
                                <Text style={styles.smText}>Dịch vụ có chỉ số đầu cuối(Điện/Nước...)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalIt} onPress={() => selectService("Người hoặc số lượng")}>
                                <Text style={styles.modalText}>Người hoặc số lượng</Text>
                                <Text style={styles.smText}>Tính theo số người hoặc số lượng (Vệ sinh 15.000đ/Người/Tháng)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectService("Phòng")}>
                                <Text style={styles.modalText}>Phòng</Text>
                                <Text style={styles.smText}>Tính theo phòng (Thu rác 100.000đ/Phòng)</Text>
                            </TouchableOpacity>
                            {/* Add more service options as needed */}
                        </View>
                    </View>
                </Modal>
                {/* Button chọn icon */}
                <Text style={EditMotelStyle.label}>Icon dịch vụ</Text>
                <TouchableOpacity style={styles.inputContainer} onPress={openIconModal}>
                    {selectedIcon ? (
                        <View style={styles.iconContainer}>
                            {/* Hiển thị icon được chọn */}
                            {selectedIcon === "IC1" && <MaterialIcons name="electric-bolt" size={24} color="black" />}
                            {selectedIcon === "IC2" && <MaterialIcons name="garage" size={24} color="black" />}
                            {selectedIcon === "IC3" && <MaterialIcons name="cleaning-services" size={24} color="black" />}
                            {selectedIcon === "IC4" && <MaterialIcons name="cell-wifi" size={24} color="black" />}
                            {selectedIcon === "IC5" && <FontAwesome5 name="fan" size={24} color="black" />}
                            {selectedIcon === "IC6" && <Entypo name="fingerprint" size={24} color="black" />}
                        </View>
                    ) : (
                        <Text style={EditMotelStyle.input}>Chọn icon</Text>
                    )}
                </TouchableOpacity>
                {/* Modal chọn icon */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalIconVisible}
                    onRequestClose={() => {
                        setModalIconVisible(false);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalICView}>
                            <TouchableOpacity style={styles.modalIc} onPress={() => selectIcon("IC1")}>
                                <MaterialIcons name="electric-bolt" size={30} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalIc} onPress={() => selectIcon("IC2")}>
                                <MaterialIcons name="garage" size={30} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalIc} onPress={() => selectIcon("IC3")}>
                                <MaterialIcons name="cleaning-services" size={30} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalIc} onPress={() => selectIcon("IC4")}>
                                <MaterialIcons name="cell-wifi" size={30} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalIc} onPress={() => selectIcon("IC5")}>
                                <FontAwesome5 name="fan" size={30} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalIc} onPress={() => selectIcon("IC6")}>
                                <Entypo name="fingerprint" size={30} color="black" />
                            </TouchableOpacity>
                            {/* Add more icon options as needed */}
                        </View>
                    </View>
                </Modal>
                <ButtonAuth title="Thêm dịch vụ" onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        alignItems: "center"
    },
    box: {
        // flex: 0.7,
        width: "94%",
        alignContent: "center",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,
        ...SHADOWS.medium,
        margin: 15,
        paddingVertical: 60,
        alignItems: "center"

    },
    // Làm mờ khi modal box xuất hiện 
    // modalBackground: {
    //     ...StyleSheet.absoluteFillObject,
    //     backgroundColor: "rgba(0, 0, 0, 0.5)",
    // },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
    },
    modalView: {
        backgroundColor: COLOR.color12,
        padding: 20,
        alignItems: "center",
        ...SHADOWS.medium,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalICView: {
        backgroundColor: COLOR.color12,
        padding: 20,
        alignItems: "center",
        ...SHADOWS.medium,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingLeft: 80
    },
    modalIc: {
        width: "30%",

    },
    modalText: {
        marginBottom: 5,
        textAlign: "center",
    },
    modalIt: {
        width: "100%",
        borderBottomColor: "#fff",
        borderBottomWidth: 2,
    },
    smText: {
        fontSize: 13,
        marginBottom: 15,
        color: COLOR.text_weak_color,
    },
});

export default DetailPrices;