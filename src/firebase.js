import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBAqXjPZ8jPy4jB-H92d0R1TQ-7YiUfK3Q',
  authDomain: 'tindarek-91458.firebaseapp.com',
  projectId: 'tindarek-91458',
  storageBucket: 'tindarek-91458.appspot.com',
  messagingSenderId: '503614083504',
  appId: '1:503614083504:web:1fe764550d225379de0675',
  measurementId: 'G-NEV8K219RB'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const analytics = getAnalytics(app)
export const storage = getStorage(app)
