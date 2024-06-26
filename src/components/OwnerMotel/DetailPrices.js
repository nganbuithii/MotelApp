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
import showToast from "../common/ToastMessage";

const DetailPrices = ({ route, navigation }) => {
    const { idMotel } = route.params;
    const { infoPrice } = route.params;

    const [selectedIcon, setSelectedIcon] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIconVisible, setModalIconVisible] = useState(false); // State cho modal chọn icon
    const [showUnitInput, setShowUnitInput] = useState(false); // State cho việc hiển thị input đơn vị đo
    const [modalTypeVisible, setModalTypeVisible] = useState(false);

    const [selectedType, setSelectedType] = useState(infoPrice.label);
    const [tenDichVu, setTenDichVu] = useState(infoPrice.label);
    const [phiDichVu, setPhiDichVu] = useState(infoPrice.value);
    const [donViDo, setDonViDo] = useState("");
    const [name, setName] = useState(infoPrice.name);
    const [period, setPeriod] = useState(infoPrice.period);

    const [tenDichVuError, setTenDichVuError] = useState("");
    const [phiError, setPhiError] = useState("");
    const [serviceError, setServiceError] = useState("");
    const [iconError, setIconError] = useState("");
    const [donviError, setDonviError] = useState("");

    const openModal = () => {
        setModalVisible(true);
    };
    const openIconModal = () => {
        setModalIconVisible(true); // Mở modal chọn icon
    };
    const openModalType = () => {
        setModalTypeVisible(true);
    };

    const selectIcon = (icon) => {
        setSelectedIcon(icon);
        setModalIconVisible(false); // Đóng modal chọn icon
    };
    const selectType = (type) => {
        setSelectedType(type);
        setTenDichVu(type); // Update the service name based on the selected type
        setModalTypeVisible(false);
    };
    useEffect(() => {
        // Thiết lập selectedService ban đầu dựa trên infoPrice.period
        if (infoPrice.period === "Tháng") {
            setSelectedService("Người hoặc số lượng");
        } else if (infoPrice.period === "Phòng") {
            setSelectedService("Phòng");
        }else{
            setSelectedService("Theo chỉ số đồng hồ");
        }
    }, []);
    const selectService = (service) => {
        setSelectedService(service);
        if (service === "Theo chỉ số đồng hồ") {
            setShowUnitInput(true); // Hiển thị input đơn vị đo nếu chọn "Theo chỉ số đồng hồ"
        } else {
            setShowUnitInput(false); // Ẩn input đơn vị đo khi chọn dịch vụ khác
        }
        setModalVisible(false);
    };
    const handleExit = () => {
        navigation.goBack();
    }
    const updateInfo = async () => {
        try {
            if (!tenDichVu) {
                setTenDichVuError("Tên dịch vụ không được để trống");
                return;
            } else {
                setTenDichVuError("");
            }

            if (!phiDichVu || !/^\d+(\.\d+)?$/.test(phiDichVu)) {
                setPhiError("Phí dịch vụ không hợp lệ");
                return;
            } else {
                setPhiError("");
            }

            const serviceLabels = {
                "Điện": "ELECTRICITY",
                "Nước": "WATER",
                "Mạng": "INTERNET",
                "Khác": "OTHER"
            };

            const token = await AsyncStorage.getItem("access-token");
            // console.log(token);
            // console.log(idMotel);
            const formData = new FormData();
            console.log("id price", infoPrice.id);
            formData.append("id", infoPrice.id);
            console.log(tenDichVu);

            // Ánh xạ tên dịch vụ sang label tương ứng
            const label = serviceLabels[tenDichVu] || infoPrice.label; // Sử dụng label hiện tại nếu không tìm thấy tên dịch vụ trong serviceLabels

            if (label !== infoPrice.label) {
                formData.append("label", label);
            }
            if(name !== infoPrice.name){
            formData.append("name",name);
            }

            if (phiDichVu !== infoPrice.value) {
                formData.append("value", phiDichVu);
            }
            let period = "";
            if (selectedService === "Theo chỉ số đồng hồ") {
                period = donViDo;
            } else if (selectedService === "Người hoặc số lượng") {
                period = "Tháng";
            } else if (selectedService === "Phòng") {
                period = "Phòng";
            }
            if (period !== infoPrice.period) {
                formData.append("period", period);
            }

            let res = await authApi(token).patch(endpoints["updatePrice"](idMotel), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
            
            showToast({ type: "success", text1: "Thành công", text2: "cập nhật thông tin  " });
            console.log("CẬP NHẬT THÀNH CÔNG");


        } catch (ex) {
            console.error(ex);
            showToast({ type: "error", text1: "Lỗi", text2: "Lỗi cập nhật" });

        }
    }
    return (
        <View style={styles.container}>
            <View style={modalVisible ? styles.modalBackground : null} />
            <View style={styles.box}>
                <Text style={EditMotelStyle.label}>Loại dịch vụ</Text>
                <View style={EditMotelStyle.inputContainer}>
                    <MaterialCommunityIcons name="vector-arrange-below" style={EditMotelStyle.icon} size={24} color="green" />
                    <TouchableOpacity style={EditMotelStyle.input} onPress={openModalType}>
                        <Text>{selectedType || "Loại dịch vụ"}</Text>
                    </TouchableOpacity>


                </View>

                {modalTypeVisible && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalTypeVisible}
                        onRequestClose={() => {
                            setModalTypeVisible(false);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView1}>
                                <TouchableOpacity style={styles.modalIt1} onPress={() => selectType("Điện")}>
                                    <Text style={styles.modalText}>Điện</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalIt1} onPress={() => selectType("Nước")}>
                                    <Text style={styles.modalText}>Nước</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalIt1} onPress={() => selectType("Mạng")}>
                                    <Text style={styles.modalText}>Mạng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalIt1} onPress={() => selectType("Khác")}>
                                    <Text style={styles.modalText}>Khác</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )}
                <Text style={EditMotelStyle.label}>Tên dịch vụ</Text>
                <Text style={EditMotelStyle.label}>{infoPrice.value}</Text>
                {tenDichVuError ? <Text style={{ color: "red" }}>{tenDichVuError}</Text> : null}
                <View style={EditMotelStyle.inputContainer}>
                    <FontAwesome6 name="hand-holding-heart" style={EditMotelStyle.icon} size={24} color="green" />
                    <TextInput value={name}
                        onChangeText={(text) => setName(text)} style={EditMotelStyle.input} placeholder="Nhập tên dịch vụ" />

                </View>
                <Text style={EditMotelStyle.label}>Phí dịch vụ</Text>
                {phiError ? <Text style={{ color: "red" }}>{phiError}</Text> : null}
                <View style={EditMotelStyle.inputContainer}>
                    <Fontisto name="money-symbol" style={EditMotelStyle.icon} size={24} color="green" />
                    <TextInput value={phiDichVu.toString()}
                        onChangeText={(text) => setPhiDichVu(text)} style={EditMotelStyle.input} placeholder="Nhập phí dịch vụ" />
                </View>
                <Text style={EditMotelStyle.label}>Thu phí dựa trên</Text>
                {serviceError ? <Text style={{ color: "red" }}>{serviceError}</Text> : null}
                <View style={EditMotelStyle.inputContainer}>
                    <MaterialCommunityIcons name="vector-arrange-below" style={EditMotelStyle.icon} size={24} color="green" />
                    <TouchableOpacity style={EditMotelStyle.input} onPress={openModal}>
                        <Text>{ selectedService || "Chọn dịch vụ"}</Text>
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
            
            
                <View style={EditMotelStyle.containerBtn}>
                    <TouchableOpacity style={EditMotelStyle.button} onPress={handleExit}>
                        <Text style={EditMotelStyle.buttonText}> Thoát</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={[EditMotelStyle.button, EditMotelStyle.saveButton]}
                        onPress={updateInfo}
                    >
                        <Text style={EditMotelStyle.buttonText}> Cập nhật thông tin</Text>
                    </TouchableOpacity>

                </View>
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
        width: "95%",
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
    modalView1: {
        backgroundColor: "#fff",
        padding: 20,
        alignItems: "center",
        ...SHADOWS.medium,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: "row"
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
    modalIt1: {
        width: "24%",
        // borderRightColor: "#fff",
        // borderRightWidth: 1,
        borderColor: "#fff",
        borderWidth: 1,
        marginRight: 5,
        paddingVertical: 10,
        borderRadius: 20,
        ...SHADOWS.medium,
        backgroundColor: COLOR.PRIMARY
    },
    smText: {
        fontSize: 13,
        marginBottom: 15,
        color: COLOR.text_weak_color,
    },
});

export default DetailPrices;