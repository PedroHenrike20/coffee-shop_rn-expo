export type RootStackLoginParamList = {
    Home: undefined,
    Login: undefined,
    LoginEntry: undefined,
    CreateAccount: {createAccountWithGoogle: boolean, uid: string | null},
    TabNavigator: undefined,
}

export type RootTabParamList = {
    TabHome: undefined,
    Favorites: {productFavoriteIds: string[]},
}

export type RootStackTabParamList = {
    Catalog: undefined,
    ProductDetails: {productId: string},
}

