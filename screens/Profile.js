import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Image,FlatList } from 'react-native';
import firebase from "firebase";
import *as Font from "expo-font";
import *as SplashScreen from "expo-splash-screen";
import { DrawerActions } from '@react-navigation/native';
import{RFValue} from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
let customFont={
  "NatureBeauty":require("../assets/font/NatureBeauty.ttf")
}
export default class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state={
      fontLoaded:false,
      name:'',
      light_theme:false,
      isEnabled:true,
      email:'',
      quotes:[],
 
    }
  }
 async loadFont(){
    await Font.loadAsync(customFont);
    this.setState({fontLoaded:true})
  }
   componentDidMount(){
    this.loadFont();
    this.user_detailes();

     
 
  }
 async user_detailes(){
let theme, name, image,mail;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
        name = snapshot.val().first_name + snapshot.val().second_name ;
        mail=snapshot.val().email;
      });
    this.setState({
      light_theme: theme === "light" ? true : false,
      isEnabled: theme === "light" ? false : true,
      name: name,
      email:mail
       
    });
   
 
    console.log(this.state.name,"name")
   await firebase
          .database()
          .ref("/user_names/" + this.state.name + "/")
          .on('value', (snapshot) => {
            let quotes = [];
            if (snapshot.val()) {
              // Iterate over the subvalues of the selected topic
              Object.keys(snapshot.val()).forEach((key) => {
                const quoteData = snapshot.val()[key];
                quotes.push({
                  id: key,
                  author: quoteData.author,
                  quote: quoteData.quote,
                  image :quoteData.image
                });
              });
            }
            this.setState({ quotes }, () => {
              console.log(this.state.quotes,"User"); // Log inside the setState callback
            });

            })
  }
  render(){
    console.log(this.state.quotes.author,"author")
    if(!this.state.name){
   return  ( <View style={styles.container} >
            <AppLoading/>
              <Text style={{fontFamily:"NatureBeauty",fontSize:RFValue(40),color:"white"}}> Loading.. 
             </Text>
              </View>)
    }else{
     return(
      <View style={styles.container}>
          <View style={styles.title}>
            <View style={styles.iconCon}>
             <TouchableOpacity 
            onPress={()=>{this.props.navigation.dispatch(DrawerActions.toggleDrawer())}}
            >
              <Image
                source={require("../assets/icon.png")}
                style={styles.icon}
              />
              </TouchableOpacity>
            </View>
            <Text style={styles.titleText}> Quote It</Text>
          </View>
          <View style={styles.profileContainer} >
            <Text style={styles.name}> User Name :{this.state.name} </Text>
            <Text style={styles.name}> Email: {this.state.email} </Text>
            <Text style={[styles.name,{textDecorationLine: 'underline',margin:RFValue(30),fontSize:RFValue(25),
    fontFamily:"NatureBeauty"}]}>My Quotes</Text>
           
          </View>
      </View>
    )
  }
}}
const styles =StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#301934"
   
  },
  title:{
    flex:0.99,
    flexDirection:"row",

  },
  titleText:{
    fontFamily:"NatureBeauty",
    fontSize:35,
    color:"#F6E7E1"
  },
  iconCon:{
    flex:0.97,

  },
  icon:{
    width:RFValue(80),
    height:RFValue(80),
    resizeMode:"contain"
  },
  profileContainer:{
    flex:0.9,
    justifyContent:"center",
    top:RFValue(-190)
  },
  name:{
    color:"white",
    
    fontFamily:"Freestyle Script",fontSize:RFValue(42)
  }
})
