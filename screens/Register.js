import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import fireApp from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { connect } from "react-redux";
import { setUser } from "../redux/actions";
import Logo from "../assets/appicon.png";
import styles from "../stylesheets/login.component";

const auth = getAuth(fireApp);

const Register = ({ setUser, user, navigation }) => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(true);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const onRegister = async () => {
    try {
      if (email !== "" && password !== "") {
        createUserWithEmailAndPassword(auth, email, password).then(
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
      <Text style={styles.header}>Register to Begin</Text>
      <Text style={styles.subheader}>Create your account details</Text>

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

      <TouchableOpacity style={[styles.loginButton, {backgroundColor:'#919CFF'}]} onPress={onRegister}>
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>
      <Button
        onPress={() => navigation.navigate("Login")}
        title="Login"
        color="grey"
      />
    </SafeAreaView>
  );
};

const mapDispatch = { setUser };
const mapState = (store) => ({
  user: store.dataReducer.user,
});

export default connect(mapState, mapDispatch)(Register);
