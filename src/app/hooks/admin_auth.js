// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword as firebaseSignIn, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Adjust if using a different version
import { auth } from '../firebase_connected/firebase'; // Ensure this path is correct

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await firebaseSignIn(auth, email, password);
      router.push('/dashboard'); // Navigate to the dashboard after successful login
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/login'); // Redirect to login page after successful logout
    } catch (error) {
      setError("Failed to log out");
    }
  };

  return { user, loading, error, login, logout };
}
