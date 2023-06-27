//selet picture function it requests the permission to access the media liberary
//if the permission is granted then it automatically launch the ImagePicker.
   //{image ..}  it is a javascript conditional rendering statement and this expression xhecks whether the image variable is tue or not.if that is true then the code is rendered with the specified source and style.

// The ?. is called the Optional Chaining operator, introduced in JavaScript ES2020. 
// Instead of directly accessing a property like obj.property, you can use obj?.property.
// If obj is nullish (null or undefined), the expression evaluates to undefined instead of throwing an error.
// If obj is not nullish, it behaves as usual and returns the value of the property.



import React from 'react';
import { 
StyleSheet, 
View, 
Image,
 TouchableOpacity,
 Text ,
 TextInput,
 ScrollView,
 Platform,

 StatusBar,
 SafeAreaView} from 'react-native';
 import { DrawerActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import firebase from "firebase";
let customFont={
  "NatureBeauty":require("../assets/font/NatureBeauty.ttf")
}
export default class App extends React.Component {
  state = {
    image: null,
    fontLoaded:"false",
    topic:" ",
    quote:" ",
    author:" ",
    count:0,
    topics: {},
    name:''
  };

   async loadFont(){
    await Font.loadAsync(customFont);
    this.setState({fontLoaded:"true"})
  }
  componentDidMount(){
    this.loadFont();
    this.userAdd()
  }
  selectPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to pick an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
//the user can select an image from the gallery and if it is not canceled automatically we are displaying the image and trickering the re render to 
    if (!result.canceled) {
      this.setState({ image: result.uri });
    }
  };
   async userAdd(){
let theme, name, image;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
        name = snapshot.val().first_name+snapshot.val().second_name ;
      });
    this.setState({
      light_theme: theme === "light" ? true : false,
      isEnabled: theme === "light" ? false : true,
      name: name,
       
    });
    console.log(this.state.name)
  }
  async add() {
  if (this.state.topic && this.state.quote && this.state.author) {
    const topic = this.state.topic.toLowerCase();
    const count = this.state.topics[topic]?.count || 0; //expalnation written on the top
    const name =this.state.name
   this.setState((prevState) => ({
      topics: {
        ...prevState.topics,
        [topic]: {
          count: count + 1, // Increment the count for the topic
        },
      },
    }));
    const data = {
      author: this.state.author,
      quote: this.state.quote,
      added_on: new Date(),
      likes: 0,
      image:this.state.image
    };

    await firebase
      .database()
      .ref(`/topics/${topic}/quote ${count}/`)
      .set(data)
      .then(function (snapshot) {});

    Alert.alert("Quote Published");
    alert("Quote Published");
  } else {
    Alert.alert(
      "Error",
      "All fields are required!",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }
}

  render() {
    const { image } = this.state;
if(!this.state.fontLoaded){
  return <AppLoading/>
}else{
    return (
      <View style={styles.container}>
      
          <SafeAreaView style={styles.droidSafeArea} />
 <ScrollView>
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
      <Text style={styles.titleText}> Add Quote</Text>
      </View>

      <View style={{flex:0.89,alignItems:"center",marginTop:RFValue(80)}}>
   
             {image && <Image source={{ uri: image }} style={styles.image} />}
        <TouchableOpacity onPress={this.selectPicture} style={styles.butImage}>
          <Text style={styles.butext}>Pick Image</Text>
        </TouchableOpacity>
        
        <View>
         <TextInput
        onChangeText={(topic) => this.setState({ topic:topic.toLowerCase() })}
                      placeholder={"Topic(eg.Courage)"}
               
       style={
         styles.input
       }
        />
        <TextInput
        onChangeText={(quote) => this.setState({ quote:quote })}
                      placeholder={"Quote"}
                      multiline={true}
                      numberOfLines={4}
               
       style={
             styles.input
       }
        />
          <TextInput
        onChangeText={(author) => this.setState({ author:author })}
                      placeholder={"Author"}
                      multiline={true}
                      numberOfLines={4}
               
       style={
             styles.input
       }
        />
       
        <TouchableOpacity
        style={styles.button}
        onPress={()=>{this.add()}}
        >
        <Text style={styles.buttonText}>
        Submit
        </Text>
        </TouchableOpacity>
      </View>

        </View>
        </ScrollView>  
      </View>
    );
}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#301934"
  },
  image: {
    width: RFValue(300),
    height:RFValue(300),
    resizeMode: 'contain',
    top:-70,
    marginBottom:RFValue(-120),
    marginTop:-40
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
    width: 80,
    height:80,
    resizeMode:"contain",
  },
  butImage:{
      backgroundColor:"#F6E7E1",
    width:RFValue(150),
    height:RFValue(50),
    justifyContent:"center",
    alignItems:"center",
    borderRadius:RFValue(50),

  },
    input:{
    backgroundColor:"#FAF085",
    width:RFValue(250),
    height:RFValue(40),
    borderRadius:RFValue(80),
    paddingLeft:20,
    fontSize:RFValue(30),
    fontFamily:"NatureBeauty",
    marginTop:RFValue(20)
  },
   buttonText:{
    color:"#301934",
    fontFamily:"NatureBeauty",
    fontSize:RFValue(30)
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  button:{
    backgroundColor:"#F6E7E1",
    marginTop:RFValue(20),
    height:RFValue(50),
    alignItems:"center",
    justifyContent:"center",
    borderRadius:RFValue(80),
    width:RFValue(150),
    marginLeft:RFValue(50)
  },
  butext:{
      color:"#301934",
    fontFamily:"NatureBeauty",
    fontSize:RFValue(20)
  },
  
});