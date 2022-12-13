import { useState } from "react";
import React from "react";
import { Platform, KeyboardAvoidingView, SafeAreaView, Text, TextInput, Button, Image, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import fireApp from "../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { connect } from "react-redux";
import { setUser, setAccentColour, setSystemFont, setLoading, setTheme } from "../redux/actions";
import Logo from "../assets/appicon.png";
import styles from '../stylesheets/login.component'
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

const auth = getAuth(fireApp);

const Login = ({ setUser, navigation, user }) => {
    let colorScheme = useColorScheme()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visibility, setVisibility] = useState(true);
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)


    const toggleVisibility = () => {
        setVisibility(!visibility);
    };

    const onLogin = async () => {
        setEmailError(false)
        setPasswordError(false)
        try {
            if (email !== "" && password !== "") {
                signInWithEmailAndPassword(auth, email, password).then(
                    (userCredential) => {
                        setUser(userCredential.user);
                    }
                ).catch((err) => {
                    if (err.code == ("auth/wrong-password")) {
                        setPasswordError(true)
                    } else if (err.code == ("auth/user-not-found")) {
                        setEmailError(true)
                    }
                });
            }
        } catch(err) {
            console.log(err)
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, backgroundColor: colorScheme == "light" ? "white" : "#1A1A1D" }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView style={styles.mainContainer}>
                    <Image style={styles.logo} source={Logo} />
                    <Text style={[styles.header, { color: colorScheme == "light" ? "black" : "white" }]}>Welcome to MyMessages</Text>
                    <Text style={styles.subheader}>Login to continue</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email Address</Text>
                        <View>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                autoComplete="email"
                                textContentType="emailAddress"
                                keyboardType="email-address"
                            />
                            {emailError &&
                                <View style={{ position: "absolute", right: 0, bottom: -3 }}>
                                    <Text style={{ color: "red" }}>Email does not exist</Text>
                                </View>
                            }
                        </View>
                        <Text style={styles.inputLabel}>Password</Text>
                        <View style={{ flexDirection: "row", position: 'relative' }}>
                            <TextInput
                                style={[styles.inputText, { flex: 1 }]}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={visibility}
                                textContentType="password"
                            />
                            {passwordError &&
                                <View style={{ position: "absolute", right: 0, bottom: -3 }}>
                                    <Text style={{ color: "red" }}>Incorrect Password</Text>
                                </View>
                            }
                            <TouchableWithoutFeedback onPress={() => { toggleVisibility(); }}>
                                <View style={{ position: 'absolute', left: "88%", top: "25%" }}>
                                    <Ionicons suppressHighlighting={true} name={visibility ? "eye-off" : "eye-sharp"} size={24} color="#5C4DF8" />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.loginButton, { shadowOpacity: colorScheme == "light" ? 1 : 0 }]} onPress={onLogin} >
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Register")}>
                        <View style={{ marginTop: 9 }}>
                            <Text style={{ color: "grey", fontSize: 18 }}>Register</Text>
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


export default connect(mapState, mapDispatch)(Login);
