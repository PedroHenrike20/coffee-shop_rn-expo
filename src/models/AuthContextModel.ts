import { User, UserCredential } from "firebase/auth";
import { ReactNode } from "react";
import { UserModel } from "./UserModel";

export interface AuthContextModel {
    user: User | null;
    userModel: UserModel | null;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    recoverPassword: (email: string) => Promise<void>;
    isLoggedIn: () => boolean;
    setUser: (value: User | null) => void,
    loadUserData: (uid: string) => Promise<void>,

}

export interface AuthProvideModel {
    children: ReactNode;
}