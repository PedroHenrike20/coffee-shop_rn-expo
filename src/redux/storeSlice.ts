import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../models/ProductModel";
import { StoresItemPicker } from "../components/HeaderCatalog";
import { TabNavBar } from "../components/CustomNavBar";

interface Location {
  latitude: number;
  longitude: number;
}

interface StoreState {
  location: Location | null;
  listProducts: ProductModel[] | null;
  listProductsFiltered: ProductModel[] | null;
  listStore: StoresItemPicker[] | null;
  storeSelected: string | null;
  listCategory: TabNavBar[];
  categorySelected: string;
  isLoading: boolean;
}

const initialState: StoreState = {
  location: null,
  listProducts: null,
  listStore: null,
  listProductsFiltered: null,
  storeSelected: "",
  listCategory: [{ title: "Ver todos", value: "all" }],
  categorySelected: "all",
  isLoading: false,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<Location | null>) {
      state.location = action.payload;
    },

    setListProducts(state, action: PayloadAction<ProductModel[]>) {
      state.listProducts = action.payload;
    },

    setListProductsFiltered(state, action: PayloadAction<ProductModel[]>) {
      state.listProductsFiltered = action.payload;
    },

    setListStore(state, action: PayloadAction<StoresItemPicker[]>) {
      state.listStore = action.payload;
    },

    setListCategory(state, action: PayloadAction<TabNavBar[]>) {
      state.listCategory = action.payload;
    },

    setCategorySelected(state, action: PayloadAction<string>) {
      state.categorySelected = action.payload;
    },

    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setStoreSelected(state, action: PayloadAction<string>) {
      state.storeSelected = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setListCategory,
  setListProducts,
  setListProductsFiltered,
  setStoreSelected,
  setListStore,
  setLocation,
  setCategorySelected,
} = storeSlice.actions;

export default storeSlice.reducer;
