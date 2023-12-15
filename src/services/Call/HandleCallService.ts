import { addDoc, collection , doc, getFirestore, updateDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import app from 'src/config/FirebaseConfig';
import AuthService from '../Auth/AuthService';
import { CallDTO } from 'src/types/dto';


const db = getFirestore(app);

export default {


  addCall: async (toId:string , peerId:string) => {

    const user:User | null = await AuthService.checkAuthState();

    if(!user) return false;

    if(user.uid == toId) return false;

    const docRef = collection(db, 'global_call', toId, 'calls');

    const callData:CallDTO = {
      callerId: user.uid,
      calleeId: toId,
      callerPeerId: peerId,
      calleePeerId: null,
      timestamp: new Date(),
      answered: false,
      duration: 0
    };

    const _doc = await addDoc(docRef , callData);

    return _doc;

  },

  updateCallFromCalleeSide: async (toId:string , docId:string , peerId:string) => {

    const docRef = doc(db , 'global_call' , toId , 'calls' , docId);

    await updateDoc(docRef , {
      calleePeerId : peerId
    });

  }

};