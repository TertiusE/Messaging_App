import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator,StyleSheet, SafeAreaView, Text, TextInput, Button } from "react-native";
import AuthNav from './AuthNav';
import HomeNav from './HomeNav';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import fireApp from '../config/firebase';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions';
import { useColorScheme } from 'react-native';



const auth = getAuth(fireApp)

const HandleNav = ({user, setUser}) => {
    const [isLoading, setLoading] = useState(true)
    let colorScheme = useColorScheme()

    useEffect(()=>{
        onAuthStateChanged(auth, authUser => {
            try {
                authUser ? setUser(authUser) : setUser(null)
                setLoading(false)
            }catch (err){
                console.log(err)
            }
        })
    },[])

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#2980B9" />
            </SafeAreaView>
        );
    }

    return(
        <NavigationContainer theme={{colors:{background: colorScheme == "light" ? "white" : "#1A1A1D"}}}>
            {user ? <HomeNav /> : <AuthNav /> }
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});

const mapDispatch = {setUser};
const mapState = (store) => ({
    user: store.dataReducer.user,
});
export default connect(mapState, mapDispatch)(HandleNav);
