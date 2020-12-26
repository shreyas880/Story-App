import React from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet , KeyboardAvoidingView , ToastAndroid } from 'react-native';
import firebase from 'firebase';
import db from '../config';



export default class WriteScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            author:'',
            title:'',
            content:'',
            submitClicked:'normal',
            authorAge:''
        }
    }

    publishStory(){
    
            db.collection('story').add({
                'content':this.state.content,
                'author':this.state.author,
                'title':this.state.title
            })
        }

    render(){
        if(this.state.submitClicked === 'clicked'){
            return(
                <View style={styles.container}>
                    <Text style={styles.text}>Your story has been submitted!</Text>
                    <TouchableOpacity style={styles.TO} 
                    onPress={() => {

                        this.publishStory();
                        
                        this.setState({
                            author:'',
                            submitClicked:'normal',
                            authorAge:''
                        })
                    }}>
                        <Text style={[styles.text,{color:'white'},{textAlign:'center'}]}>Write another Story</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.TO} 
                    onPress={() => {

                        this.setState({
                            submitClicked:'normal'
                        })
                    }}>
                        <Text style={[styles.text,{color:'white'},{textAlign:'center'}]}>Continue the same story</Text>
                    </TouchableOpacity>
                </View>
            );
        }else{
            return(
                <KeyboardAvoidingView style={styles.container}>
                    <View>
                        <Text style={styles.text}>Write a story</Text>

                        <TextInput multiline = {true}
                        style={[styles.inputBox,{height:40}]}
                        onChangeText={text => {
                            this.setState({
                                authorAge: text 
                            });
                        }}
                        placeholder="Please enter your age"
                        value={this.state.authorAge}
                        />

                        <TextInput multiline = {true}
                        style={[styles.inputBox,{height:40}]}
                        onChangeText={text => {
                            this.setState({ author: text });
                        }}
                        placeholder="Author of the story"
                        value={this.state.author}
                        />

                        <TextInput multiline = {true}
                        style={[styles.inputBox,{height:40}]}
                        onChangeText={text => {
                            this.setState({ title: text });
                        }}
                        placeholder="Title of the story"
                        value={this.state.title}
                        />

                        <TextInput multiline = {true}
                        style={[styles.inputBox,{height:300}]}
                        onChangeText={text => {
                            this.setState({ content: text });
                        }}
                        placeholder="Content of the story"
                        value={this.state.content}
                        />

                        <TouchableOpacity style={styles.TO} 
                        onPress={() => {
                            if(this.state.author === '' && this.state.title === '' && this.state.content === ''){
                                alert('You have not entered any details for your story!');
                            }else if(this.state.author === ''){
                                alert("You have not given the author's name!Please try again.");
                            }else if(this.state.title === ''){
                                alert("You have not given your story a title!Please try again.");
                            }else if(this.state.content === ''){
                                alert("There is no content in your story!Please try again.");
                            }else{        
                                this.setState({
                                    submitClicked:'clicked'
                                });
                            }
                        }}>
                            <Text style={[styles.text,{color:'white'},{textAlign:'center'}]}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            );
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'cyan',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputBox: {
        marginTop:30,
        width:'100%',
        marginLeft:0,
        textAlign:'left',
        borderWidth: 3,
        fontSize:24,
        fontWeight:'bold',
        borderRadius:10
    },
    text:{
        fontWeight:'bold',
        fontSize:32
      },
      inputBoxText:{
        fontSize:22
      },
      TO:{
        marginTop:50,
        borderRadius:25,
        borderWidth:3,
        backgroundColor:'red',
        alignContent:'center',
        alignSelf:'center',
        width:300
      }
  });