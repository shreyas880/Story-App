import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginScreen from './screens/loginScreen';
import WriteScreen from './screens/writeStory';
import SearchScreen from './screens/readStory';
import StoryReadScreen from './screens/storyReadScreen';
import Searchscreen from './screens/readStory';

export default class App extends React.Component {
  render(){
    return (
      
        <AppContainer />
      
    );
  }
}

  const TabNavigator = createBottomTabNavigator({
  Write: {screen: WriteScreen},
  Read: {screen: SwitchNavigator},
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      console.log(routeName)
      if(routeName === "Write"){
        return(
          <Image
          source={require("./assets/write.png")}
          style={{width:40, height:30}}
        />
        )
        
      }
      else if(routeName === "Read"){
        return(
          <Image
          source={require("./assets/read.png")}
          style={{width:40, height:30}}
        />)
        
      }
    }
  })
}
);


  const SwitchNavigator = createSwitchNavigator({
    Login:{
      screen:LoginScreen
    },
    TabNavigator:{
      screen:TabNavigator
    }
  });





const AppContainer =  createAppContainer(SwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
