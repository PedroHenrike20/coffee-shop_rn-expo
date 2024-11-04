import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./storeSlice";
import productReducer from "./productSlice"

const store = configureStore({
    reducer: {
        store: storeReducer,
        products: productReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;