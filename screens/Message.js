import { React, useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  Platform,
} from "react-native";
import {
  onSnapshot,
  doc,
  getFirestore,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  setAccentColour,
  setLoading,
  setUser,
  setSystemFont,
} from "../redux/actions";
import { connect } from "react-redux";
import uuid from "react-native-uuid";
import fireApp from "../config/firebase";
import { GiftedChat } from "react-native-gifted-chat";

const db = getFirestore(fireApp);

const Message = ({ user, accentColour, systemFont, route }) => {
  const [text, setText] = useState("");
  const { otherUser } = route.params;
  const [messages, setMessages] = useState([]);
  const [messageArray, setMessageArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let allMessages = [];
      const userRef = onSnapshot(doc(db, "conversations", user.uid), (doc) => {
        doc.data().messages.forEach((element) => {
          if (
            (element.sent_to == user.uid && element.sent_by == otherUser.uid) ||
            (element.sent_to == otherUser.uid && element.sent_by == user.uid)
          ) {
            allMessages.push(element);
          }
        });
        setMessages(allMessages);
      });
    };
    fetchData().catch(console.error);

  }, []);

  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      let allMessages = [];
      resolve(messages.forEach((object) => {
        let result = {
          _id: object.sent_to,
          text: object.text,
          createdAt: object.sent_at,
          user: {
            _id: object.sent_by,
            name: object.id,
            avatar: "https://placeimg.com/140/140/any",
          },
        }

        allMessages.push(result)
        console.log(object)
        setMessageArray(allMessages)
      }))
      reject(
        console.log("Error retrieving messages")
      )
    });
    promise.then((value) => {
      console.log(value)
    }, [])
  }, [messages]);

  let sendMessage = async () => {
    console.log(user.uid);
    console.log(otherUser.uid);
    const current_time = new Date();
    const userRef = doc(db, "conversations", user.uid);
    const userUnion = await updateDoc(userRef, {
      messages: arrayUnion({
        id: uuid.v4(),
        sent_by: user.uid,
        sent_to: otherUser.uid,
        sent_at: current_time,
        text: text,
      }),
    });

    const otherRef = doc(db, "conversations", otherUser.uid);
    const unionRes = await updateDoc(otherRef, {
      messages: arrayUnion({
        id: uuid.v4(),
        sent_by: user.uid,
        sent_to: otherUser.uid,
        sent_at: current_time,
        text: text,
      }),
    });
    setText("");
  };

  const [testMessages, setTestMessages] = useState([]);

  useEffect(() => {
    setTestMessages([
      {
        _id: 1, // sender
        sent_by: "",
        createdAt: new Date(),
        text: "hello",
        user: {
          _id: "QT3zmmAuw7ZYbURLCzUqTtEYah73", // reciever
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((testmessage = []) => {
    sendMessage();
    setMessageArray((previousMessages) =>
      GiftedChat.append(previousMessages, testmessage)
    );
    console.log(testmessage);
  });

  function handMessageClick(textVal) {
    setText(textVal);
  }

  return (
    <GiftedChat
      messages={messageArray == undefined ? console.log("no items") : messageArray}
      onInputTextChanged={(text) => handMessageClick(text)}
      onSend={(message) => onSend(message)}
      user={{
        _id: user.uid,
        name: user.fName,
        avatar: user.photoUrl
    }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messagesSection: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  inputSection: {
    flex: 0.5,
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

const mapDispatch = { setUser, setAccentColour, setSystemFont, setLoading };
const mapState = (store) => ({
  user: store.dataReducer.user,
  accentColour: store.dataReducer.accentColour,
  systemFont: store.dataReducer.systemFont,
  isLoading: store.dataReducer.isLoading,
});

export default connect(mapState, mapDispatch)(Message);
