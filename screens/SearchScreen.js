import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView ,FlatList} from 'react-native';
import firebase from "firebase";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions } from '@react-navigation/native';
let customFont = {
  "NatureBeauty": require("../assets/font/NatureBeauty.ttf")
};

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      selectedValue: '',
      quotes: [],

      items:[],
     dropdownHeight: 25 
    };
  }

  async loadFont() {
    await Font.loadAsync(customFont);
    this.setState({ fontLoaded: true });
  }

async componentDidMount() {
  this.loadFont();
  await SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding
  this.getData();
  await SplashScreen.hideAsync(); // Hide the splash screen once your component is ready
}

  getData() {
    firebase
      .database()
      .ref('topics')
      .on('value', (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const items = Object.keys(data).map((key) => ({
            label: key,
            value: key
          }));
          this.setState({ items, topics: data });
        }
      });
  }

  handleValueChange = (selectedValue) => {
    firebase
      .database()
      .ref('/topics/' + selectedValue + '/')
      .on('value', (snapshot) => {
        let quotes = [];
        if (snapshot.val()) {
          Object.keys(snapshot.val()).forEach((key) => {
            const quoteData = snapshot.val()[key];
            quotes.push({
              id: key,
              author: quoteData.author,
              quote: quoteData.quote,
              image: quoteData.image
            });
          });
        }
        this.setState({ quotes });
      });
  };

  renderQuoteItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.handleQuotePress(item)} style={[styles.but,{marginTop:20}]}>
        <Image source={{ uri: item.image }} style={styles.qImg} />
        <Text style={styles.qText}>Quote: {item.quote}</Text>
        <Text style={[styles.qText, { marginTop: RFValue(25) }]}>Author: {item.author}</Text>
        <TouchableOpacity><Text style={styles.qText}>Add to Favorites</Text></TouchableOpacity>
      </TouchableOpacity>
    );
  };

  handleQuotePress = (quote) => {
    console.log('Quote Pressed:', quote);
  };

  render() {
    const { items, selectedValue, quotes } = this.state;

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      if(!this.state.items){}else{
      SplashScreen.hideAsync();
      return (
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
            <Text style={styles.titleText}>Quote It</Text>
          </View>
          <View style={styles.search}>
                <DropDownPicker
              items={
                  items
              }
              defaultValue={items}
              open={this.state.dropdownHeight===25 ? true : false}
              onOpen={() => {
                this.setState({ dropdownHeight: 25 });
              }}
              onClose={() => {
                this.setState({ dropdownHeight: 40 });
              }}
              value={selectedValue}
              onSelectItem={(item) => {
                this.setState({ selectedValue: item.value });
                this.handleValueChange(item.value);
                
              }}
            />

          </View>
        <FlatList
          data={quotes}
          renderItem={this.renderQuoteItem}
          keyExtractor={(item) => item.id}
        />
   
          
        </View>
      );
    }}
  }
}

const styles =StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
   
    backgroundColor:"#301934"
   
  },
  title:{
    
  flexDirection:"row",
  justifyContent:"center",
  marginLeft:RFValue(40),
  marginTop:RFValue(40)
  },
  titleText:{
    fontFamily:"NatureBeauty",
    fontSize:45,
    color:"#F6E7E1",
    paddingRight:RFValue(70)
  },
  iconCon:{
    flex:0.97,

  },
  icon:{
    width:RFValue(80),
    height:RFValue(80),
    resizeMode:"contain"
  },
  picker:{
   
    fontFamily:"NatureBeauty",
    width:100,
    borderRadius:RFValue(35),
    height:50,
    backgroundColor:"#FAF085",
    justifyContent:"center",
    alignItems:"center",
    marginLeft:RFValue(35)
  },
  search:{
    flex:4.8
  },
  but:{
    backgroundColor:"#FFC0CB",
    borderRadius:RFValue(78),
    justifyContent:"center",
    alignItems:"center",
    border:"dotted",
    marginBottom:35,
    width:RFValue(450)
   
  },
  qText:{
    fontFamily:"NatureBeauty",
    fontSize:RFValue(20),
    color:"#301934"
  },navigate:{
    backgroundColor:"#FAF085"
  },
  qImg:{
    width:250,
    height:150,
    resizeMode:"contain",
    borderRadius:60}
})
