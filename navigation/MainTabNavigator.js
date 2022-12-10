import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import {View} from 'react-native'
import Home from "../screens/Home";
import Message from "../screens/Message";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import { setUser, setAccentColour, setSystemFont, setLoading, setTheme } from "../redux/actions";
import { connect } from "react-redux";

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

function MainTabNavigator({systemFont, accentColour, systemTheme}) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
        tabBarBackground: () => <View style={systemTheme == 'light' ? {backgroundColor:'white', flex:1} : {backgroundColor:'#2B2A2E', flex:1}}></View>,
          elevation: 0,
      })}
    >
      <Tab.Screen
        name="Messages"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor:systemTheme === 'light' ? 'white' : '#1A1A1B',
          },
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            fontFamily: systemFont,
            color:systemTheme === 'light' ? 'black' : 'white',
          },tabBarActiveTintColor:`${accentColour}`,
        }}
      />
      <Tab.Screen name="Profile" component={Profile} 
      options={{
        headerStyle: {
          backgroundColor:systemTheme === 'light' ? 'white' : '#1A1A1B',
        },
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            color:systemTheme === 'light' ? 'black' : 'white',
            fontFamily: systemFont
          },
        tabBarActiveTintColor:`${accentColour}`,
        bottomTabs: {
          backgroundColor:'green'
        },
      

        }} />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: {
            backgroundColor:systemTheme === 'light' ? 'white' : '#1A1A1B',
          },
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
            color:systemTheme === 'light' ? 'black' : 'white',
            fontFamily: systemFont
          },tabBarActiveTintColor:`${accentColour}`
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
