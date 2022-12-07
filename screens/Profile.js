import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  Button,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ProfileImg from "../assets/profile-icon.png";

const Profile = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image style={styles.image} source={ProfileImg} />
      <Text style={styles.header}>Jeremy Woods</Text>
      <Button
        onPress={() => console.log("presssed")}
        title="Change photo"
        color="#A5ADF9"
      ></Button>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput style={styles.inputText} placeholder="First Name" />

        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput style={styles.inputText} placeholder="Last Name" />

        <Text style={styles.inputLabel}>Date of Birth</Text>
        <View style={styles.bDateContainer}>
          <View style={styles.bDateItem}>
            <TextInput
              style={[styles.inputText, styles.inputBDate]}
              placeholder="DD"
            />
            <TextInput
              style={[styles.inputText, styles.inputBDate]}
              placeholder="Month"
            />
            <TextInput
              style={[styles.inputText, styles.inputBDate]}
              placeholder="Year"
            />
            
          </View>
        </View>
        <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
        
      </View>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    width: 150,
    height: 150,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },
  inputContainer: {
    justifyContent: "stretch",
    alignItems: "stretch",
    width: "80%",
    flex:0.8
  },
  inputLabel: {
    color: "#999999",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 25,
  },
  inputText: {
    borderBottomColor: "#D7D7D7",
    borderBottomWidth: 1,
    color: "black",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  bDateContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "stretch",
  },
  bDateItem: {
    height: 50,
    flexDirection: "row",
    alignSelf: "stretch",
    justifySelf: "stretch",
  },
  inputBDate: {
    alignSelf: "center",
    textAlign: "center",
    flex: 1,
    margin: 5,
  },
  saveButton: {
    width:'90%',
    alignSelf:'center',
    backgroundColor: "#5C4DF8",
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 80,
    paddingRight: 80,
    borderRadius: 30,
    shadowColor: "#9F9F9F",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 1,
  },
  saveText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    shadowColor: "grey",
  },
});

export default Profile;
