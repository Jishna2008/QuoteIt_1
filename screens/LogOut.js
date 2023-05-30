import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import firebase from "firebase";
export default class LogOut extends React.Component{
   componentDidMount(){
    firebase.auth().signOut;
    this.props.navigation.navigate("Login")
  }
  render(){
    return(
      <View>
      <Text>MyQuotes</Text>
      </View>
    )
  }
}
