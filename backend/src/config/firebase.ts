import admin from 'firebase-admin';
import * as serviceAccount from '../config/FireBaseServiceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const firebaseAdmin = admin;