import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase.init';

export const auth = getAuth(app)
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null
  );
console.log(user)

  //create new user
  const createNewUser=(email,password)=>{
    return createUserWithEmailAndPassword(auth, email,password)
  }
// sign In user
const signIn = ( email, password)=>{
 return signInWithEmailAndPassword(auth,email,password)
}

//update user
// const updateUser= ()=>{
//   return updateProfile()
// }

  // Set observer to find the exsiting user

useEffect(()=>{
const unsubscribe= onAuthStateChanged(auth, currentUser=>{
    setUser(currentUser)
})
return ()=>{
    unsubscribe();
}
},[])

// logout
const logOut=()=>{
  return signOut(auth)
}

// forget password
const resetPassword= (email)=>{
  return sendPasswordResetEmail(auth, email)
}
  const authInfo = {
  user,
    setUser,
    createNewUser,
    signIn,
    logOut,resetPassword,
    // updateUser,
  };


  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
