import *as React from "react";
import
{
View,
Text,
ImageBackground,
StyleSheet,
TouchableOpacity,
Dimensions
}from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";


let customFont={
  "NatureBeauty":require("../assets/font/NatureBeauty.ttf")
}

export default class ThankYou extends React.Component{
  constructor(props){
    super(props);
    this.state={
    fontLoaded:false,
    
    }
  }
  async loadFont(){
    await Font.loadAsync(customFont);
    this.setState({fontLoaded:true})
  }
  render(){
    return(
      <View
      style={styles.container}
      >
      <ImageBackground
      source={require("../assets/ThankBg.png")}
      style={styles.bg}
      >
      <View style={styles.textContainer}>
      <Text style={styles.text}>
      Thank You 
 
      </Text>
      <Text style={[styles.text,{fontSize:RFValue(25)}]}>     for Registering !</Text>
    
      <TouchableOpacity
      onPress={()=> this.props.navigation.replace("Login")}
      >
      <Text style={styles.bText}>
      Wish to Login ?
      </Text>
      </TouchableOpacity>
        </View>
      </ImageBackground>
      </View>
    )
  }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  textContainer:{
    justifyContent:"center",
    alignItems:"center",
    flex:0.9
  },
  text:{
    fontFamily:"NatureBeauty",
    fontSize:RFValue(50),
    color:"#301934",
    alignItems:"center"
  },
  bg:{
     flex:1,
  resize:"cover",
   width:Dimensions.get('window').width,
  height:Dimensions.get('window').height
  },
  bText:{
    fontFamily:"NatureBeauty",   
    textDecorationLine: 'underline',
    marginTop:RFValue(34),
    fontSize:RFValue(15),
    
  }
})