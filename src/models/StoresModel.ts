import { GeoPoint } from "firebase/firestore";

export interface StoresModel {
    id: string;
    address: string;
    location: GeoPoint;
    name: string;
    openNow: boolean;
}