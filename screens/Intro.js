import React from 'react';
import { View, Text, Image,StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AppLoading from "expo-app-loading";
import { RFValue } from "react-native-responsive-fontsize";
import *as Font from "expo-font";
const slides = [
  {
    key: '1',
    title: 'QuoteIt',
    text_1: 'We are humans ,we experience a vivd range of emotions every day.',
    text_2:'Here is an app to make you feel better and start your day fresh with a quote',
  image: require('../assets/icon.png'),
    backgroundColor: '#E0B0FF',
  },
  {
    key: '2',
    title:'Start a day with a quote',
    text_1: 'Press on the Select Quote dropdown to select a topic to search quotes on',
    text_2:'Scrolldown to enjoy quotes. We recommand to learn a new quote everyday.',
 image: require('../assets/intro1.png'),
    backgroundColor: '#febe29',
  },
  {
    key: '3',
    title: 'You have an inspiring mind,Let us create some inspiring quotes',
    text_1: 'Switch to the Add Quote Tab in the home screen to Add your quotes',
    text_2:'Do press the Submit button',
image: require('../assets/intro2.png'),
    backgroundColor: '#22bcb5',
  },
    {
    key: '4',
    title: 'More to Explore!',
    text_1: 'Press on the App Icon to open the Drawer',
    text_2:'Go to Profile Screen to view your profile  ',
    image: require('../assets/quotIt.png'),
    backgroundColor: '#FAF085',
  },
      {
    key: '5',
    title: 'Wanna see your quotes!',
    text_1: 'In Profile Page press on the My Quotes to view your quotes ',
    text_2:' Hope you enjoyed our App ',
   image: require('../assets/Life.png'),
    backgroundColor: '#22bcb5',
  },
];

let customFont={
  "NatureBeauty":require("../assets/font/NatureBeauty.ttf")
}
export default class Intro extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    showRealApp: false,
    fontLoaded:false
  };}

   async loadFont(){
    await Font.loadAsync(customFont);
    this.setState({fontLoaded:true})
  }
  componentDidMount(){
    this.loadFont();
  }

  _renderItem = ({item }) => {
    return (
      <View style={[style.container,{backgroundColor:item.backgroundColor}]}>
        <Text style={style.title}>{item.title}</Text>
        <Image source={item.image}
        style={style.img}/>
        <Text style={style.text}>{item.text_1}</Text>
         <Text style={[style.text,{marginBottom:RFValue(70)}]}>{item.text_2}</Text>
      </View>
    );
  };

  _onDone = () => {
    // User finished the introduction. Show the real app by updating the state.
    this.setState({ showRealApp: true });
   this.props.navigation.replace("Login")
  };

  render() {
    // if(!this.state.fontLoaded){
    //   <AppLoading/>
    // }else{
    if (this.state.showRealApp) {
        this.props.navigation.replace("Login")
    } else {
      return (
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
        />
      );
    }
  }
}

const style =StyleSheet.create({
container:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
},
text:{
  fontFamily:"NatureBeauty",
  fontSize:RFValue(20),
  margin:RFValue(25),
  marginBottom:RFValue(0)
},
img:{
  width:350,
  height:300,
  margin:RFValue(30),
  borderRadius:10
  },
title:{
  fontFamily:"NatureBeauty",
  fontSize:RFValue(38),
  fontWeight:"bold",
  textDecorationLine: 'underline',
  marginTop:RFValue(40),
  fontFamily:"NatureBeauty",
}
})
