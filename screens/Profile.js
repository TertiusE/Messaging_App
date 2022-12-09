import React from "react";
import { useState } from "react";
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
  Modal,
  Pressable,
} from "react-native";
import ProfileImg from "../assets/profile-icon.png";

const Profile = () => {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [bDay, setbDay] = useState("");
  const [bMonth, setbMonth] = useState("");
  const [bYear, setbYear] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [profileImg, setProfileImg] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  /* Dispatch User Info changes */
  const onSaveChangesClicked = () => {
    let newBirthDate = new Date(`${bMonth} ${bDay}, ${bYear}`);
    setBirthDate(newBirthDate);
    let userChanges = {};

    // Validate user input before storing
    if (fName) {
      userChanges.firstName = fName;
    }
    if (lName) {
      userChanges.lastName = fName;
    }
    if (bDay && bMonth && bYear && !Number.isNaN(Date.parse(newBirthDate))) {
      userChanges.birthDate = birthDate;
    }
    if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(profileImg)) {
      userChanges.profileImage = profileImg;
      setProfileImg(profileImg)
    } else {
      setProfileImg(
        "https://s3-eu-west-1.amazonaws.com/artsthread-content/images/users/68ebb7a3c21864ae50b17a28b4866a94.jpg"
      );
    }

    console.log(userChanges);

    setfName("");
    setlName("");
    setbDay("");
    setbMonth("");
    setbYear("");
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Modal View */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={setModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Change Image</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Image URL"
              value={profileImg}
              onChangeText={setProfileImg}
            />

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{color:'white'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Image
        style={styles.image}
        source={
          profileImg
            ? { uri: `${profileImg}` }
            : {
                uri: "https://s3-eu-west-1.amazonaws.com/artsthread-content/images/users/68ebb7a3c21864ae50b17a28b4866a94.jpg",
              }
        }
      />

      {fName !== "" && lName !== "" ? (
        <Text style={styles.header}>
          {fName} {lName}
        </Text>
      ) : (
        <Text style={styles.header}>FirstName LastName</Text>
      )}

      <Button
        onPress={() => setModalVisible(true)}
        title="Change photo"
        color="#A5ADF9"
      ></Button>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          style={styles.inputText}
          placeholder="First Name"
          value={fName}
          onChangeText={setfName}
        />

        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Last Name"
          value={lName}
          onChangeText={setlName}
        />

        <Text style={styles.inputLabel}>Date of Birth</Text>
        <View style={styles.bDateContainer}>
          <View style={styles.bDateItem}>
            <TextInput
              style={[styles.inputText, styles.inputBDate]}
              placeholder="DD"
              value={bDay}
              onChangeText={setbDay}
            />
            <TextInput
              style={[styles.inputText, styles.inputBDate]}
              placeholder="MMM"
              value={bMonth}
              onChangeText={setbMonth}
            />
            <TextInput
              style={[styles.inputText, styles.inputBDate]}
              placeholder="YYYY"
              value={bYear}
              onChangeText={setbYear}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => onSaveChangesClicked()}
        >
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
    borderRadius: 100,
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
    flex: 0.8,
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
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#5C4DF8",
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 80,
    paddingRight: 80,
    borderRadius: 20,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 30,
    padding:15,
    paddingLeft: 25,
    paddingRight: 25,
    elevation: 2,
    color:'white',
  },
  buttonClose: {
    marginTop:15,
    backgroundColor: "#A5ADF9",
    color:'white',
    fontSize:20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:20,
    fontWeight:'700'
  },
});

export default Profile;
