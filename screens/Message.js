import { React, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  InputAccessoryView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
} from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';


const Message = () => {


  return (
    <GiftedChat />
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

export default Message;
