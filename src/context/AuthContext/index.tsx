import React, { createContext, ReactNode, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getAuth } from "@/firebaseConfig";
import {
  AuthContextModel,
  AuthProvideModel,
} from "@/src/models/AuthContextModel";

export const AuthContext = createContext<AuthContextModel>({
  user: null,
  login: Promise.resolve,
  logout: async () => {},
  recoverPassword: Promise.resolve,
  isLoggedIn: Boolean,
  setUser: () => {},
});

export const AuthProvider: React.FC<AuthProvideModel> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (userAuthenticated) => {
        if(userAuthenticated){
            setUser(userAuthenticated);
        }else{
            setUser(null);
        }
    });
 
    return () => unsubscribe();
 }, []);

  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(getAuth(), email, password);
  };

  const logout = async () => {
    return signOut(getAuth());
  };

  const recoverPassword = async (email: string) => {
    return sendPasswordResetEmail(getAuth(), email);
  };

  const isLoggedIn = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, recoverPassword, isLoggedIn, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
