import { doc, setDoc , getFirestore, getDoc, updateDoc} from 'firebase/firestore';
import { User } from 'firebase/auth';

import app from 'src/config/FirebaseConfig';
import AuthService from '../Auth/AuthService';
import { EmailSettingsDTO } from 'src/types/dto';



const db = getFirestore(app);

export default {

  setupEmailSettings: async (email:string , host:string , port:string , password:string ) => {

    const user:User | null = await AuthService.checkAuthState();

    if(!user) return false;


    const docRef = doc(db, 'email_accounts', user.uid);
        
    const _doc = await getDoc(docRef);

    if(!_doc.exists()){
            
      await setDoc( docRef , {
        email,
        host,
        port: +port,
        password,
        tls: true
      });

    }else{
      await updateDoc(docRef , {
        email,
        host,
        port: +port,
        password,
        tls: true
      });
    }
        

    return true;

  },

  importEmailSettings: async ():Promise<EmailSettingsDTO | null> => {
    const user:User | null = await AuthService.checkAuthState();

    if(!user) return null;

    const docRef = doc(db, 'email_accounts', user.uid);
        
    const _doc = await getDoc(docRef);

    if(!_doc.exists()){
      return null;
    }

    const out:EmailSettingsDTO = {
      email: _doc.data().email,
      host: _doc.data().host ,
      password: _doc.data().password,
      port: _doc.data().port,
      tls: _doc.data().tls
    };

    return out;

  },

};