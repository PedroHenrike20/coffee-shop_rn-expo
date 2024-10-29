import { ProductModel } from "../models/ProductModel"

export type RootStackLoginParamList = {
    Home: undefined,
    Login: undefined,
    LoginEntry: undefined,
    CreateAccount: {createAccountWithGoogle: boolean, uid: string | null},
    TabNavigator: undefined,
}

export type RootStackTabParamList = {
    Catalog: undefined,
    ProductDetails: {product: ProductModel},
    
}