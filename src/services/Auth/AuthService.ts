import { addDoc, collection, getDoc, getFirestore } from 'firebase/firestore';
import {User , signOut , getAuth , signInWithEmailAndPassword , onAuthStateChanged , createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { UserAdditionalData, UserData } from 'src/types/dto';
import app from 'src/config/FirebaseConfig';

const auth = getAuth(app);
const db = getFirestore(app);

export default {

  getCurrentUserToken: async (): Promise<string | null> => {
    if(!auth.currentUser) return null;
    return auth.currentUser.getIdToken();
  },

  login : async (email:string , password:string) => {
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
      const _userdata:UserData = _getUserData(userCredential.user);


      const userIfNull:UserData = {
        email: '',
        displayName: '',
        photoURL: '',
        uid: '',
        phoneNumber: ''
      };

      return {
        'success' : true,
        'user' : _getUserData(userCredential.user) == null ? userIfNull : _userdata,
        'error' : ''
      };
        
    }catch(err){
      return {
        'success' : false,
        'error' : err
      };
    }
  },

  checkAuthState : ():Promise<User | null> => {
    return new Promise( (resolve , reject ) => {
      onAuthStateChanged(auth, user => {
        if (user) {
          resolve(user);
        }else{
          reject(null);
        }
      });
    });
  },

  registerByEmailAndPassword : async (email:string , password:string , profileName:string) => {
    try{
      const user = await createUserWithEmailAndPassword(auth, email, password);
            
      const _data:UserData = {
        email : user.user.email,
        displayName : profileName,
        photoURL : '',
        uid : user.user.uid,
        phoneNumber : ''
      };

      const data:UserAdditionalData = {
        uid: user.user.uid,
        dp: '',
        FirstName: profileName.split(' ')[0],
        LastName: profileName.split(' ')[1],
        email: user.user.email,
        phoneNumer: '',
        about: '',
        blockedContact: [],
        addToGroups: false,
        readReceipt: false,
        archivedContact: [],
        disappearingmessages: false,
        created : new Date()
      };
            
      await setDoc( doc(db, 'users', user.user.uid) , data);

      const docRef = doc(db, 'global_inboxes', user.user.uid);
      const colRef = collection(docRef, 'data');

      await addDoc(colRef, {
        message: '',
        timestamp: new Date(),
        fromUser: '',
        fromMessage: ''
      });


      return {
        'success' : true,
        'user' : _data,
        'userAdditionalData' : data,
        'error' : ''
      };

    }catch(err){

      const userData:UserData = {
        email: '',
        displayName: '',
        photoURL: '',
        uid: '',
        phoneNumber: ''
      };

      const data:UserAdditionalData = {
        uid: '',
        dp: '',
        FirstName: '',
        LastName: '',
        email: null,
        phoneNumer: '',
        about: '',
        blockedContact: [],
        addToGroups: false,
        readReceipt: false,
        archivedContact: [],
        disappearingmessages: false,
        created: null
      };
            
      return {
        'success' : false,
        'error' : err,
        'user': userData,
        'userAdditionalData' : data
      };
        
    }
  },

  logout : async () => {

    return new Promise<boolean>( (resolve , reject) =>{
      signOut(auth).then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    });

  },

  getUserData : (user:User) => {
    return _getUserData(user);
  },

  getUserAdditionalData: async (user:User):Promise<UserAdditionalData | null> => {
    const ref = doc(db , 'users' , user.uid);
    const d = await getDoc(ref);

    if(!d.exists()){
      return null;
    }
        
    const data:UserAdditionalData = {
      uid: user.uid,
      dp: d.data().dp,
      FirstName: d.data().FirstName,
      LastName: d.data().LastName,
      email: d.data().email,
      phoneNumer: d.data().phoneNumer,
      about:  d.data().about,
      blockedContact: d.data().blockedContact,
      addToGroups: d.data().addToGroups,
      readReceipt: d.data().readReceipt,
      archivedContact: d.data().archivedContact,
      disappearingmessages: d.data().disappearingmessages,
      created:  d.data().created
    };

    return data;

  },

  _getUserAdditionalData: async () => {
    const user = auth.currentUser;
    if(!user) return null;

    const ref = doc(db , 'users' , user.uid);
    const d = await getDoc(ref);

    if(!d.exists()){
      return null;
    }
        
    const data = d.data() as UserAdditionalData;
    return data;
  }

};
function _getUserData(user:User) {
  const data = {
    email : user.email == null ? '' : user.email,
    displayName : '',
    photoURL : '',
    uid : user.uid,
    phoneNumber : ''
  };

  return data;
}