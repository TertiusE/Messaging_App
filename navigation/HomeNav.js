import React from "react";
import Message from "../screens/Message";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import { connect } from "react-redux";
import { setUser, setAccentColour, setSystemFont, setLoading, setTheme } from "../redux/actions";



const Stack = createNativeStackNavigator();

function HomeNav({ accentColour, systemFont, systemTheme }) {
    var options = {
        headerTitleAlign: 'left',
        headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily: systemFont,
            color: systemTheme === 'light' ? 'black' : 'white',
        },
        headerStyle: {
            backgroundColor: systemTheme === 'light' ? 'white' : '#1A1A1B',
            bottomBorderColor:"white"
          },
        cardStyle: {
            backgroundColor: systemTheme === 'light' ? 'white' : '#1A1A1B',
        }
    }
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

const mapDispatch = { setUser, setAccentColour, setSystemFont, setLoading, setTheme };
const mapState = (store) => ({
    user: store.dataReducer.user,
    accentColour: store.dataReducer.accentColour,
    systemFont: store.dataReducer.systemFont,
    systemTheme: store.dataReducer.systemTheme,
    isLoading: store.dataReducer.isLoading
});

export default connect(mapState, mapDispatch)(HomeNav);