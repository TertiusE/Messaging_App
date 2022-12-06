import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainTabNavigator from './components/MainTabNavigator';
import HomeScreen from './components/HomeScreen'
import Message from './components/Message'
import Profile from './components/Profile'
import Settings from './components/Settings'


const Stack = createNativeStackNavigator();

var options = {
  headerTitleAlign: 'left',

}
import { SafeAreaView,View, Text } from "react-native";
import { Provider } from 'react-redux';
import store from './redux/store';
import HandleNav from "./navigation/HandleNav";

export default function App() {
  
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={options}>
          <Stack.Screen 
            name="HomeScreen"
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
    </NavigationContainer>

      <HandleNav />
    </Provider>
  );
}

