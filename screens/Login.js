import { useState } from "react";
import React from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, Button } from "react-native";
import fireApp from "../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { connect } from "react-redux";
import { setUser } from "../redux/actions";

const auth = getAuth(fireApp)

const Login = ({ navigation, user, setUser }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visibility, setVisibility] = useState(true)

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    const onLogin = async () => {
        try {
            if (email !== '' && password !== '') {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        setUser(userCredential.user)
                    })
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <SafeAreaView>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} />
            <Button onPress={onLogin} title="Login" />
            <Button onPress={() => navigation.navigate('Register')} title="Register" />
        </SafeAreaView>
    )
}
const mapDispatch = {setUser};
const mapState = (store) => ({
    user: store.dataReducer.user,
});
export default connect(mapState, mapDispatch)(Login);