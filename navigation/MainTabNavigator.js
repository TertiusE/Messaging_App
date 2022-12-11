import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from 'react-native'
import Home from "../screens/Home";
import Message from "../screens/Message";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import { setUser, setAccentColour, setSystemFont, setLoading, setTheme } from "../redux/actions";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import { getAuth } from "firebase/auth";
import fireApp from "../config/firebase";

const auth = getAuth(fireApp)

const signOut = async () => {
  try {
    await auth.signOut()
  } catch (err) {
    console.log(err)
  }
}



const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case "Messages":
      iconName = "home";
      break;
    case "Profile":
      iconName = "person-circle-outline";
      break;
    case "Settings":
      iconName = "settings-outline";
      break;
  }
  return <Ionicons name={iconName} color={color} size={24} />;
};

function MainTabNavigator({ systemFont, accentColour, systemTheme }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
        tabBarBackground: () => <View style={systemTheme == 'light' ? { backgroundColor: 'white', flex: 1 } : { backgroundColor: '#2B2A2E', flex: 1 }}></View>,
      })}
    >
      <Tab.Screen
        name="Messages"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: systemTheme === 'light' ? 'white' : '#1A1A1B',
          },
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            fontFamily: systemFont,
            color: systemTheme === 'light' ? 'black' : 'white',
          }, tabBarActiveTintColor: `${accentColour}`,
        }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          headerStyle: {
            backgroundColor: systemTheme === 'light' ? 'white' : '#1A1A1B',
          },
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            color: systemTheme === 'light' ? 'black' : 'white',
            fontFamily: systemFont
          },
          tabBarActiveTintColor: `${accentColour}`,

        }} />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: {
            backgroundColor: systemTheme === 'light' ? 'white' : '#1A1A1B',
          },
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            color: systemTheme === 'light' ? 'black' : 'white',
            fontFamily: systemFont
          }, tabBarActiveTintColor: `${accentColour}`,
          headerRight: () => <TouchableOpacity onPress={signOut}><Ionicons style={{ marginRight: 10, color: `${accentColour}` }} name="log-out-outline" size="34" /></TouchableOpacity>
        }}
      />
    </Tab.Navigator>
  );
}

const mapDispatch = { setUser, setAccentColour, setSystemFont, setLoading, setTheme };
const mapState = (store) => ({
  user: store.dataReducer.user,
  accentColour: store.dataReducer.accentColour,
  systemFont: store.dataReducer.systemFont,
  systemTheme: store.dataReducer.systemTheme,
  isLoading: store.dataReducer.isLoading
});

export default connect(mapState, mapDispatch)(MainTabNavigator);
