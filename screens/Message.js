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

const Message = () => {
  const [text, setText] = useState("");
  const inputAccessoryViewID = "uniqueID";

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
