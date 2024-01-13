import admin = require('firebase-admin');
import { Request } from 'firebase-functions/v1/https';



export default {

  authenticateUser : async (req:Request) => {
    const token = req.headers.authorization;
    if(!token) return '';
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken.uid;
    } catch (error) {
      return '';
    }
  }

};


