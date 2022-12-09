import { React, useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Modal, FlatList, Switch, ActivityIndicator, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { setUser, setAccentColour, setSystemFont, setLoading } from "../redux/actions";
import { connect } from "react-redux";
import { useFonts } from 'expo-font';
import DropDownPicker from "react-native-dropdown-picker";
import { updateDoc } from "firebase/firestore"
import fireApp from "../config/firebase";


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


const Settings = ({ user, isLoading, accentColour, systemFont, setLoading, setAccentColour, setSystemFont }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [colorTheme, setColorTheme] = useState("#5C4DF8");
  const [font, setFont] = useState("sans-serif");
  const [fontOpen, setFontOpen] = useState(false);

  const fonts = [
    { label: 'Caveat', value: 'Caveat' },
    { label: 'Roboto', value: 'Roboto' },
    { label: 'RobotoSlab', value: 'RobotoSlab' },
    { label: 'Poppins', value: 'Poppins' },
    { label: 'Default', value: null },
  ]

  let sendMessage = async () => {
    const current_time = new Date()
    const userRef = doc(db, "users", user.uid);
    const userUnion = await updateDoc(userRef, {
      systemFont: font,
      accentColour: colorTheme
    });
  }

  const onSaveChanges = () => {
    setSystemFont(font)
    setAccentColour(colorTheme)
    sendMessage().catch(err => console.log(err))
  }


  const handleColorClick = (colorPressed) => {
    setColorTheme(colorPressed);
  };

  const [fontsLoaded] = useFonts({
    'Caveat': require("../assets/fonts/Caveat/Caveat-Bold.ttf"),
    'Roboto': require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    'RobotoSlab': require("../assets/fonts/Roboto_Slab/RobotoSlab-Medium.ttf"),
    'Poppins': require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setLoading(false)
    }
  }, [fontsLoaded])

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#2980B9" />
      </SafeAreaView>
    );
  }

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
            style={{ padding: 5, borderColor: "#E8E8E8", color: "#E8E8E8" }}
            open={fontOpen}
            value={font}
            items={fonts}
            setOpen={setFontOpen}
            setValue={setFont}
            placeholder="Select Font"
          />
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={() => onSaveChanges()}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  section: {
    borderColor: "#E8E8E8",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  sectionContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    width: "100%",
    paddingHorizontal: 20,
    borderColor: "#E8E8E8",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    zIndex: 1
  },
  sectionText: {
    flex: 1,
    textAlign: "flex-start",
    fontSize: 18,
    fontWeight: "600",
    color: "#A6A6A6",
  },
  colourSection: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    marginVertical: 4,
    flexWrap: true,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colourButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#5C4DF8",
    marginTop: 30,
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
    textAlign: "center"
  },
});


const mapDispatch = { setUser, setAccentColour, setSystemFont, setLoading };
const mapState = (store) => ({
  user: store.dataReducer.user,
  accentColour: store.dataReducer.accentColour,
  systemFont: store.dataReducer.systemFont,
  isLoading: store.dataReducer.isLoading
});

export default connect(mapState, mapDispatch)(Settings)