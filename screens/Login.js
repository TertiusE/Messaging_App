import { useState } from "react";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import fireApp from "../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { connect } from "react-redux";
import { setUser } from "../redux/actions";
import Logo from "../assets/appicon.png";
import styles from '../stylesheets/login.component'

const auth = getAuth(fireApp);

const Login = ({ navigation, user, setUser }) => {
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
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image style={styles.logo} source={Logo} />
      <Text style={styles.header}>Welcome to MyMessages</Text>
      <Text style={styles.subheader}>Login to continue</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
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
  );
};

const mapDispatch = { setUser };
const mapState = (store) => ({
  user: store.dataReducer.user,
});

export default connect(mapState, mapDispatch)(Login);
