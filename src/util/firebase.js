import firebase from 'firebase/app'
import { firebaseConfig } from '../config/processEnv'
import 'firebase/firestore'
// import 'firebase/auth'
// import 'firebase/storage'

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const Timestamp = firebase.firestore.Timestamp

export {
  firebase as default,
  db,
  Timestamp,
}