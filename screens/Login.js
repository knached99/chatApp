import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, KeyboardAvoidingView} from 'react-native';
import { Button, Input, Image } from "react-native-elements";
import {StatusBar} from "expo-status-bar";
import { auth } from '../firebase';
const Login = ({navigation}) => {
    //Map user input to a piece of state
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            console.log(authUser);
            if(authUser){
                // If authenticated, push user to home page 
                // navigation.replace prevents 
                // User from going back to login page 
                navigation.replace('Home');
            }
        });
        // If component unsubscribes,
        //it will allow the remount 
        return unsubscribe; 
        // Unsubscribe is a cleaning function 
        // Used for keeping performance optimal
    }, []);
    const signIn =()=>{
        auth.signInWithEmailAndPassword(email, password).catch(error=>alert(error));
    }
    return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
            <StatusBar style="light"/>
            <Image 
            source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_5SLyp7tY6E7DkflcT19fzcMT18R1VEhVKe7NrWp1tZ93FvZ_IU-trjhm5_2BCM2-88Q&usqp=CAU',
            }}
            style={{width: 80, height: 80, marginTop: 10, marginBottom: 10}}
            />
            
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autofocus type="Email" value={email} onChangeText={text=> setEmail(text)}/>

                <Input placeholder="Password" autofocus type="password" secureTextEntry value={password} onChangeText={text=> setPassword(text)} onSubmitEditing={signIn}/>
            </View>
            <Button title="Login" containerStyle={styles.button} onPress={signIn}/> 
            <Button title="Create Account" containerStyle={styles.button} type="outline" 
            onPress={()=> navigation.navigate('Register')}
            />
            <View style={{height: 100}}></View>
        </KeyboardAvoidingView>
    )
}
const styles= StyleSheet.create({
container:{
 flex: 1, 
 alignItems: 'center',
 justifyContent: 'center',
 padding: 10,
 backgroundColor: '#fff'
},
inputContainer:{
    width: 300
 },
 button:{
   width: 200, 
   marginTop: 10  
 }
})

export default Login
