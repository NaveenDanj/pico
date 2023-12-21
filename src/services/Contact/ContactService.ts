// import { getAuth } from "firebase/auth";
import { addDoc, and, collection, doc, getDoc, getDocs, or, query, updateDoc, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore'; 
import app from 'src/config/FirebaseConfig';
import { ChatContact, ChatRoom, ChatRoomDTO, Contact } from 'src/types/dto';
import AuthService from '../Auth/AuthService';
import { User } from 'firebase/auth';

// const auth = getAuth(app);
const db = getFirestore(app);


interface loadChatroomDTO {
    success: boolean;
    chatRoom: ChatRoom | null;
}


export default {
    
  createContact: async (contactEmail: string, contactName: string) => {

    const ownerUser = await AuthService.checkAuthState();

    if(ownerUser == null) return {
      success : false,
      message : 'Unauthorized'
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const uid = ownerUser.uid;
        

    const userRef = collection(db, 'users');
    const q1 = query(userRef, where('email', '==', contactEmail));
    const user = await getDocs(q1);

    if (user.empty) {
      return {
        success: false,
        message: 'User does not have an valid PICO account'
      };
    }

    let foundUser = null;
    user.forEach((doc) => {
      foundUser = doc.data();
    });

    if(!foundUser) return {
      success: false,
      message: 'User does not have an valid PICO account'
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (uid == foundUser.uid) return {
      success : false,
      message : 'Cannot add yourself to the contact list'
    };

    const ref = collection(db, 'contacts');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const q = query(ref, where('ownerId', '==', uid ), where('userUID', '==', foundUser.uid ));
    const res = await getDocs(q);
    if (!res.empty) {
      return {
        success: false,
        message: 'This contact already added to your account'
      };
    }

    const data:Contact = {
      ownerId: uid,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      userUID: foundUser.uid,
      contactName: contactName,
      blocked: false
    };

    await addDoc( collection(db, 'contacts') , data);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resCheck = await loadChatroomFromContact(foundUser.uid);
        
    if(!resCheck.success){
            
      await addDoc( collection(db, 'chatrooms') , {
        user1 : uid,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        user2 : foundUser.uid,
        lastMessage: '',
        lastTimeStamp: new Date()
      });

    }

    return {
      success : true,
      message : 'New contact added successfully.'
    };

  },

  shareContact: async() => {
    return false;
  },

  blockContact: async (contactId:string ) => {
        
    const user = await AuthService.checkAuthState();

    if (user == null) return false;

    const docRef = doc(db, 'contacts', contactId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return {
      success : false,
      message : 'Contact details not found'
    };
    if (docSnap.data().blcoked) return {
      success : false,
      message : 'Contact is already blocked'
    };

    await updateDoc(docRef, {
      blocked: true
    });

    return {
      success : true,
      message : 'Contact blocked successfully'
    };

  },

  loadUserContact: async () => {

    const user = await AuthService.checkAuthState();

    if (user == null) return {
      success: false,
      contacts : [] as ChatRoomDTO[]
    };

    const ref = collection(db, 'contacts');
    const q = query(ref, where('ownerId', '==', user.uid ) , where('blocked' , '==' , false));
    const res = await getDocs(q);

    if (res.empty) {
      return {
        success: true,
        contacts : [] as ChatRoomDTO[]
      };
    }

    const out:ChatRoomDTO[] = [];

    const ress = res;
    for (let i = 0; i < ress.docs.length; i++){
      const dd = ress.docs[i];
      const d = dd.data();

      console.log('d is => ' , d.dp);

      const contacts:ChatContact = {
        ownerId: d.ownerId,
        userUID: d.userUID,
        contactName: d.contactName,
        blocked: d.blocked,
        dp: d.dp
      };

      const res = await loadChatroomFromContact(d.userUID);
      if(res.success && res.chatRoom != null){
        out.push({
          uid: res.chatRoom.uid,
          contats: contacts,
          lastMessage: res.chatRoom.lastMessage,
          lastTimeStamp: res.chatRoom.lastTimeStamp
        });
      }

    }

        
    for(let i = 0; i < out.length; i++){

      const docRef = doc(db, 'users', out[i].contats.userUID);
      const userSnap = await getDoc(docRef);
      let dp = '';
    
      if (userSnap.exists()){
        dp = userSnap.data().dp;
      }

      out[i].contats.dp = dp;

    }
        
    return {
      success: true,
      contacts : out
    };

  },

  loadChatroomFromContact: async(userId:string):Promise<loadChatroomDTO> => {

    const user:User | null = await AuthService.checkAuthState();

    if (!user){
      return {
        success : false,
        chatRoom : null
      };
    }

    const ref = collection(db, 'chatrooms');
    const q = query(ref, 
      or(
        and( where('user1', '==', userId ) , where('user2' , '==' , user.uid) ),
        and( where('user2', '==', userId ) , where('user1' , '==' , user.uid) )
      )
    );

    const res = await getDocs(q);

    res.forEach((doc) => {
            
      const data:ChatRoom = {
        uid: doc.id,
        user1: doc.data().user1,
        user2: doc.data().user2,
        lastMessage: doc.data().lastMessage,
        lastTimeStamp: doc.data().lastTimeStamp
      };

      console.log('data is : ' , data);

      return {
        success : true,
        chatRoom : data
      };

    });

    return {
      success : false,
      chatRoom : null
    };

  }

};

async function loadChatroomFromContact(userId: string):Promise<loadChatroomDTO> {
  const user:User | null = await AuthService.checkAuthState();

  if (!user){
    return {
      success : false,
      chatRoom : null
    };
  }

  const ref = collection(db, 'chatrooms');
  const q = query(ref, 
    or(
      and( where('user1', '==', userId ) , where('user2' , '==' , user.uid) ),
      and( where('user2', '==', userId ) , where('user1' , '==' , user.uid) )
    )
  );
    
    
  const res = await getDocs(q);

  const doc = res.docs[0];

  if (!doc){
    return {
      success : false,
      chatRoom : null
    };
  }

  const data:ChatRoom = {
    uid: doc.id,
    user1: doc.data().user1,
    user2: doc.data().user2,
    lastMessage: doc.data().lastMessage,
    lastTimeStamp: doc.data().lastTimeStamp
  };

  return {
    success : true,
    chatRoom : data
  };


}
