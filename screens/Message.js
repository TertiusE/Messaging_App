import { React, useState } from "react";
import {Text, View, StyleSheet,TextInput,ScrollView,KeyboardAvoidingView,Button} from "react-native";
import {collection, doc, setDoc, getFirestore, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore"
import { connect } from "react-redux";
import { setUser } from "../redux/actions";
import { nanoid } from "nanoid";
import fireApp from "../config/firebase";


const db = getFirestore(fireApp)

const Message = ({user, route}) => {
  const [text, setText] = useState("");
  const { otherUser } = route.params


  let sendMessage = async () => {
    const current_time = new Date()
    const userRef = doc(db,"conversations",user.uid);
    const userUnion = await updateDoc(userRef, {
      messages: arrayUnion({
        id : nanoid(),
        sent_by : user.uid,
        sent_to : otherUser.uid,
        sent_at : current_time,
        text: text
      })
    });

    const otherRef = doc(db,"conversations",otherUser.uid);
    const unionRes = await updateDoc(otherRef, {
      messages: arrayUnion({
        id : nanoid(),
        sent_by : user.uid,
        sent_to : otherUser.uid,
        sent_at : current_time,
        text: text
      })
    });
    setText("")

  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.messagesSection}>
        <Text>Messages</Text>
      </ScrollView>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={text}
          onChangeText={setText}
        />
        <Button title="Send" onPress={sendMessage}/>
      </View>
   
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messagesSection: {
    flex: 1,
    backgroundColor:'#F9F9F9'
  },
  inputSection: {
    flex:0.5,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    flexDirection: "row",
    padding: 1,
    backgroundColor: "#E3E7EE",
    borderRadius: 5,
    fontSize: 16,
    height: 40,
    margin: 20,
  },
});

const mapDispatch = {setUser};
const mapState = (store) => ({
    user: store.dataReducer.user,
});
export default connect(mapState, mapDispatch)(Message);
