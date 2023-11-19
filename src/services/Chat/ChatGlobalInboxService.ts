import { addDoc, collection, doc, getFirestore , onSnapshot  } from "firebase/firestore";

import app from "src/config/FirebaseConfig";
import { GlobalInbox, Message } from "src/types/dto";
import AuthService from "../Auth/AuthService";
import { User } from "firebase/auth";
const db = getFirestore(app);

export default {

    listenForIncomingMessages : async (uid:string) => {

        const docRef = doc(db, 'global_inboxes', uid);
        const colRef = collection(docRef, 'data');

        onSnapshot(colRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const data = change.doc.data();
                    console.log('Data updated:', data);
                }
            });
        });

    },

    sendToGlobalIndex : async (message:Message , to:string) => {

        const user:User | null = await AuthService.checkAuthState()

        if (!user){
            return false
        }

        const docRef = doc(db, 'global_inboxes', to);
        const colRef = collection(docRef, 'data');

        const data:GlobalInbox = {
            message: message,
            timestamp: new Date(),
            fromUser: user.uid
        }

        await addDoc(colRef, data)

        return true
    }


}