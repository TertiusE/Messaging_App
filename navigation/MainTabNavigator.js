import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
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

function MainTabNavigator({systemFont}) {
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
            fontFamily: systemFont
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
            fontFamily: systemFont
          },
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
