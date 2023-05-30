import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Tab from "./TabNavigator";
import ScreenB from "../screens/MyQuotes";
import CustomSidebar from "../screens/CustomSidebar";
import LogOut from "../screens/LogOut";
import Profile from "../screens/Profile";
const Drawer = createDrawerNavigator();
 const DrawerNavigator=() =>{
  return (
   
      <Drawer.Navigator 
      
       drawerOptions={{
         drawerActiveTintColor:"#BF40BF",
         inactiveTintColor:"#BF40BF"
       }}
       drawerContent={
         props=> <CustomSidebar {...props}/>
       }
       >
        <Drawer.Screen name="Home" component={Tab} />
        <Drawer.Screen name="My Quotes" component={ScreenB} />
      
        <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="LogOut" component={LogOut} />
      </Drawer.Navigator>
 
  );
 }
 export default DrawerNavigator