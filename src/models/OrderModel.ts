import { ProductModel } from "./ProductModel";

type ProductOrderModel = {
    productId: string;
    quantity: number;
}

export interface OrderModel {
    id: string;
    userId: string;
    storeId: string;
    products: ProductOrderModel[];
    totalAmount: number;
    status: "PENDENTE" | "ENTREGUE" | "PREPARANDO"
    createdAt: Date;
}