import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDNmQF8ZG4Dw4JrNxBXDXBK5kmZCxGxlzM",
  authDomain: "booknest-demo.firebaseapp.com",
  projectId: "booknest-demo",
  storageBucket: "booknest-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789jkl"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);