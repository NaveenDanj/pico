import * as functions from 'firebase-functions';
import admin = require('firebase-admin');
import { Request } from 'firebase-functions/v1/https';
import { Response } from 'firebase-functions/v1';
import Auth from './middlewares/Auth';
import * as cors from 'cors';
const corsHandler = cors({ origin: true });

admin.initializeApp();
const db = admin.firestore();

exports.sendToUser = functions.https.onRequest(async (req: Request, res: Response) => {

  corsHandler(req, res, async () => {

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // You can use your middleware here
    const _res = await Auth.authenticateUser(req);
    const body = req.body;
  
    if(!_res)return res.status(401).send('Unauthenticated!');
    if(_res == '') return res.status(401).send('Unauthenticated! - ' + _res);

    const userRef = db.collection('users').doc(_res);
    const dataDoc = await userRef.get();

    if(!dataDoc || !dataDoc.exists) return res.status(401).send('Document not founc! ' + _res);
    const data = dataDoc.data();
    if(!data) return res.status(401).send('Data not found!' + _res);

    const fcmTokens:string[] = data.FCMToken;

    for(let i = 0; i < fcmTokens.length; i++){

      const message = {
        notification: {
          title: body.title,
          body: body.body,
        },      
        token: fcmTokens[i],
      };
  
      await admin.messaging().send(message);
    
    }

    return res.status(200).send('success!');

  });
  
});
