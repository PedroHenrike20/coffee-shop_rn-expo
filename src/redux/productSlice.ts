import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TabNavBar } from "../components/CustomNavBar";
import { ProductModel } from "../models/ProductModel";

interface ProductState {
  listProducts: ProductModel[] | null;
  listProductsFiltered: ProductModel[] | null;
  listCategory: TabNavBar[];
  categorySelected: string;
}

const initialState: ProductState = {
  listProducts: null,
  listProductsFiltered: null,
  listCategory: [{ title: "Ver todos", value: "all" }],
  categorySelected: "all",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setListProducts(state, action: PayloadAction<ProductModel[]>) {
      state.listProducts = action.payload;
    },

    setListProductsFiltered(state, action: PayloadAction<ProductModel[]>) {
      state.listProductsFiltered = action.payload;
    },

    setListCategory(state, action: PayloadAction<TabNavBar[]>) {
      state.listCategory = action.payload;
    },

    setCategorySelected(state, action: PayloadAction<string>) {
      state.categorySelected = action.payload;
    },
  },
});

export const {
  setCategorySelected,
  setListCategory,
  setListProducts,
  setListProductsFiltered,
} = productSlice.actions;

export default productSlice.reducer;
