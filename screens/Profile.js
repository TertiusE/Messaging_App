import { useState, useEffect, useRef } from "react";
import { Platform, SafeAreaView, Text, StyleSheet, Image, Button, View, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Animated } from "react-native";
import { setUser, setAccentColour, setSystemFont, setLoading, setTheme, setDateOfBirth } from "../redux/actions";
import { connect } from "react-redux";
import styles from '../stylesheets/profile.component';
import store from '../redux/store/index';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native'
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import fireApp from "../config/firebase";
import { Ionicons } from '@expo/vector-icons';



const Profile = ({ user, setUser, setAccentColour, setSystemFont, setLoading, setDateOfBirth, systemFont }) => {
    const [fName, setfName] = useState(user.fName);
    const [lName, setlName] = useState(user.lName);
    const [birthDate, setBirthDate] = useState(new Date(user.dateOfBirth));
    const [show, setShow] = useState(Platform.OS == "ios")
    const [profileImg, setProfileImg] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused()
    const db = getFirestore(fireApp);
    const isAndroid = Platform.OS == "android"
    const bounceValue = useRef(new Animated.Value(0)).current;
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    const state = store.getState();
    const systemTheme = state.dataReducer.systemTheme
    const accentColour = state.dataReducer.accentColour

    let updateSettings = async () => {
        const userRef = doc(db, "users", user.uid);
        const userUnion = await updateDoc(userRef, {
            fName: fName,
            lName: lName,
            dateOfBirth: birthDate.getTime(),
            photoUrl: profileImg
        });
    }


    useEffect(() => {
        setfName(user.fName)
        setlName(user.lName)
        setBirthDate(new Date(user.dateOfBirth))
    }, [isFocused])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(Platform.OS == 'ios');
        setBirthDate(currentDate);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <SafeAreaView style={systemTheme == 'light' ? styles.mainContainer : styles.mainContainer__dark}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={setModalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={[styles.modalText, { fontFamily: systemFont }]}>Change Image</Text>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Image URL"
                                value={profileImg}
                                onChangeText={setProfileImg}
                            />
                            <TouchableOpacity style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={{ color: 'white', fontFamily: systemFont }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Image
                    style={styles.image}
                    source={profileImg
                        ? { uri: `${profileImg}` } : { uri: "https://s3-eu-west-1.amazonaws.com/artsthread-content/images/users/68ebb7a3c21864ae50b17a28b4866a94.jpg" }}
                />
                {fName !== "" || lName !== "" ? (<Text style={[systemTheme == 'light' ? styles.header : styles.header__dark, { fontFamily: systemFont }]}>{fName} {lName}</Text>
                ) : (<Text style={systemTheme == 'light' ? styles.header : styles.header__dark}>FirstName LastName</Text>)}

                <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontFamily: systemFont, color: accentColour, fontSize: 18 }}>Change Photo</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.inputContainer}>
                    <Text style={[systemTheme == 'light' ? styles.inputLabel : styles.inputLabel_dark, { fontFamily: systemFont }]}>First Name</Text>
                    <TextInput
                        style={systemTheme == 'light' ? styles.inputText : styles.inputText__dark}
                        placeholder="First Name"
                        placeholderTextColor={systemTheme == 'light' ? 'white' : 'white'}
                        value={fName}
                        onChangeText={setfName}
                        keyboardAppearance={systemTheme}
                    />
                    <Text style={[systemTheme == 'light' ? styles.inputLabel : styles.inputLabel_dark, { fontFamily: systemFont }]}>Last Name</Text>
                    <TextInput
                        style={systemTheme == 'light' ? styles.inputText : styles.inputText__dark}
                        placeholder="Last Name"
                        placeholderTextColor={systemTheme == 'light' ? 'white' : 'white'}
                        value={lName}
                        onChangeText={setlName}
                        keyboardAppearance={systemTheme}
                    />
                    <View style={{ flexDirection: "row" }}>
                        <Text style={[systemTheme == 'light' ? styles.inputLabel : styles.inputLabel_dark, { fontFamily: systemFont }]}>Date of Birth</Text>
                        <View style={{ flex: 1 }}>
                            {isAndroid && (
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", height: 50, marginTop:29 }}>
                                    <View style={{ borderColor: systemTheme == "light" ? "black" : "white", borderWidth: 2, borderRadius:8, marginRight: 10, height: 38, alignItems:"center" }}>
                                        <Text style={{ color: systemTheme == "light" ? "black" : "white", padding: 5}}>{birthDate.toDateString()}</Text>
                                    </View>
                                    <View style={{ height: 60 }}>
                                        <TouchableWithoutFeedback onPress={() => { setShow(!show) }}>
                                            <Ionicons suppressHighlighting={true} name={"calendar"} size={35} color={accentColour} />
                                        </TouchableWithoutFeedback>
                                    </View>

                                </View>

                            )}
                            {show &&
                                <RNDateTimePicker
                                    value={birthDate}
                                    mode="date"
                                    is24Hour={false}
                                    onChange={onChange}
                                    themeVariant={systemTheme}
                                    maximumDate={new Date()}
                                    style={{ position: "absolute", left: "41%", top: 25 }}
                                />
                            }
                        </View>
                    </View>
                    <TouchableOpacity style={[systemTheme == 'light' ? styles.saveButton : styles.saveButton__dark, { backgroundColor: accentColour, marginTop: 50 },  { transform: [{ translateY: bounceValue }]}]} onPress={() => {updateSettings(); 
                                  Animated.sequence([
                                    Animated.spring(bounceValue, {
                                      velocity: 1,
                                      mass: 0.1,
                                      toValue: 3,
                                      useNativeDriver: true,
                                    }),
                                    Animated.spring(bounceValue, {
                                      velocity: 1,
                                      mass: 0.1,
                                      toValue: -1,
                                      useNativeDriver: true,
                                    }),
                                  ]).start();}}>
                        <Text style={[styles.saveText, { fontFamily: systemFont }]}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};



const mapDispatch = { setUser, setAccentColour, setSystemFont, setLoading, setTheme, setDateOfBirth };
const mapState = (store) => ({
    user: store.dataReducer.user,
    accentColour: store.dataReducer.accentColour,
    systemFont: store.dataReducer.systemFont,
    systemTheme: store.dataReducer.systemTheme,
    isLoading: store.dataReducer.isLoading,
    dateOfBirth: store.dataReducer.dateOfBirth
});


export default connect(mapState, mapDispatch)(Profile);

