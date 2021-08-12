import { StatusBar } from 'expo-status-bar';
import React, {useState, useLayoutEffect} from 'react'
import { StyleSheet, View } from 'react-native'
import {Button, Input,Text, Image} from "react-native-elements";
import {KeyboardAvoidingView} from "react-native";
import {auth} from "../firebase"; 
const Register = ({navigation}) => {
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[imageUrl, setImageUrl] = useState("");
    useLayoutEffect(()=> {
        navigation.setOptions({
            headerBackTitle: 'back to login'
        });
    
    },
    [navigation]);
    const register=()=>{
        //useLayoutEffect works 
        //similarly to useEffect
        // When doing navigation, it will be before the paint
        // As opposed to before the render with useEffect
        auth 
        .createUserWithEmailAndPassword(email, password)
        .then((authUser)=>{
            // .then authUser returns 
            //back the authenticated user object
                authUser.user.updateProfile({
                displayName: name,
                // imageUrl ||
                // Means if an image was not provided
                // Use default placeholder image 
                photoURL: imageUrl || "https://pics.freeicons.io/uploads/icons/png/19339625881548233621-512.png"
            });
        })
        .catch((error)=> alert(error.message));
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image 
            source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_5SLyp7tY6E7DkflcT19fzcMT18R1VEhVKe7NrWp1tZ93FvZ_IU-trjhm5_2BCM2-88Q&usqp=CAU',
            }}
            style={{width: 80, height: 80, marginTop: 10, marginBottom: 10}}
            />
            <View style={styles.inputContainer}>
            <Input placeholder="Full Name" autofocus type="text" value={name} onChangeText={text=>setName(text)}/>
            <Input placeholder="Email"  type="email" value={email} onChangeText={text=>setEmail(text)}/>
            <Input placeholder="Password"  secureTextEntry   type="text" value={password} onChangeText={text=>setPassword(text)}/>
            <Input placeholder="Profile Picture URL (optional)"  type="text" value={imageUrl} onChangeText={text=>setImageUrl(text)}
             onSubmitEditing={register}
            />

            </View>
            <Button 
            onPress={register}
             title="Register"
             raised
             containerStyle={styles.button}
            />
            <View style={{height: 100}}></View>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
container:{
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff'
},
button:{
 width: 200,
 marginTop: 10   
},
inputContainer:{
    width: 300
},
title:{
    marginBottom: 50,
    fontWeight: 'bold'
}
});
