import { createStore, combineReducers, applyMiddleware } from 'redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import { composeWithDevTools } from "redux-devtools-extension"
import authReducer from '../../features/account/authReducer'
import thunk from 'redux-thunk'
import lessonReducer from '../../features/lessons/lessonReducer'
import { snackbarReducer } from 'material-ui-snackbar-redux'

//Experiment
import {getFirestore} from 'redux-firestore'
import {getFirebase} from 'react-redux-firebase'


// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',

  attachAuthIsReady: true,
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// initialize firebase instance with config from console
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSENGING
}

firebase.initializeApp(firebaseConfig)

// Initialize Firestore with timeshot settings
firebase.firestore().settings({ timestampsInSnapshots: true })

// Add BOTH store enhancers when making store creator
const createStoreWithFirebase = composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument({
    getFirebase, getFirestore
  })),
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase),
)(createStore)

// Add firebase and firestore to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  create: lessonReducer,
  snackbar: snackbarReducer
})

const initialState = {}

// Create store with reducers and initial state
export const store = createStoreWithFirebase(rootReducer, initialState)