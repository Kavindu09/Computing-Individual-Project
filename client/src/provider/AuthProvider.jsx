import { createContext, useEffect, useState } from "react";
import { auth } from '../firebase/firebase.config'; // ✅ relative path is cleaner
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import PropTypes from 'prop-types';  // Import PropTypes

// Creating AuthContext here
export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider).then((result) => {
      const user = result.user;
      setUser({
        ...user,
        photoURL: user.photoURL || "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
      });
      return result;
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    createNewUser,
    logOut,
    userLogin,
    loading,
    updateUserProfile,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

// Prop types validation for `children`
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Validate children prop
};

export default AuthProvider;
