import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import db from '../config';
import * as firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import ReadStory from './storyReadScreen';


export default class Searchscreen extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        allStories: [],
        lastVisibleStory: null,
        search:'sheshasai@gmail.com',
        searchType:'',
        searchTypeButtonPressed:false,
        searchedStoryMounted: false,
        searchStoryButtonPressed:false
      }
    }
    

    switchScreen(){
      this.props.navigation.navigate('StoryReadScreen');
    }

    fetchMorestories = async () => {
      var text = this.state.searchType.toUpperCase()
      var searchText = this.state.search;
      var enteredText = text.split("")


      
    if(enteredText[0].toUpperCase() === 'T'){
      const query = await db.collection('story').where('title','==',searchText).startAfter(this.state.lastVsibleStory).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allStories: [...this.state.allStories, doc.data()],
          lastVsibleStory: doc
        })
      })
    }else if(enteredText[0].toUpperCase() === 'A'){
        const query = await db.collection('story').where('author','==',searchText).startAfter(this.state.lastVsibleStory).limit(10).get()
        query.docs.map((doc)=>{
          this.setState({
            allStories: [...this.state.allStories, doc.data()],
            lastVsibleStory: doc
          })
        })
      }
  }

    searchStories= async(text) =>{
      var enteredText = text.split("")  
      var searchText = this.state.search;

      alert(searchText);

      alert(enteredText);

      if(enteredText[0].toUpperCase() === 'T'){
        alert('it is T');
        const story =  await db.collection('story').where('title','==',searchText).get()
        story.docs.map((doc)=>{
          this.setState({
            allStories:[...this.state.allStories,doc.data()],
            lastVsibleStory: doc,
            author:doc.author,
            content:doc.content,
            title:doc.title
          })
        })
      }else if(enteredText[0].toUpperCase() === 'A'){
        alert('it is A');
        const story = await db.collection('story').where('author','==',searchText).get()

        // alert(this.state.allStories);
        

        story.docs.map((doc)=>{
          // alert(this.state.allStories);
          // console.log(this.state.allStories);


          alert(doc.data());
          console.log(doc.data());
          
          console.log(doc.data().author);
          console.log(doc.data().content);
          console.log(doc.data().title);

          // console.log(this.state.author);
          // console.log(this.state.content);
          // console.log(this.state.title);

          this.setState({
              allStories:[...this.state.allStories,doc.data()],
              lastVsibleStory: doc,
              author:doc.data().author,
              content:doc.data().content,
              title:doc.data().title,
              searchedStoryMounted:true
          });



          console.log(this.state.author);
          console.log(this.state.content);
          console.log(this.state.title);

          console.log(this.state.allStories);
          
        })
      }
    }

    componentDidMount = async ()=>{
      const query = await db.collection('story').limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allStories: [],
          lastVsibleStory: doc,
          searchTypeButtonPressed: false,
          searchedStoryMounted: false
        });
      })
    }
    render() {

      if(this.state.searchTypeButtonPressed === false){
        return(
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setState({
                  searchType:'Author',
                  searchTypeButtonPressed: true
                });
              }}>
              <Text style={[styles.text,{textAlign:'center'}]}>Search an Author</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setState({
                  searchType:'Title',
                  searchTypeButtonPressed: true
                });
              }}>
              <Text style={[styles.text,{textAlign:'center'}]}>Search the title of a story</Text>
            </TouchableOpacity>
          </View>
        )
      }else if(this.state.searchedStoryMounted === true){
        return (
          <View style={styles.container}>
            <View style={styles.searchBar}>
              <Text style={styles.text}></Text>
              <TextInput 
                style ={styles.bar}
                placeholder = "Enter Book Id or Student Id"
                onChangeText={(text)=>{this.setState({search:text})}}/>
              <TouchableOpacity
                style = {styles.searchButton}
                onPress={()=>{this.searchStories(this.state.searchType)}}
              >
                <Text style={styles.text}>Search</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style = {styles.button}
              onPress={() => {
                this.setState({
                  searchStoryButtonPressed:true,
                  searchTypeButtonPressed:''
                })
              }}>
              <Text style={styles.text}>{this.state.title}</Text>
            </TouchableOpacity>
          </View>
        );
      }else if(this.state.searchStoryButtonPressed === true){
        return(
          <AppContainer/>
        );
      }else if(this.state.searchTypeButtonPressed === true){
        return (
          <View style={styles.container}>
            <View style={styles.searchBar}>
              <Text style={styles.text}></Text>
              <TextInput 
                style ={styles.bar}
                placeholder = {"Enter " + this.state.searchType}
                onChangeText={(text)=>{this.setState({search:text})}}/>
              <TouchableOpacity
                style = {styles.searchButton}
                onPress={()=>{this.searchStories(this.state.searchType)}}
              >
                <Text style={styles.text}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }else{
        return(
          <Text>Something went wrong try again!</Text>
        );
      }
    }
  }

  const SwitchNavigator = createSwitchNavigator({
    ReadStory:{
      screen:ReadStory
    },
    Searchscreen:{
      screen:Searchscreen
    },
  });

  const AppContainer =  createAppContainer(SwitchNavigator);




  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      backgroundColor:'black'
    },
    searchBar:{
      flexDirection:'row',
      height:50,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'black',
      fontWeight:'bold',
    },
    bar:{
      borderWidth:2,
      height:50,
      width:300,
      paddingLeft:10,
      color:'white'
    },
    searchButton:{
      borderWidth:1,
      height:50,
      width:100,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'lime',
      borderRadius:5,
    },
    text:{
      color:'white',
      fontWeight:'bold',
      fontSize:22
    },
    button: {
      marginLeft:65,
      width:'auto',
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:50,
      borderWidth:1,
      borderColor:'black',
      marginTop:50,
      backgroundColor:'red',
      borderColor:'black',
      borderWidth:3
    },
  });