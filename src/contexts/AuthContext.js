import { getAuth, signOut, onAuthStateChanged } from '@firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../constants/path';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError);
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, error }} {...props} />;
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != null };
};

export const useSignOut = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const signout = () => {
    signOut(auth)
      .then(() => {
        navigate(PATH.login);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return signout;
};
