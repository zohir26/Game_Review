import { createContext, useState } from 'react';
import { getAuth } from "firebase/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase.init';

export const auth = getAuth(app)
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
  );


  //create new user
  const createNewUser=(email,password)=>{
    return createUserWithEmailAndPassword(auth, email,password)
  }

  // login with google



  const authInfo = {
  user,
    setUser,
    createNewUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
