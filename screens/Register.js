import *as React from "react";
import{
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar
}from "react-native";

import firebase from "firebase";
import{RFValue} from "react-native-responsive-fontsize";
import *as Font from "expo-font";



let customFont={
  "NatureBeauty":require("../assets/font/NatureBeauty.ttf")
}

export default class Register extends React.Component{
  constructor(props){
    super(props);
    this.state={
    fontLoaded: false,
    email:"",
    password:"",
    first_name:"",
    second_name:"",
    confirmPassword:"",
    count:0
    }
  }
  async loadFont(){
    await Font.loadAsync(customFont);
    this.setState({fontLoaded:true})
  }
  componentDidMount(){
    this.loadFont();
  }
  
  registerUser = (email, password,confirmPassword,first_name,second_name) => {
  
  if(password==confirmPassword){
    this.setState({count:this.state.count+1})
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
       
        alert("User registered!!");
      
        this.props.navigation.replace("ThankYou");
        firebase.database().ref("/users/" +userCredential.user.uid)
                .set({
                  email: userCredential.user.email,
                  first_name: first_name,
                  second_name: second_name,
                  current_theme: "dark",
                
                })
  
                 
      })
      
      .catch(error => {
        alert(error.message);
      });
    }else{
      alert("Passwords don't match!");
    }

  }
      
    

  
  render(){
      if (this.state.fontLoaded) {
     
      const { email, password, confirmPassword, first_name, second_name } = this.state;
      console.log(email)
    return(
      <View style={styles.container}>
      <Image
      source={require("../assets/icon.png")}
      style={styles.icon}
      />
      <Text style={styles.appTitleText} >New Here </Text>
      <TextInput
        style={styles.textinput}
        onChangeText={text => this.setState({first_name:text})}
        placeholder={"Name"}
      
      />
      <TextInput
        onChangeText={text => this.setState({second_name:text})}
        placeholder={"Last Name"}
            style={[styles.textinput,{marginTop:RFValue(20)}]}
      />
      <TextInput
        onChangeText={text => this.setState({email:text})}
        placeholder={"Email"}
            style={[styles.textinput,{marginTop:RFValue(20)}]}
      />
      <TextInput
        onChangeText={text => this.setState({password:text})}
        placeholder={"Password"}
           style={[styles.textinput,{marginTop:RFValue(20)}]}
      />
      <TextInput
        onChangeText={text => this.setState({confirmPassword:text})}
        placeholder={"Confirm Password"}
          style={[styles.textinput,{marginTop:RFValue(20)}]}
      />
    <TouchableOpacity
              style={styles.button}
             onPress={()=>this.registerUser(email, password,confirmPassword,first_name,second_name)}
 >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity> 
         
      </View>
    )
    
  }
}}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#301934",
    alignItems:"center",
    justifyContent:"center"
  },
  appTitleText:{
    fontFamily:"NatureBeauty",
    fontSize:RFValue(40),
    color:"#A89D8C"
  },
   droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  icon:{
 width: 100,
    height:100,
    resizeMode:"contain"
  },
  textinput:{
   // fontFamily:"NatureBeauty",
  
    borderRadius: RFValue(50),
    fontSize: RFValue(15),
     width:  RFValue(250),
    height: RFValue(40),
    padding: RFValue(10),
    marginTop:RFValue(10),
    backgroundColor:"#FAF085"
  },
  button:{
    backgroundColor:"#702963",
    width:RFValue(80),
    justifyContent:"center",
    borderRadius:RFValue(180),
    width:RFValue(150),
    height:RFValue(65),
    marginTop:RFValue(50),
    justifyContent:"center",
    alignItems:"center"
  },
  buttonText:{
    fontFamily:"NatureBeauty",
    fontSize:RFValue(23),
    color:"#D8BFD8"
  }
})