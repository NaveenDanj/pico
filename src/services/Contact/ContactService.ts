// import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore"; 
import app from "src/config/FirebaseConfig";
import { Contact } from "src/types/dto";
import AuthService from "../Auth/AuthService";

// const auth = getAuth(app);
const db = getFirestore(app);

export default {
    
    createContact: async (contactEmail: string, contactName: string) => {

        const ownerUser = await AuthService.checkAuthState()

        if(ownerUser == null) return {
            success : false,
            message : 'Unauthorized'
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const uid = ownerUser.uid;
        

        const userRef = collection(db, "users");
        const q1 = query(userRef, where("email", "==", contactEmail));
        const user = await getDocs(q1);

        if (user.empty) {
            return {
                success: false,
                message: 'User does not have an valid PICO account'
            };
        }

        let foundUser = null;
        user.forEach((doc) => {
            foundUser = doc.data()
        });

        if(!foundUser) return {
            success: false,
            message: 'User does not have an valid PICO account'
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (uid == foundUser.uid) return {
            success : false,
            message : 'Cannot add yourself to the contact list'
        }

        const ref = collection(db, "contacts");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const q = query(ref, where("ownerId", "==", uid ), where('userUID', '==', foundUser.uid ));
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
        }

        await addDoc( collection(db, "contacts") , data);

        return {
            success : true,
            message : "New contact added successfully."
        }

    },

    shareContact: async() => {
        return false
    },

    blockContact: async (contactId:string ) => {
        
        const user = await AuthService.checkAuthState()

        if (user == null) return false

        const docRef = doc(db, "contacts", contactId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return {
            success : false,
            message : "Contact details not found"
        }
        if (docSnap.data().blcoked) return {
            success : false,
            message : "Contact is already blocked"
        }

        await updateDoc(docRef, {
            blocked: true
        });

        return {
            success : true,
            message : "Contact blocked successfully"
        }

    }


}