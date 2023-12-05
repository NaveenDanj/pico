import { addDoc, collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { User } from "firebase/auth";
import app from "src/config/FirebaseConfig";
import { SignalData, SignalDataDTO } from "src/types/dto";
import AuthService from "../Auth/AuthService";
import SimplePeer from 'simple-peer';


const db = getFirestore(app);

export default {

    initiateCall : async (data:SignalData , toId:string) => {

        const user:User | null = await AuthService.checkAuthState()

        if(!user) return false

        if(user.uid == toId) return false

        const docRef = doc(db, 'global_call', toId);
        const colRef = collection(docRef, 'signals');

        const _data:SignalDataDTO = {
            signalData: data,
            fromUserId: user.uid,
            toUserId: toId
        }

        await addDoc(colRef, _data)

        return true

    },

    listenForCalls: async (setPeer:React.Dispatch<React.SetStateAction<SimplePeer.Instance[]>>) => {

        const user:User | null = await AuthService.checkAuthState()

        if(!user) return false

        const docRef = doc(db, 'global_call', user.uid);
        const colRef = collection(docRef, 'signals');

        onSnapshot(colRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const data = change.doc.data();
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    setPeer(data)
                    console.log(data)
                }
            });
        });

    }


}