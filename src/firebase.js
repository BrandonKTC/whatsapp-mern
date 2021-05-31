import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCcR2EjkFblxGzETeuNSDLtrWhDCHAfBw4',
  authDomain: 'whatsapp-ktc.firebaseapp.com',
  projectId: 'whatsapp-ktc',
  storageBucket: 'whatsapp-ktc.appspot.com',
  messagingSenderId: '336800349554',
  appId: '1:336800349554:web:34e04a17e0ae46a54cf1eb',
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const auth = firebase.auth()

export { auth }
