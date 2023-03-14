import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError);
    return () => unsubscribe();
  }, []);

  if (user !== undefined) {
    return (
      <AuthContext.Provider
        value={{ user, error }}
        {...props}
      />
    );
  }

  return null;
};
