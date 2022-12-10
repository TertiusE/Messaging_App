import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "../screens/Home";
import Message from "../screens/Message";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";


const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case "Messages":
      iconName = "home";
      break;
    case "Chat":
      iconName = "chatbubbles-outline";
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

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
      })}
    >
      <Tab.Screen
        name="Messages"
        component={Home}
        options={{
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
          },
        }}
      />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
