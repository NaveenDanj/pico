import { collection, doc, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore';
import { GlobalInbox } from 'src/types/dto';
import app from 'src/config/FirebaseConfig';
const db = getFirestore(app);

export default {

  loadChatroomChats : async (chatroomId:string):Promise<GlobalInbox[]> => {

    const out:GlobalInbox[] = [];

    const docRef = doc(db, 'chatrooms' , chatroomId);
    const colRef = collection(docRef, 'messages');

    const q = query(colRef, orderBy('timestamp', 'desc'), limit(20));
    const messages = await getDocs(q);
    let arr = messages.docs;
    arr = arr.reverse();

    for(let i = 0; i < arr.length; i++ ){
      const m = arr[i];
      const data:GlobalInbox = {
        message: m.data().message,
        timestamp: m.data().timestamp,
        fromUser: m.data().fromUser,
        chatroomId: m.data().chatroomId
      }; 

      out.push(data);
    }

    return out;
  }

};