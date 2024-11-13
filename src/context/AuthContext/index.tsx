import React, { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { db, getAuth } from "@/firebaseConfig";
import {
  AuthContextModel,
  AuthProvideModel,
} from "@/src/models/AuthContextModel";
import { doc, GeoPoint, getDoc } from "firebase/firestore";
import { UserModel } from "@/src/models/UserModel";
import * as SplashScreen from 'expo-splash-screen';

export const AuthContext = createContext<AuthContextModel>({
  user: null,
  userModel: null,
  login: Promise.resolve,
  logout: async () => {},
  recoverPassword: Promise.resolve,
  isLoggedIn: Boolean,
  setUser: () => {},
  loadUserData: Promise.resolve,
});

export const AuthProvider: React.FC<AuthProvideModel> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userModel, setUserModel] = useState<UserModel | null>(null);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      async (userAuthenticated) => {
        if (userAuthenticated) {
          setUser(userAuthenticated);
          await loadUserData(userAuthenticated.uid);
        } else {
          setUser(null);
          setUserModel(null);
        }
        SplashScreen.hideAsync();
      }
    );
    
    return () => unsubscribe();
  }, []);

  const loadUserData = async (uid: string) => {
    const userDoc = await getDoc(doc(db, "users", uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();

      const userModelMapped: UserModel = {
        uid: uid,
        fullName: userData.fullName || "",
        address: userData.address || "",
        city: userData.city || "",
        location:
          userData?.location instanceof GeoPoint ? userData.location : null,
        phone: userData.phone || "",
        createdAt: userData.createdAt
          ? userData.createdAt.toDate()
          : new Date(),
        orderHistory: null,
      };

      setUserModel(userModelMapped);
    } else {
      setUserModel(null);
    }
  };

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
      value={{
        user,
        userModel,
        login,
        logout,
        recoverPassword,
        isLoggedIn,
        setUser,
        loadUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
