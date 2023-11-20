import { addDoc, collection, doc, getFirestore , onSnapshot, updateDoc  } from "firebase/firestore";
import app from "src/config/FirebaseConfig";
import { GlobalInbox, Message } from "src/types/dto";
import AuthService from "../Auth/AuthService";
import { User } from "firebase/auth";
const db = getFirestore(app);
import { Dispatch } from "react";
import { UpdateLastMessageDTO, updateLastMessageData } from "src/store/slices/ChatroomSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { addMessage } from "src/store/slices/CurrentChatSlice";


export default {

    listenForIncomingMessages : async (uid:string , dispatch:Dispatch<AnyAction>) => {

        const docRef = doc(db, 'global_inboxes', uid);
        const colRef = collection(docRef, 'data');

        onSnapshot(colRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const data = change.doc.data();
                    // console.log('Data updated:', data);
                    const d:UpdateLastMessageDTO = {
                        chatroomId: data.chatroomId,
                        lastMessage: data.message,
                        lastTimeStamp: data.timestamp
                    }
                    data.message.sender = data.fromUser
                    dispatch(updateLastMessageData(d))
                    dispatch(addMessage(data.message))
                    
                }
            });
        });

    },

    sendToGlobalIndex : async (message:Message , to:string , chatroomId:string) => {

        const user:User | null = await AuthService.checkAuthState()

        if (!user){
            return false
        }

        const docRef = doc(db, 'global_inboxes', to);
        const colRef = collection(docRef, 'data');

        const data:GlobalInbox = {
            message: message,
            timestamp: new Date(),
            fromUser: user.uid,
            chatroomId: chatroomId
        }

        await addDoc(colRef, data)

        // send to sender's global inbox
        const sendersGlobalIndexRef = doc(db , 'global_inboxes' , user.uid)
        const colGlobalInbox = collection(sendersGlobalIndexRef, 'data');
        await addDoc(colGlobalInbox, data)

        // send the message to the chatroom
        const chatroomRef = doc(db, 'chatrooms', chatroomId);
        const msgRef = collection(chatroomRef, 'messages');
        await addDoc(msgRef, data)

        // update last message
        await updateDoc(chatroomRef, {
            lastMessage: message,
            lastTimeStamp: data.timestamp
        });


        return true
    }


}