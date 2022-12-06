import React from "react";
import Home from "../screens/Home";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


export default HomeNav = () => {
    return (
        <Tab.Navigator headerMode='none'>
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
    )
}