import { getAuth, signOut } from '@firebase/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATH } from '../constants/path';
import { AuthContext } from '../contexts/AuthContext';

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
