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
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const db = getFirestore(fireApp);

const Message = ({ user, accentColour, systemTheme, systemFont, route }) => {
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
            (element.sent_to === user.uid && element.sent_by === otherUser.uid) ||
            (element.sent_to === otherUser.uid && element.sent_by === user.uid)
          ) {
            allMessages.push(element);
          }
        });
        allMessages = allMessages.sort((m1, m2) => (m1.sent_at < m2.sent_at) ? 1 : (m1.sent_at > m2.sent_at) ? -1 : 0)
        setMessages(allMessages);
      });
    };
    fetchData().catch(console.error);
  }, []);


  useEffect(() => {
    const promise = new Promise((resolve, reject) => {
      let allMessages = [];
      resolve(
        messages.forEach((message) => {
          let result = {
            _id: uuid.v4(),
            text: message.text,
            createdAt: new Date(message.sent_at),
            user: {
              _id: message.sent_by,
              name: message.id,
              avatar: "https://placeimg.com/140/140/any",
            },
          };
          allMessages.push(result);
          setMessageArray(allMessages);
        })
      );
      reject(console.log("Error retrieving messages"));
    });
    promise.then((value) => {
      console.log(value);
    }, []);
  }, [messages]);

  let sendMessage = async () => {
    console.log(user.uid);
    console.log(otherUser.uid);
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

  const onSend = useCallback((message = []) => {
    sendMessage();
    setMessageArray((previousMessages) =>
      GiftedChat.append(previousMessages, message)
    );
  });
  function handMessageClick(textVal) {
    setText(textVal);
  }

  return (
    <GiftedChat
      messages={
        messageArray == undefined
          ? console.log("No messaages found.")
          : messageArray
      }
      onInputTextChanged={(text) => handMessageClick(text)}
      onSend={(message) => onSend(message)}
      user={{
        _id: user.uid,
        name: user.fName,
        avatar: user.photoUrl,
      }}
    />
  );
};

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