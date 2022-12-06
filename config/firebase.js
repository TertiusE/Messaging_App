import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import Constants from 'expo-constants';

const firebase_config = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId
};

console.log(firebase_config)
const fireApp = initializeApp(firebase_config);
export default fireApp;