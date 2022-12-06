import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'
import Message from './Message'
import Profile from './Profile'
import Settings from './Settings'
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Message':
      iconName = 'chatbubbles-outline'
      break;
    case 'Profile':
      iconName = 'person-circle-outline'
      break;
    case 'Settings':
      iconName = 'settings-outline'
      break;
  }

  return <Ionicons name={iconName} color={color} size={24}/>
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color)
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Message" component={Message}/>
      <Tab.Screen name="Profile" component={Profile}/>
      <Tab.Screen name="Settings" component={Settings}/>
    </Tab.Navigator>
  )
}

export default MainTabNavigator;