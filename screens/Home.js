import React, {useLayoutEffect, useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Touchable } from 'react-native'
import {Avatar, ListItem} from "react-native-elements";
import CustomListItem from '../components/CustomListItem';
import {AntDesign, SimpleLineIcons} from "@expo/vector-icons";
import {auth, db} from "../firebase";
const Home = ({navigation}) => {
    const [chats, setChats]=useState([]);
    const signOutUser = ()=>{
        auth.signOut().then(()=>{
            navigation.replace('Login')
        });
    };
    useEffect(()=>{
        const unsubscribe = db.collection("chats").onSnapshot((snapshot)=>
         setChats(
             snapshot.docs.map((doc)=>({
                 id: doc.id, 
                 data: doc.data()
             }))
         )
        );
        return unsubscribe;
            }, []);
    // Customize Options by using useLayoutEffect
    useLayoutEffect(()=>{
     navigation.setOptions({
        title: "Chaat Chat",
        headerStyle: {backgroundColor: '#fff'},
        headerTitleStyle: {color: '#000'},
        headerTintColor: '#000',
        headerLeft: ()=>(
            <View style={{marginLeft: 20}}>
                <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                <Avatar 
                 rounded 
                 source={{uri: auth?.currentUser?.photoURL}}
                />
                </TouchableOpacity>
            </View>
           
        ),
        headerRight: ()=>(
            <View style={{
            flexDirection: "row",
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20

            }}>
                <TouchableOpacity activeOpacity={0.5}>
                    <AntDesign name="camerao" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate("AddChat")} activeOpacity={0.5}>
                <SimpleLineIcons name="pencil" size={24} color="black" />
                </TouchableOpacity>
            </View>
     ),
     });   
    }, [navigation]);
    // Create an enter chat function to navigate 
    // to next chat 
    // params are id and chat name 
    const enterChat =(id, chatName)=>{
        navigation.navigate('Chat', {
           id: id,
           chatName: chatName,  
        });
    }
    return (
        <SafeAreaView>
            <ScrollView>
            {chats.map(({id, data: {chatName}})=>(
                <CustomListItem key={id} id={id} chatName={chatName}
                enterChat ={enterChat}
                />
                // Passing in enterChat function as a prop
            ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container:{
        height: '100%'
    },
});
