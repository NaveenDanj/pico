import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import AuthService from '../Auth/AuthService';
import { User } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

import app from 'src/config/FirebaseConfig';
import { Attachment } from 'src/types/dto';
const db = getFirestore(app);

export default {
    
  uploadFile: async (file:File) => {

    const user:User | null = await AuthService.checkAuthState();

    if(!user) return {
      success : false,
      link: '',
      doc: null
    };

    try{

      const storage = getStorage();
      const timestamp = new Date().getTime();
      const uniqueFilename = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `attachments/${uniqueFilename}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      const extension_list = uniqueFilename.split('.');
      const extension = extension_list[extension_list.length-1];
  
      const colRef = collection(db , 'attachments');
      const data_doc:Attachment = {
        user: user.uid,
        timestamp: new Date(),
        originalFileName: file.name,
        fileName: uniqueFilename,
        fileSize: file.size,
        type: file.type,
        messageId: null,
        chatRoomId: null,
        url: downloadURL,
        extension: extension
      };

      const docRef = await addDoc(colRef , data_doc);
  
      return {
        success : true,
        link: downloadURL,
        doc: docRef
      };

    }catch(err){
      return {
        success : false,
        link: '',
        doc: null
      };

    }


  }


};