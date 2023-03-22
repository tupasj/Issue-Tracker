import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCYdKkW60eJg2wrK5fdr3TQ2u5KyK8Bp0I',
  authDomain: 'issue-tracker-ec9be.firebaseapp.com',
  projectId: 'issue-tracker-ec9be',
  storageBucket: 'issue-tracker-ec9be.appspot.com',
  messagingSenderId: '16626888394',
  appId: '1:16626888394:web:02d763faf75ca0dcd40e33',
};
const firebaseApp = initializeApp(firebaseConfig);

// Firebase storage
const firebaseStorage = getStorage(firebaseApp);

export { firebaseStorage };
