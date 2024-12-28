import { GeoPoint } from "firebase/firestore";
import { OrderModel } from "./OrderModel";

export interface UserModel {
  uid: string;
  fullName: string | undefined;
  email: string | undefined,
  password: string | undefined,
  confirmPassword: string | undefined,
  city: string;
  address: string;
  phone: string;
  location: GeoPoint | null;
  orderHistory?: Omit<OrderModel, 'userId'>[] | null
  createdAt: Date;
}
