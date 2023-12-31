import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {doc , updateDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore'; 
import app from 'src/config/FirebaseConfig';

// const auth = getAuth(app);
const db = getFirestore(app);


const storage = getStorage();

export default {
    
  updateDisplayPicture: async (file: File , uid:string): Promise<boolean> => {
    try {
            
      const timestamp = new Date().getTime();
      const uniqueFilename = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `displayPictures/${uniqueFilename}`);


      await uploadBytes(storageRef, file);
        
      const downloadURL = await getDownloadURL(storageRef);
            
      // update aditional data field
      const documentRef = doc(db, 'users', uid);
      await updateDoc(documentRef, {
        dp : downloadURL
      });

      return true;

    } catch (error) {
      console.error('Error uploading image:', error);
      return false;
    }
  },

  updateDisplayName: async (fname:string , lname:string , uid:string): Promise<boolean> => {
    try {
            
      // update aditional data field
      const documentRef = doc(db, 'users', uid);
      await updateDoc(documentRef, {
        FirstName : fname,
        LastName: lname
      });

      return true;

    } catch (error) {
      console.error('Error uploading image:', error);
      return false;
    }
  },

  updateAbout: async (about:string , uid:string): Promise<boolean> => {
    try {
            
      // update aditional data field
      const documentRef = doc(db, 'users', uid);
      await updateDoc(documentRef, {
        about : about
      });

      return true;

    } catch (error) {
      console.error('Error uploading image:', error);
      return false;
    }
  },

    
};