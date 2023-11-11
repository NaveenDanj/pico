import { getFirestore } from "firebase/firestore";
import {User , signOut , getAuth , signInWithEmailAndPassword , onAuthStateChanged , createUserWithEmailAndPassword  } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { UserData } from "src/types/dto";
import app from "src/config/FirebaseConfig";


const auth = getAuth(app);
const db = getFirestore(app);

export default {

    login : async (email:string , password:string) => {
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            
            const _userdata:UserData =  _getUserData(userCredential.user)


            const userIfNull:UserData = {
                email: "",
                displayName: "",
                photoURL: "",
                uid: "",
                phoneNumber: ""
            }

            return {
                "success" : true,
                "user" : _getUserData(userCredential.user) == null ? userIfNull : _userdata,
                "error" : ''
            }
        
        }catch(err){
            return {
                "success" : false,
                "error" : err
            }
        }
    },

    checkAuthState : () => {
        onAuthStateChanged(auth, (user) => {
            console.log('user is -> ' , user)
            if (user) {
              return user;
            } else {
              return null;
            }
        });
    },

    registerByEmailAndPassword : async (email:string , password:string , profileName:string) => {
        try{
            const user = await createUserWithEmailAndPassword(auth, email, password)
            
            const data = {
                email : user.user.email,
                displayName : profileName,
                photoURL : "",
                uid : user.user.uid,
                phoneNumber : ""
            }
            
            const docRef = await setDoc( doc(db, "users", user.user.uid) , data);
            
            return {
                "success" : true,
                "user" : docRef,
                "error" : ''
            }

        }catch(err){
            
            return {
                "success" : false,
                "error" : err
            }
        
        }
    },

    logout : async () => {

        return new Promise<boolean>( (resolve , reject) =>{
            signOut(auth).then(() => {
                resolve(true)
            }).catch(() => {
                reject(false)
            });
        })

    },

    getUserData : (user:User) => {
        return _getUserData(user)
    }

}
function _getUserData(user:User) {
    const data = {
        email : user.email == null ? '' : user.email,
        displayName : '',
        photoURL : "",
        uid : user.uid,
        phoneNumber : ""
    }

    return data
}