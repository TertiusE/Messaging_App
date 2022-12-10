import { useState, useEffect } from "react";
import { Platform, SafeAreaView, Text, StyleSheet, Image, Button, View, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView } from "react-native";
import { setUser, setAccentColour, setSystemFont, setLoading, setTheme } from "../redux/actions";
import { connect } from "react-redux";
import styles from '../stylesheets/profile.component';
import store from '../redux/store/index';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native'


const Profile = ({ user, setUser, setAccentColour, setSystemFont, setLoading }) => {
  const [fName, setfName] = useState(user.fName);
  const [lName, setlName] = useState(user.lName);
  const [birthDate, setBirthDate] = useState(new Date());
  const [open, setOpen] = useState(false)
  const [profileImg, setProfileImg] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused()

  const state = store.getState();
  const systemTheme = state.dataReducer.systemTheme
  const accentColour = state.dataReducer.accentColour

  useEffect(()=>{
    setBirthDate(new Date())
    setfName(user.fName)
    setlName(user.lName)
  },[isFocused])
  /* Dispatch User Info changes */
  const onSaveChangesClicked = () => {
    let userChanges = {};
    // Validate user input before storing
    if (fName) {
      userChanges.firstName = fName;
    }
    if (lName) {
      userChanges.lastName = fName;
    }
    if (birthDate) {
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
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpen(false);
    setBirthDate(currentDate);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}>
      <SafeAreaView style={systemTheme == 'light' ? styles.mainContainer : styles.mainContainer__dark}>
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
            ? { uri: `${profileImg}` } : { uri: "https://s3-eu-west-1.amazonaws.com/artsthread-content/images/users/68ebb7a3c21864ae50b17a28b4866a94.jpg" }}
        />
        {fName !== "" && lName !== "" ? (<Text style={systemTheme == 'light' ? styles.header : styles.header__dark}>{fName} {lName}</Text>
        ) : (<Text style={systemTheme == 'light' ? styles.header : styles.header__dark}>FirstName LastName</Text>)}
        <Button
          onPress={() => setModalVisible(true)}
          title="Change photo"
          color={accentColour}
        />
        <View style={styles.inputContainer}>
          <Text style={systemTheme == 'light' ? styles.inputLabel : styles.inputLabel_dark}>First Name</Text>
          <TextInput
            style={systemTheme == 'light' ? styles.inputText : styles.inputText__dark}
            placeholder="First Name"
            placeholderTextColor={systemTheme == 'light' ? 'white' : 'white'}
            value={fName}
            onChangeText={setfName}
            keyboardAppearance={systemTheme}
          />
          <Text style={systemTheme == 'light' ? styles.inputLabel : styles.inputLabel_dark}>Last Name</Text>
          <TextInput
            style={systemTheme == 'light' ? styles.inputText : styles.inputText__dark}
            placeholder="Last Name"
            placeholderTextColor={systemTheme == 'light' ? 'white' : 'white'}
            value={lName}
            onChangeText={setlName}
            keyboardAppearance={systemTheme}
          />
          <View style={{flexDirection:"row"}}>
            <Text style={systemTheme == 'light' ? styles.inputLabel : styles.inputLabel_dark}>Date of Birth</Text>
            <View style={{flex:1}}>
              <RNDateTimePicker
                value={birthDate}
                mode="date"
                is24Hour={true}
                onChange={onChange}
                themeVariant={systemTheme}
                maximumDate={new Date()}
                style={{position:"absolute",left:"41%",top:15 }}
              />
            </View>
          </View>
          <TouchableOpacity style={[systemTheme == 'light' ? styles.saveButton : styles.saveButton__dark, { backgroundColor: accentColour, marginTop:50 }]} onPress={() => onSaveChangesClicked()}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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

