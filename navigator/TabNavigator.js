import React from "react";
import { IonIcon} from  "react-native-vector-icons/Ionicons"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from "../screens/SearchScreen";
import Add from "../screens/AddQuotes";
import {StyleSheet} from "react-native"
const Tab = createMaterialBottomTabNavigator();
const BottomTabNavigator=()=>{
  return(
    <Tab.Navigator
     activeColor="#F6E7E1"
      inactiveColor="#483248"
     
       barStyle={styles.bg}
     
    >
      
      <Tab.Screen name="Home" component={Search} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
       />
      <Tab.Screen name="Add" component={Add} 
          options={{
            tabBarLabel: 'Add',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="pencil" color={color} size={26} />
            ),
          }}/>
    </Tab.Navigator>
  )}
export default BottomTabNavigator;

const styles= StyleSheet.create({
  bg:{ 
    backgroundColor: '#9F2B68',
  
    height: "11%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    overflow: "hidden",
    position: "absolute"}
})