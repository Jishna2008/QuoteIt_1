import * as React from "react";
import{
View,
Text,
TextInput,
TouchableOpacity,
Image,
StyleSheet,
Statusbar,
Platform,
Alert,

}from "react-native";
import *as Font from "expo-font";
import *as SplashScreen from "expo-splash-screen";
import AppLoading from 'expo-app-loading';
import firebase from "firebase";
import{RFValue} from "react-native-responsive-fontsize";
let customFont={
  "NatureBeauty":require("../assets/font/NatureBeauty.ttf")
}
export default class Login extends React.Component{
    constructor(props){
    super(props);
    this.state={
    fontLoaded:false,
    email:"",
    password:"",
    loggedIn:false
    }
  }
  async loadFont(){
    await Font.loadAsync(customFont);
    this.setState({fontLoaded:true})
  }
   componentDidMount(){
    this.loadFont();
  }
  logIn=async(email,password)=>{
    firebase
    .auth()
    .signInWithEmailAndPassword(email,password)
    .then(
      ()=>{
        this.props.navigation.replace("Dashboard")
      }
    )
    .catch(
      error=>{
        alert(error.message)
      }
      
    )
  }
render(){
  if(this.state.fontLoaded){
    
    return(
      <View style={style.container}>
      <View style={style.img}>
      <Image
      source={require("../assets/bg.png")}
      style={style.bg}
      />
    
      </View>   
        <Image
      source={
        require("../assets/icon.png")
      }
        style={style.icon}
      />
  
      <View>
      <Text style={style.title}>
      Login
      </Text>
      </View>
      <View style={style.inputContainer}>
      <TextInput
      placeholder={"Email"}
      placeholderTextColor={"#301934"}
      onChangeText={text=>{this.setState({email:text})}}
      autoFocus={true}
      style={style.input}
      />
       <TextInput
      placeholder={"Password"}
       secureTextEntry={true}
      placeholderTextColor={"#301934"}
      onChangeText={text=>{this.setState({password:text})}}
      autoFocus={true}
      style={[style.input,{marginTop:RFValue(30)}]}
      />
      <TouchableOpacity
      onPress={()=>{this.logIn(this.state.email,this.state.password)}}
      style={style.logB}
      >
      <Text style={style.textB} >Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={()=>this.props.navigation.replace("Register")}
       >
      <Text style={style.regB}>New Here? </Text>
      </TouchableOpacity>
       </View>
      </View>
    )
  }else{
    return <AppLoading/>
  }
}
}
const style=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#301934"
  },
  bg:{
   borderColor: '#301934',
    borderWidth: 5,
    width:RFValue(432),
    height:RFValue(250),
    boarderColor:"purple",
    top:RFValue(-40),
    left:-1
  },
  icon:{
    resizeMode:"contain",
    width:RFValue(100),
    height:RFValue(100),
   top:RFValue(-100),
    borderColor: '#301934',
    borderWidth: 5,
    borderRadius:200
    
  },
  title:{
    color:"#A89D8C",
    fontFamily:"NatureBeauty",
    fontSize:RFValue(40),
    marginTop:-150,
    marginBottom:RFValue(80)
  },
  input:{
    backgroundColor:"#FAF085",
    width:RFValue(250),
    height:RFValue(40),
    borderRadius:RFValue(80),
    marginTop:-80,
    paddingLeft:20,
    fontSize:RFValue(20),
    
  },
  logB:{
    backgroundColor:"#A89D8C",
    marginTop:RFValue(40),
    height:RFValue(80),
    alignItems:"center",
    justifyContent:"center",
    borderRadius:RFValue(80),
    width:RFValue(150),
    marginLeft:RFValue(50)
  },
  textB:{
    color:"white",
    fontFamily:"NatureBeauty",
    fontSize:RFValue(30),
    alignContent:"center",
    paddingBottom:RFValue(20)
  },
  regB:{
    fontSize:RFValue(20),
    fontFamily:"NatureBeauty",
    color:"#C3B1E1",
    marginLeft:RFValue(70),
    marginTop:RFValue(70),
    textDecorationLine: 'underline'
  }
})