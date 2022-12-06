import { useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput, Button,View } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import fireApp from "../config/firebase";
import { setUser } from "../redux/actions";
import { connect } from "react-redux";

const auth = getAuth(fireApp)

const Home = ({user, setUser}) => {
    const signOut = async() => {
        try{
            await auth.signOut()
        }catch(err){
            console.log(err)
        }
    }

    return(
        <View>
            <Button title="LogOut" onPress={signOut}/>
            <Text>{user.email}</Text>
        </View>
    )
}

const mapDispatch = {setUser};
const mapState = (store) => ({
    user: store.dataReducer.user,
});
export default connect(mapState, mapDispatch)(Home);