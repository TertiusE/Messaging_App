import { React, useState } from "react";
import { Text, View, StyleSheet, Switch, TouchableOpacity, SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { setUser, setAccentColour, setSystemFont, setLoading, setTheme } from "../redux/actions";
import { connect } from "react-redux";
import { useFonts } from 'expo-font';
import DropDownPicker from "react-native-dropdown-picker";
import { updateDoc, doc, getFirestore, } from "firebase/firestore"
import fireApp from "../config/firebase";
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import styles from '../stylesheets/settings.component';


const auth = getAuth(fireApp)
const db = getFirestore(fireApp)

const colourOptions = {
  Blue: "#2F6EFF",
  Steelblue: "#3D6196",
  Skyblue: "#46C5F5",
  Seagreen: "#4DB2BC",
  Limegreen: "#3ACA00",
  Olive: "#60AD52",
  Goldenyellow: "#F5B600",
  Orange: "#F06615",
  Hotpink: "#F03E90",
  Purple: "#9A6EFF",
  Lavender: "#96A0FF",
  Indigo: "#5C4DF8",
};

const fonts = [
  { label: 'Caveat', value: 'Caveat' },
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Roboto Slab', value: 'RobotoSlab' },
  { label: 'Poppins', value: 'Poppins' },
  { label: 'Default', value: null }
]

const ColorCircle = ({ color, handleClick, colorThemeSelected, systemTheme }) => {
  return (
    <View>
      <View style={styles.colourSection}>
        <TouchableOpacity
          style={[styles.colourButton, { backgroundColor: color }]}
          onPress={() => handleClick(color)}
        >
          {colorThemeSelected == color && (
            <Ionicons
              style={styles.checkmark}
              name="checkmark"
              size={50}
              color="white"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};


const Settings = ({ user, isLoading, accentColour, systemFont, systemTheme, setLoading, setAccentColour, setSystemFont, setTheme }) => {
  const [isEnabled, setIsEnabled] = useState(user.systemTheme == 'dark');
  const toggleSwitch = () => setIsEnabled(!isEnabled);
  const [colorTheme, setColorTheme] = useState(user.accentColour);
  const [font, setFont] = useState(user.systemFont);
  const [fontOpen, setFontOpen] = useState(false);
  const navigation = useNavigation();

  const signOut = async () => {
    try {
        await auth.signOut()
    } catch (err) {
        console.log(err)
    }
}

  navigation.setOptions({
    headerRight: () => <TouchableOpacity onPress={signOut}><Ionicons style={{ marginRight: 10, color: `${accentColour}` }} name="log-out-outline" size="34" /></TouchableOpacity>
  })

  let updateSettings = async () => {
    const userRef = doc(db, "users", user.uid);
    const userUnion = await updateDoc(userRef, {
      systemFont: font,
      accentColour: colorTheme,
      systemTheme: isEnabled ? "dark" : "light"
    });
  }

  const onSaveChanges = () => {
    setSystemFont(font)
    setAccentColour(colorTheme)
    setTheme(isEnabled ? "dark" : "light")
    updateSettings().catch(err => console.log(err))
  }

  const handleColorClick = (colorPressed) => {
    setColorTheme(colorPressed);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.sectionContent, { borderBottomWidth: 0 }]}>
        <Text style={[styles.sectionText, { fontFamily: systemFont }]}>Accent Colour</Text>
      </View>
      <View style={styles.colourSection}>
        {Object.keys(colourOptions).map((keyName, i) => (
          <ColorCircle
            color={colourOptions[keyName]}
            key={i}
            handleClick={handleColorClick}
            colorThemeSelected={colorTheme}
          />
        ))}
      </View>
      <View style={styles.sectionContent}>
        <Text style={[styles.sectionText, { fontFamily: systemFont }]}>
          {isEnabled ? "Dark Mode" : "Light Mode"}
        </Text>
        <Switch
          trackColor={{ false: "#C1CFFF", true: "#5C4DF8" }}
          thumbColor={isEnabled ? "white" : "#f4f3f4"}
          ios_backgroundColor="#C1CFFF"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={[styles.sectionContent, { height: 70 }]}>
        <Text style={[styles.sectionText, { fontFamily: systemFont }]}>Font</Text>
        <View style={{ flex: 1 }}>
          <DropDownPicker
            style={{ borderColor: "#E8E8E8", color: "#E8E8E8" }}
            open={fontOpen}
            value={font}
            items={fonts}
            setOpen={setFontOpen}
            setValue={setFont}
            placeholder="Select Font"
            setItems={fonts}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => onSaveChanges()}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
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


export default connect(mapState, mapDispatch)(Settings)