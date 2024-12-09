import { create } from 'zustand';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,
  signUp: async (email, password) => {
    try {
      set({ error: null });
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      set({ user });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
  signIn: async (email, password) => {
    try {
      set({ error: null });
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      set({ user });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
  setUser: (user) => set({ user, loading: false }),
  setError: (error) => set({ error }),
}));

// Set up auth state listener
onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
});