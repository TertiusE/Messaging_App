import React from "react";
import Message from "../screens/Message";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";


var options = {
  headerTitleAlign: 'left',

}
const Stack = createNativeStackNavigator();

export default HomeNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Group screenOptions={options}>
                <Stack.Screen
                    name="Home"
                    component={MainTabNavigator}
                    options={{ headerShown: false }}

                />
                <Stack.Screen
                    name="Message"
                    component={Message}
                    options={({ route }) => ({ title: route.params.recievingUser })}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ title: "Profile" }}
                />
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{ title: "Settings" }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}