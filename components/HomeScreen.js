import { React, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
  TextInput
} from "react-native";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import Profile from "../assets/profile-icon.png";

/* Sample Data */
const DATA = [
  {
    id: nanoid(),
    name: "Jeremy",
    time: "12:30pm",
    message: "This is a sample message...",
  },
  {
    id: nanoid(),
    name: "Catilyn",
    time: "3:30pm",
    message: "This is a sample message...",
  },
  {
    id: nanoid(),
    name: "Sam",
    time: "6:05pm",
    message: "This is a sample message...",
  },
];

const MessageItem = ({ name, time, message }) => (
  <View style={styles.itemContainer}>
    <Image style={{ height: 60, width: 60 }} source={Profile} />
    <View style={styles.itemSection}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemTime}>{time}</Text>
      </View>
      <Text style={styles.itemMessage}>{message}</Text>
    </View>
  </View>
);

const renderMessageItem = ({ item }) => (
  <MessageItem name={item.name} time={item.time} message={item.message} />
);

const HomeScreen = () => {
  const [text, setText] = useState("")
  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={text}
        onChangeText={setText}
      />
      <FlatList
        data={DATA}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {  
    flex:1,
    backgroundColor:'white'
  },
  input: {
    padding: 15,
    backgroundColor: '#E3E7EE',
    margin:15,
    borderRadius:10,
    fontSize:18
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderBottomWidth:1,
    borderBottomColor:'#D9D9D9'
  },
  itemSection: {
    paddingTop: 5,
    flex: 1,
    marginLeft: 5,
  },
  itemHeader: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 19,
    fontWeight: "700",
  },
  itemMessage: {
    fontSize: 16,
    color: "#999999",
  },
  itemTime: {
    fontSize: 16,
    color: "#A5ADF9",
    fontWeight: "600",
  },
});

export default HomeScreen;
