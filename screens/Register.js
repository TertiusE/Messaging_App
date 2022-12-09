import { useState } from "react";
import { SafeAreaView, Text, View, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import fireApp from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { connect } from "react-redux";
import { setAccentColour, setLoading, setUser, setSystemFont } from "../redux/actions";
import { doc, setDoc, getFirestore } from "firebase/firestore"
import styles from "../stylesheets/login.component";
import { Ionicons } from '@expo/vector-icons';

const auth = getAuth(fireApp)
const db = getFirestore(fireApp)


const Register = ({ setUser, user, navigation }) => {
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visibility, setVisibility] = useState(true)

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    const onRegister = async () => {
        try {
            if (email !== '' && password !== '') {
                createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    setUser(userCredential.user)
                    setDoc(doc(db, 'users', userCredential.user.uid), {
                        uid: userCredential.user.uid,
                        fName: fName,
                        lName: lName,
                        email: email,
                        photoUrl: "https://images.unsplash.com/photo-1670327138103-c71ef29be098?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                        conversations: [],
                        accentColour: '#5C4DF8',
                        systemFont: null
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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.mainContainer}>
                <Text style={styles.header}>Register to Begin</Text>
                <Text style={styles.subheader}>Create your account details</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>First Name</Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder="First Name"
                        value={fName}
                        onChangeText={setFName}
                    />
                    <Text style={styles.inputLabel}>Last Name</Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Last Name"
                        value={lName}
                        onChangeText={setLName}
                    />
                    <Text style={styles.inputLabel}>Email Address</Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={{ flexDirection: "row", position: 'relative' }}>
                        <TextInput
                            style={[styles.inputText, { flex: 1 }]}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={visibility}
                        />
                        <TouchableWithoutFeedback onPress={() => { toggleVisibility(); }}>
                            <View style={{ position: 'absolute', left: "88%", top: "25%" }}>
                                <Ionicons suppressHighlighting={true} name={visibility ? "eye-off" : "eye-sharp"} size={24} color="#5C4DF8" />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TouchableOpacity style={[styles.loginButton, { backgroundColor: '#919CFF' }]} onPress={onRegister}>
                    <Text style={styles.loginText}>Register</Text>
                </TouchableOpacity>
                <Button
                    onPress={() => navigation.navigate("Login")}
                    title="Login"
                    color="grey"
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const mapDispatch = { setUser, setAccentColour, setSystemFont, setLoading };
const mapState = (store) => ({
    user: store.dataReducer.user,
    accentColour: store.dataReducer.accentColour,
    systemFont: store.dataReducer.systemFont,
    isLoading: store.dataReducer.isLoading
});

export default connect(mapState, mapDispatch)(Register);
