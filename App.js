//import 'react-native-gesture-handler'; <-- this does not work anymore due to updates with the library
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import AddChat from "./screens/AddChat";
import Chat from "./screens/Chat";
import {createStackNavigator} from "@react-navigation/stack";
//Create initial stack to hold the stack for navigation 
const Stack = createStackNavigator(); 
// Create global object to hold styling for all screens
const globalScreenOptions = {
  headerStyle: {backgroundColor: '#2C6BED'},
  headerTitleStyle: {color: '#fff'},
  headerTintColor: '#fff', 
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen name='Login' component={Login}/>       
      <Stack.Screen name="Register" component={Register}/>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddChat" component={AddChat} />
      <Stack.Screen name="Chat" component={Chat} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 
