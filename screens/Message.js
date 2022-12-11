import { React, useState, useEffect, useCallback } from "react";
import {
  onSnapshot,
  doc,
  getFirestore,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  setUser,
  setAccentColour,
  setSystemFont,
  setLoading,
  setTheme,
} from "../redux/actions";
import { connect } from "react-redux";
import uuid from "react-native-uuid";
import fireApp from "../config/firebase";
import { Keyboard, Button, Platform, KeyboardAvoidingView, View, FlatList, Text, StyleSheet, SafeAreaView, TextInput, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const db = getFirestore(fireApp);

const Message = ({ user, accentColour, systemTheme, systemFont, route }) => {
  const [text, setText] = useState("");
  const { otherUser } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageArray, setMessageArray] = useState([]);
  const [arrayDates, setArray] = useState([])
  const [messageID, setIDArray] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const userRef = onSnapshot(doc(db, "conversations", user.uid), (doc) => {
        let allMessages = [];
        let M_ID = []
        let M_DATES = []
        doc.data().messages.forEach((element) => {
          if (
            (element.sent_to === user.uid && element.sent_by === otherUser.uid) ||
            (element.sent_to === otherUser.uid && element.sent_by === user.uid)
          ) {
            allMessages.push(element);
            if (!M_DATES.includes(new Date(element.sent_at).toDateString())){
              M_DATES.push(new Date(element.sent_at).toDateString())
              M_ID.push(element.id)
            }
          }
        });
        allMessages = allMessages.sort((m1, m2) => (m1.sent_at > m2.sent_at) ? 1 : (m1.sent_at < m2.sent_at) ? -1 : 0)
        if (allMessages.length > 0) {
          let date = new Date(allMessages[0].sent_at)
        }
        setMessages(allMessages);
        setIDArray(M_ID)
        setArray(M_DATES)
      });
    };
    fetchData().catch(console.error);
  }, []);


  let sendMessage = async () => {
    const current_time = new Date().getTime();
    let message_id = uuid.v4()

    if (otherUser.uid != user.uid) {
      const userRef = doc(db, "conversations", user.uid);
      const userUnion = await updateDoc(userRef, {
        messages: arrayUnion({
          id: message_id,
          sent_by: user.uid,
          sent_to: otherUser.uid,
          sent_at: current_time,
          text: text,
        }),
      });
    }

    const otherRef = doc(db, "conversations", otherUser.uid);
    const unionRes = await updateDoc(otherRef, {
      messages: arrayUnion({
        id: message_id,
        sent_by: user.uid,
        sent_to: otherUser.uid,
        sent_at: current_time,
        text: text,
      }),
    });
    setText("");
  };

  const inputAccessoryViewID = 'uniqueID';

  const MessageBubble = ({ text, sent_by, time, id }) => {
    if (messageID.includes(id)) {
      return (
        <View>
          <Text style={{textAlign:"center",margin:10}}>{arrayDates[messageID.indexOf(id)]}</Text>
          <View style={{ borderRadius: StyleSheet.hairlineWidth * 15, padding: 12, backgroundColor: "grey", margin: 10, maxWidth: "80%", alignSelf: user.uid == sent_by ? "flex-end" : "flex-start", backgroundColor: user.uid == sent_by ? accentColour : "grey" }}>
            <Text style={{ fontFamily: systemFont, fontSize: 17 }}>{text}</Text>
            <Text style={{ fontSize: 10, alignSelf: user.uid == sent_by ? "flex-end" : "flex-start", paddingTop: 5 }}>{new Date(time).toLocaleTimeString([], { hour: "numeric", minute: "numeric" })}</Text>
          </View>
        </View>
      )
    }else{
      return (
        <View style={{ borderRadius: StyleSheet.hairlineWidth * 15, padding: 12, backgroundColor: "grey", margin: 10, maxWidth: "80%", alignSelf: user.uid == sent_by ? "flex-end" : "flex-start", backgroundColor: user.uid == sent_by ? accentColour : "grey" }}>
          <Text style={{ fontFamily: systemFont, fontSize: 17 }}>{text}</Text>
          <Text style={{ fontSize: 10, alignSelf: user.uid == sent_by ? "flex-end" : "flex-start", paddingTop: 5 }}>{new Date(time).toLocaleTimeString([], { hour: "numeric", minute: "numeric" })}</Text>
        </View>
      )
    }
    
  }

  const renderMessageBubble = ({ item }) => (
    <MessageBubble text={item.text} sent_by={item.sent_by} time={item.sent_at} id={item.id} />
  );

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={110}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 8 }}>
          <FlatList data={messages} renderItem={renderMessageBubble} inverted contentContainerStyle={{ flexDirection: 'column-reverse' }} />
        </View>
        <SafeAreaView style={{ flex: 1, flexDirection: "row", flexGrow: 1, justifyContent: "center", marginBottomr: 10, position: "relative" }}>
          {/* <TextInput multiline value={text} onChangeText={setText} style={{paddingHorizontal: 10,fontSize:18,textAlignVertical:"center", paddingVertical:30, borderColor: "black", borderWidth: StyleSheet.hairlineWidth * 10, borderRadius: StyleSheet.hairlineWidth * 15, flexBasis: "85%",flexGrow:0,flexShrink:1, height: "30%", alignSelf: "center", margin: 10 }} /> */}
          <TextInput multiline value={text} onChangeText={setText} style={{ backgroundColor: "white", position: "absolute", paddingHorizontal: 10, fontSize: 18, textAlignVertical: "center", paddingVertical: 30, borderColor: "black", borderWidth: StyleSheet.hairlineWidth * 10, borderRadius: StyleSheet.hairlineWidth * 15, width: "75%", flexGrow: 0, flexShrink: 1, alignSelf: "flex-end", margin: 10, justifyContent: "flex-start", left: 10 }} />
          <TouchableOpacity
            style={[styles.colourButton, { backgroundColor: accentColour, position: "absolute", right: 10, bottom: 3, borderColor: "black", borderWidth: StyleSheet.hairlineWidth * 10, flex: 1, justifyContent: "center" }]}
            onPress={() => { sendMessage() }}
          >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", transform: [{ rotate: "-25deg" }] }}>
              <Ionicons name="send" size={28} color="white" />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 5,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    borderColor: "#000000",
    borderBottomWidth: 1,
  },
  colourButton: {
    borderRadius: 40,
    height: 58,
    width: 58,
  }
});


const mapDispatch = {
  setUser,
  setAccentColour,
  setSystemFont,
  setLoading,
  setTheme,
};
const mapState = (store) => ({
  user: store.dataReducer.user,
  accentColour: store.dataReducer.accentColour,
  systemFont: store.dataReducer.systemFont,
  systemTheme: store.dataReducer.systemTheme,
  isLoading: store.dataReducer.isLoading,
});

export default connect(mapState, mapDispatch)(Message);