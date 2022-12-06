import { useState } from "react";
import { StyleSheet, SafeAreaView, Text,View, TextInput, Button } from "react-native";
import fireApp from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { connect } from "react-redux";
import { setUser } from "../redux/actions";

const auth = getAuth(fireApp)

const Register = ({setUser, user,navigation }) => {
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visibility, setVisibility] = useState(true)

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    const onRegister = async () => {
        try{
            if (email !== '' && password !== ''){
                createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    setUser(userCredential.user)
                })
            }
        }catch (err){
            console.log(err)
        }
    }

    return(
        <SafeAreaView>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} />
            <Button title="Register" onPress={onRegister}/>
            <Button onPress={() => navigation.navigate('Login')} title="Login"/>
        </SafeAreaView>
    )
}

const mapDispatch = {setUser};
const mapState = (store) => ({
    user: store.dataReducer.user,
});
export default connect(mapState, mapDispatch)(Register);