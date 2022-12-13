import { useState } from "react";
import { Platform, KeyboardAvoidingView, SafeAreaView, Text, View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import fireApp from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { connect } from "react-redux";
import { setUser, setAccentColour, setSystemFont, setLoading, setTheme } from "../redux/actions";
import { doc, setDoc, getFirestore } from "firebase/firestore"
import styles from "../stylesheets/login.component";
import { Ionicons } from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useColorScheme } from 'react-native';

const auth = getAuth(fireApp)
const db = getFirestore(fireApp)


const Register = ({ systemTheme, setUser, user, navigation }) => {
    let colorScheme = useColorScheme()
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [email, setEmail] = useState("")
    const [birthDate, setBirthDate] = useState(new Date());
    const [show, setShow] = useState(Platform.OS === 'ios')
    const [password, setPassword] = useState("")
    const [visibility, setVisibility] = useState(true)
    const isAndroid = Platform.OS == "android"



    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(Platform.OS == "ios");
        setBirthDate(currentDate);
    };


    const onRegister = async () => {
        try {
            if (email !== '' && password !== '') {
                createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    setUser(userCredential.user)
                    setDoc(doc(db, 'users', userCredential.user.uid), {
                        uid: userCredential.user.uid,
                        fName: fName.trim(),
                        lName: lName.trim(),
                        email: email,
                        photoUrl: "https://images.unsplash.com/photo-1670327138103-c71ef29be098?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                        conversations: [],
                        accentColour: '#5C4DF8',
                        systemFont: null,
                        systemTheme: colorScheme,
                        dateOfBirth: birthDate.getTime()
                    })
                    setDoc(doc(db, 'conversations', userCredential.user.uid), {
                        messages: []
                    })
                }).catch((err) => { console.log(err) })
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, backgroundColor: colorScheme == "light" ? "white" : "#1A1A1D" }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView style={styles.mainContainer}>
                    <Text style={[styles.header, { color: colorScheme == "light" ? "black" : "white" }]}>Register to Begin</Text>
                    <Text style={styles.subheader}>Create your account details</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>First Name</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="First Name"
                            value={fName}
                            onChangeText={setFName}
                            autoComplete="name-given"
                            textContentType="givenName"
                        />
                        <Text style={styles.inputLabel}>Last Name</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Last Name"
                            value={lName}
                            onChangeText={setLName}
                            autoComplete="name-family"
                            textContentType="familyName"
                        />
                        <View style={{ flexDirection: "row", marginBottom: 30 }}>
                            <Text style={styles.inputLabel}>Date of Birth</Text>
                            <View style={{ flex: 1 }}>
                                {isAndroid && (
                                    <View style={{flex:1,flexDirection:"row", justifyContent:"flex-end", height:50}}>
                                        <View style={{borderColor: colorScheme=="light" ? "black":"white", borderWidth: 3, borderRadius:8, marginRight:10, height:38}}>
                                            <Text style={{color:colorScheme=="light" ? "black":"white", padding:5}}>{birthDate.toDateString()}</Text>
                                        </View>
                                        <View style={{height:60}}>
                                            <TouchableWithoutFeedback onPress={() => { setShow(!show) }}>
                                                <Ionicons suppressHighlighting={true} name={"calendar"} size={35} color="#919CFF" />
                                            </TouchableWithoutFeedback>
                                        </View>
                                        
                                    </View>

                                )}
                                {show &&
                                    <RNDateTimePicker
                                        value={birthDate}
                                        mode="date"
                                        is24Hour={true}
                                        onChange={onChange}
                                        themeVariant={colorScheme}
                                        maximumDate={new Date()}
                                        style={{ position: "absolute", left: "41%", top: 0 }}
                                    />
                                }
                            </View>
                        </View>
                        <Text style={styles.inputLabel}>Email Address</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            autoComplete="email"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                        />
                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={{ flexDirection: "row", position: 'relative' }}>
                            <TextInput
                                style={[styles.inputText, { flex: 1 }]}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={visibility}
                                textContentType="newPassword"
                            />
                            <TouchableWithoutFeedback onPress={() => { toggleVisibility(); }}>
                                <View style={{ position: 'absolute', left: "88%", top: "25%" }}>
                                    <Ionicons suppressHighlighting={true} name={visibility ? "eye-off" : "eye-sharp"} size={24} color="#5C4DF8" />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.loginButton, { backgroundColor: '#919CFF', shadowOpacity: colorScheme == "light" ? 1 : 0 }]} onPress={onRegister}>
                        <Text style={styles.loginText}>Register</Text>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
                        <View style={{ marginTop: 9 }}>
                            <Text style={{ color: "grey", fontSize: 18 }}>Login</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const mapDispatch = { setUser, setAccentColour, setSystemFont, setLoading, setTheme };
const mapState = (store) => ({
    user: store.dataReducer.user,
    accentColour: store.dataReducer.accentColour,
    systemFont: store.dataReducer.systemFont,
    systemTheme: store.dataReducer.systemTheme,
    isLoading: store.dataReducer.isLoading
});

export default connect(mapState, mapDispatch)(Register);
