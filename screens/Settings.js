import { React, useState, useEffect } from "react";
import { Text, View, StyleSheet, Switch, TouchableOpacity, SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { setUser, setAccentColour, setSystemFont, setLoading, setTheme } from "../redux/actions";
import { connect } from "react-redux";
import { useFonts } from 'expo-font';
import DropDownPicker from "react-native-dropdown-picker";
import { updateDoc, doc, getFirestore, } from "firebase/firestore"
import fireApp from "../config/firebase";
import { useIsFocused } from '@react-navigation/native'
import styles from '../stylesheets/settings.component';


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

const ColorCircle = ({ color, handleClick, colorThemeSelected }) => {
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
  const isFocused = useIsFocused()


  useEffect(()=>{
    setIsEnabled(user.systemTheme == 'dark')
    setFont(user.systemFont)
    setColorTheme(user.accentColour)
  },[isFocused])

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
    <View style={systemTheme == 'light' ? styles.container : styles.container__dark}>
      <View style={[systemTheme == 'light' ? styles.sectionContent : styles.sectionContent__dark, { borderBottomWidth: 0 }]}>
        <Text style={[systemTheme == 'light' ? styles.sectionText : styles.sectionText__dark, { fontFamily: systemFont }]}>Accent Colour</Text>
      </View>
      <View style={systemTheme == 'light' ? styles.colourSection : styles.colourSection__dark}>
        {Object.keys(colourOptions).map((keyName, i) => (
          <ColorCircle
            color={colourOptions[keyName]}
            key={i}
            handleClick={handleColorClick}
            colorThemeSelected={colorTheme}
          />
        ))}
      </View>
      <View style={systemTheme == 'light' ? styles.sectionContent : styles.sectionContent__dark}>
        <Text style={[systemTheme == 'light' ? styles.sectionText : styles.sectionText__dark, { fontFamily: systemFont }]}>
          {isEnabled ? "Dark Mode" : "Light Mode"}
        </Text>
        <Switch
          trackColor={{ false: "white", true: accentColour }}
          thumbColor={isEnabled ? "white" : "#f4f3f4"}
          ios_backgroundColor="white"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={[systemTheme == 'light' ? styles.sectionContent : styles.sectionContent__dark, { height: 70 }]}>
        <Text style={[systemTheme == 'light' ? styles.sectionText : styles.sectionText__dark, { fontFamily: systemFont }]}>Font</Text>
        <View style={{ flex: 1 }}>
          <DropDownPicker
            style={systemTheme == 'light' ? { borderColor: "#E8E8E8", color: "white" } : { borderColor: "#2B2A2E", backgroundColor: "#2B2A2E", color: "white" }}
            open={fontOpen}
            value={font}
            items={fonts}
            setOpen={setFontOpen}
            setValue={setFont}
            placeholder="Select Font"
            setItems={fonts}
            containerStyle={{
              borderColor: 'white'
            }}
            textStyle={{
              fontSize: 15,
              color: 'grey'
            }}
          />
        </View>
      </View>
      <TouchableOpacity style={[systemTheme == 'light' ? styles.saveButton : styles.saveButton__dark, { backgroundColor: accentColour }]} onPress={() => onSaveChanges()}>
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