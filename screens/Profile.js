import { useState } from "react";
import {SafeAreaView,Text,StyleSheet,Image,Button,View,TextInput,TouchableOpacity, Modal} from "react-native";
import { setUser, setAccentColour, setSystemFont, setLoading, setTheme } from "../redux/actions";
import { connect } from "react-redux";
import styles from '../stylesheets/profile.component';


const Profile = ({ setUser, setAccentColour, setSystemFont, setLoading }) => {
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
            <TouchableOpacity style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{ color: 'white' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Image
        style={styles.image}
        source={profileImg
            ? { uri: `${profileImg}` }:{uri: "https://s3-eu-west-1.amazonaws.com/artsthread-content/images/users/68ebb7a3c21864ae50b17a28b4866a94.jpg"}}
        />
      {fName !== "" && lName !== "" ? (<Text style={styles.header}>{fName} {lName}</Text>
      ) : ( <Text style={styles.header}>FirstName LastName</Text>)}
      <Button
        onPress={() => setModalVisible(true)}
        title="Change photo"
        color="#A5ADF9"
      />
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
                placeholder="MM"
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
        <TouchableOpacity style={styles.saveButton} onPress={() => onSaveChangesClicked()}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapDispatch = { setUser, setAccentColour, setSystemFont, setLoading, setTheme };
const mapState = (store) => ({
    user: store.dataReducer.user,
    accentColour: store.dataReducer.accentColour,
    systemFont: store.dataReducer.systemFont,
    systemTheme: store.dataReducer.systemTheme,
    isLoading: store.dataReducer.isLoading
});


export default connect(mapState, mapDispatch)(Profile);

