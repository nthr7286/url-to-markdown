import firebase from 'firebase/app'
import { firebaseConfig } from '../config/processEnv'
// import 'firebase/firestore'
// import 'firebase/auth'
// import 'firebase/storage'

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export {
  firebase as default
}