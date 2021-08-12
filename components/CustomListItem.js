import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {ListItem, Avatar} from "react-native-elements";
import {db} from "../firebase"
const customListItem = ({id, chatName, enterChat}) => {
const [chatmessages, setChatMessages] = useState([]);
useEffect(()=>{
 const unsubscribe = db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc')
 .onSnapshot((snapshot)=>
   setChatMessages(snapshot.docs.map((doc)=>doc.data()))
 );
    return unsubscribe
});    
    return (
        <ListItem onPress={()=>enterChat(id, chatName)}key={id} bottomDivider> 
            <Avatar 
              rounded 
              source ={{

                    uri: chatmessages?.[0]?.photoURL ||  "data:image/png;base64,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"
              }}
            />
        <ListItem.Content>
         <ListItem.Title style={{fontWeight: '800'}}>
            {chatName}
         </ListItem.Title>
         <ListItem.Subtitle numberOfLines={1}
         ellipsizeMode="tail"
         >
        {chatmessages?.[0]?.displayName}:{chatmessages?.[0]?.message}
         </ListItem.Subtitle>
        </ListItem.Content>
        </ListItem>
    )
}

export default customListItem;

const styles = StyleSheet.create({})
