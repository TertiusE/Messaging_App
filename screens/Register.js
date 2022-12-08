import { useState } from "react";
import { StyleSheet, SafeAreaView, Text,View, TextInput, Button } from "react-native";
import fireApp from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { connect } from "react-redux";
import { setUser } from "../redux/actions";
import {collection, doc, setDoc, getFirestore, serverTimestamp } from "firebase/firestore"
import { getFunctions } from "firebase/functions"

const auth = getAuth(fireApp)
const db = getFirestore(fireApp)


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
                    setDoc(doc(db,'users',userCredential.user.uid), {
                        uid: userCredential.user.uid,
                        fName:fName,
                        lName:lName,
                        email:email,
                        photoUrl:"https://images.unsplash.com/photo-1670327138103-c71ef29be098?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                        conversations: []
                    })
                    setDoc(doc(db,'conversations',userCredential.user.uid), {
                        messages:[]
                    })
                }).catch((err)=>{console.log(err)})
            }
        }catch (err){
            console.log(err)
        }
    }




    return(
        <SafeAreaView>
            <TextInput placeholder="First Name" value={fName} onChangeText={setFName} />
            <TextInput placeholder="Last Name" value={lName} onChangeText={setLName} />
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