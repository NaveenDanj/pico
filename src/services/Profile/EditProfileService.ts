import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

export default {
    
    updateDisplayPicture: async (file: File): Promise<string | null> => {
        try {
            
            const timestamp = new Date().getTime();
            const uniqueFilename = `${timestamp}_${file.name}`;
            const storageRef = ref(storage, `displayPictures/${uniqueFilename}`);


            await uploadBytes(storageRef, file);
        
            const downloadURL = await getDownloadURL(storageRef);
            
            // update aditional data field
            
            
            return downloadURL;




        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    },
    
}