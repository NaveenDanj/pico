import { DocumentChange, DocumentData, collection , doc, getDoc, getDocs, getFirestore, limit, query, where, updateDoc} from 'firebase/firestore';
import app from 'src/config/FirebaseConfig';
import AuthService from '../Auth/AuthService';
import { CallDTO } from 'src/types/dto';


const db = getFirestore(app);

export default {

  getUserCalls : async () => {

    const user = await AuthService.checkAuthState();

    if(!user) return {
      success : false,
      calls : []
    };

    const colRef = collection(db , 'global_call' , user.uid , 'calls');

    const q = query(colRef , limit(30));
    const querySnapshot = await getDocs(q);

    const out:CallDTO[] = [];

    for(let i = 0; i < querySnapshot.docs.length; i++){

      const d = querySnapshot.docs[i].data();

      const _data:CallDTO = {
        id: querySnapshot.docs[i].id,
        callerId: d.caller,
        calleeId: d.callee,
        callerPeerId: d.callerPeerId,
        calleePeerId: d.calleePeerId,
        timestamp: d.timestamp,
        answered: d.answered,
        dp: '',
        contactName: ''
      };

      if (user.uid == _data.callerId){
        const docRef = doc(db , 'users' , _data.calleeId);
        const data = (await getDoc(docRef)).data();

        const q = query(collection(db , 'contacts') , where('ownerId' , '==' , user.uid) , where('userUID' , '==' , _data.calleeId) );
        const res = await getDocs(q);
        const conatactData = res.docs[0].data();

        if(data){
          _data.dp = data.dp;
          _data.contactName = conatactData.contactName;
        } 
      }else{
        const docRef = doc(db , 'users' , _data.callerId);
        const data = (await getDoc(docRef)).data();

        const q = query(collection(db , 'contacts') , where('ownerId' , '==' , user.uid) , where('userUID' , '==' , _data.callerId) );
        const res = await getDocs(q);
        const conatactData = res.docs[0].data();


        if(data) {
          _data.dp = data.dp;
          _data.contactName = conatactData.contactName;
        } 
      }
      out.push(_data);
    }


    return {
      success: true,
      calls: out
    };

  },

  rejectCall : async (docRef: DocumentChange<DocumentData, DocumentData>) => {
    await updateDoc(docRef.doc.ref , {
      rejected: true
    });

    return true;

  }

};