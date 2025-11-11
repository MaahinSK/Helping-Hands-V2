import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { api } from './api.js';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const authService = {
  async login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await this.syncUserToMongoDB(userCredential.user);
    return userCredential;
  },

  async register(email, password, displayName, photoURL = '') {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (displayName || photoURL) {
      await updateProfile(userCredential.user, {
        displayName,
        photoURL
      });
    }

    await this.syncUserToMongoDB(userCredential.user);
    return userCredential;
  },

  async loginWithGoogle() {
    const userCredential = await signInWithPopup(auth, googleProvider);
    await this.syncUserToMongoDB(userCredential.user);
    return userCredential;
  },

  async syncUserToMongoDB(firebaseUser) {
    try {
      await api.post('/auth/sync-user', {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        photoURL: firebaseUser.photoURL || ''
      });
    } catch (error) {
      console.error('Failed to sync user to MongoDB:', error);
      // Don't throw error here - we don't want login to fail if MongoDB sync fails
    }
  },

  async logout() {
    // Clear localStorage first
    localStorage.removeItem('helpingHandsUser');
    await signOut(auth);
  }
};