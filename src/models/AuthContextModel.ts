import { User, UserCredential } from "firebase/auth";
import { ReactNode } from "react";

export interface AuthContextModel {
    user: User | null;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    recoverPassword: (email: string) => Promise<void>;
    isLoggedIn: () => boolean;
    setUser: (value: User | null) => void,

}

export interface AuthProvideModel {
    children: ReactNode;
}