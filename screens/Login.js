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

const auth = getAuth(fireApp);

const Login = ({ setUser, navigation, user }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visibility, setVisibility] = useState(true);

    const toggleVisibility = () => {
        setVisibility(!visibility);
    };

    const onLogin = async () => {
        try {
            if (email !== "" && password !== "") {
                signInWithEmailAndPassword(auth, email, password).then(
                    (userCredential) => {
                        setUser(userCredential.user);
                    }
                ).catch((err) =>console.log(err));
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView style={styles.mainContainer}>
                    <Image style={styles.logo} source={Logo} />
                    <Text style={styles.header}>Welcome to MyMessages</Text>
                    <Text style={styles.subheader}>Login to continue</Text>
                    <View style={styles.inputContainer}>
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
                                textContentType="password"
                            />
                            <TouchableWithoutFeedback onPress={() => { toggleVisibility(); }}>
                                <View style={{ position: 'absolute', left: "88%", top: "25%" }}>
                                    <Ionicons suppressHighlighting={true} name={visibility ? "eye-off" : "eye-sharp"} size={24} color="#5C4DF8" />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={onLogin} >
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <Button
                        onPress={() => navigation.navigate("Register")}
                        title="Register"
                        color="grey"
                    />
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
