import { OrderModel } from "./OrderModel";

export interface UserModel {
  fullName: string;
  city: string;
  address: string;
  phone: string;
  location: string;
  orderHistory: Omit<OrderModel, 'userId'>[]
  createdAt: Date;
}
