import { collection, doc, getDocs, getFirestore, limit, orderBy, query } from "firebase/firestore";
import { GlobalInbox } from "src/types/dto";


import app from "src/config/FirebaseConfig";
const db = getFirestore(app);



export default {

    loadChatroomChats : async (chatroomId:string):Promise<GlobalInbox[]> => {

        const out:GlobalInbox[] = []

        const docRef = doc(db, 'chatrooms' , chatroomId);
        const colRef = collection(docRef, 'messages');

        const q = query(colRef, orderBy('timestamp', 'asc'), limit(30));
        const messages = await getDocs(q);

        for(let i = 0; i < messages.docs.length; i++ ){
            const m = messages.docs[i]
            
            const data:GlobalInbox = {
                message: m.data().message,
                timestamp: m.data().timestamp,
                fromUser: m.data().fromUser,
                chatroomId: m.data().chatroomId
            } 


            out.push(data)
        }

        return out
    }

}