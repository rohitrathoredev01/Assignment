import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAcz6e3fNTIwyUff9cekM9JuuprsGyTUdA',
  authDomain: 'myapp.firebaseapp.com',
  databaseURL: 'https://myapp.firebaseio.com',
  projectId: 'myapp-ae02c',
  storageBucket: 'myapp-ae02c.firebasestorage.app',
  messagingSenderId: '813308848359',
  appId: 'com.myapp',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };
