import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase'
import db from '../config.js'

export default class LoginScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            username:'sheshasai@gmail.com',
            password:'shreyas2007',
        }
    }

    switchScreen = () => {
        this.props.navigation.navigate('TabNavigator');
    }

    render(){
        return(
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.inputView}>
                <TextInput 
                style={styles.inputBox}
                placeholder="Username"
                onChangeText={(text)=>{
                    this.setState({
                        username: text
                    })
                }}
                value={this.state.username}/>
                </View>

                <View style={styles.inputView}>
                <TextInput 
                secureTextEntry='true'
                style={styles.inputBox}
                placeholder="Password"
                onChangeText={(text)=>{
                    this.setState({
                        password: text
                    })
                }}
                value={this.state.password}/>
                </View>
                <TouchableOpacity
                style={styles.button}
                onPress={async ()=>{

                    if(this.state.password !== undefined && this.state.username !== undefined){                           
                        try{
                            const response = await firebase.auth().signInWithEmailAndPassword(this.state.username,this.state.password);
                            if(response !== undefined){
                              this.switchScreen();
                            }
                        }catch(error){

                          if(error.code === 'auth/user-not-found'){
                            alert('user does not exist');
                          }else if(error.code === 'auth/wrong-password'){
                            alert('Incorrect password');
                          }else if(error.code === 'auth/invalid-email'){
                            alert('Invalid email');
                          }
                            console.log(error);
                            console.log(error.code);
                        }
                    }else{
                        alert('Please enter username and password')
                    }
                    // alert('it is working till here');
                }}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    button:{
      backgroundColor: '#FBC02D',
      width: 100,
      height:50
    },
    buttonText:{
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight:"bold",
      color: 'white'
    },
  });