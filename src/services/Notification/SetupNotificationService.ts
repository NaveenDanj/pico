import app from 'src/config/FirebaseConfig';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import AuthService from '../Auth/AuthService';
import { User } from 'firebase/auth';
import { arrayUnion, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import axios from 'axios';
const messaging = getMessaging(app);
const db = getFirestore(app);

export default {

  requestForToken : async () => {
    const token = await getToken(messaging, {vapidKey: 'BAmtDYaUo3KyCyBczIpHgl-b85BSFRL0hqSNyYtxZpRxd2Jtw-f8h9Aaelm34su15bcVOy61U-Tto445W8wWeos'});
    return token;
  },

  updateUserNotificationData : async (token:string) => {
    const user:User | null = await AuthService.checkAuthState();

    if(!user) return false;

    const userDocRef = doc(db , 'users' , user.uid );
    const userData = await getDoc(userDocRef);

    if(!userData) return false;
    if(!userData.exists) return false;
    if(!userData.data()) return false;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if(userData.data().FCMToken.indexOf(token) == -1){
      await updateDoc(userDocRef , {
        FCMToken: arrayUnion(token)
      });

    }

    return true;

  },

  onMessageListener : async () => {
    return new Promise((resolve) => {
      onMessage(messaging , (payload) => {
        resolve(payload);
      });
    });
  },

  testMessageSender: async () => {
    const user:User | null = await AuthService.checkAuthState();

    if(!user) return false;

    const idToken = await user.getIdToken();

    const res = await axios.get('https://us-central1-pico-cloud.cloudfunctions.net/sendToUser' , {
      headers : {
        authorization: idToken
      }
    });

    console.log('response => ' , res);

  }

};