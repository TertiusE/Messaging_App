import { React, useState, useRef } from "react";
import { Text, View, StyleSheet, Modal, FlatList, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import * as SplashScreen from "expo-splash-screen";

import { useFonts } from "expo-font";
import { useCallback } from "react";

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

SplashScreen.preventAutoHideAsync();

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [colorTheme, setColorTheme] = useState("#5C4DF8");
  const [font, setFont] = useState("sans-serif");

  const handleColorClick = (colorPressed) => {
    setColorTheme(colorPressed);
  };

  const [fontsLoaded] = useFonts({
    Caveat: require("../assets/fonts/Caveat/Caveat-Bold.ttf"),
    Roboto: require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    RobotoSlab: require("../assets/fonts/Roboto_Slab/RobotoSlab-Medium.ttf"),
    Poppins: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.sectionContent}>
        <Text style={styles.sectionText}>Font</Text>
      </View>
      <View style={styles.sectionContent}>
        <Text style={styles.sectionText}>
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
      <View style={[styles.sectionContent, { borderBottomWidth: 0 }]}>
        <Text style={[styles.sectionText]}>Accent Colour</Text>
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
      {/* <Picker
        selectedValue={font}
        onValueChange={(value) => {
          setFont(value);
        }}
      >
        <Picker.Item label="Caveat" value="Caveat" />
        <Picker.Item label="Roboto" value="Roboto" />
      </Picker>
      <View>
        <Text>{font}</Text>
      </View> */}
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
    zIndex: 1,
    borderColor: "#E8E8E8",
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
});
export default Settings;
