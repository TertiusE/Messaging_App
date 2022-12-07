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
import Logo from "../assets/logo.png";

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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    justifyContent: "stretch",
    alignItems: "stretch",
    width: "80%",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },
  subheader: {
    fontWeight: "500",
    fontSize: 20,
    color: "#9F9F9F",
    marginTop: 10,
    marginBottom: 15,
  },
  inputText: {
    backgroundColor: "#E3E7EE",
    padding: 20,
    borderRadius: 15,
    marginTop: 4,
    marginBottom: 18,
    fontSize: 16,
  },
  inputLabel: {
    justifyContent: "stretch",
    alignSelf: "stretch",
    color: "#A0A0A0",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#5C4DF8",
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 100,
    paddingRight: 100,
    borderRadius: 30,
    shadowColor: "#9F9F9F",
    shadowOffset: {
        width: 2,
        height: 3
      },
      shadowOpacity:1
  },
  loginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    shadowColor:'grey'
  },
  
});

const mapDispatch = { setUser };
const mapState = (store) => ({
  user: store.dataReducer.user,
});

export default connect(mapState, mapDispatch)(Login);
