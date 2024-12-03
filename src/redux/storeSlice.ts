import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../models/ProductModel";
import { StoresItemPicker } from "../screens/CatalogScreen/components/HeaderCatalog";
import { TabNavBar } from "../components/CustomNavBar";

interface Location {
  latitude: number;
  longitude: number;
}

interface StoreState {
  location: Location | null;
  showMapSearchStores: boolean;
  listStore: StoresItemPicker[] | null;
  storeSelected: string | null;
  

  isLoading: boolean;
}

const initialState: StoreState = {
  location: null,
  listStore: null,
  showMapSearchStores: false,
  storeSelected: "",
  isLoading: false,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<Location | null>) {
      state.location = action.payload;
    },



    setListStore(state, action: PayloadAction<StoresItemPicker[]>) {
      state.listStore = action.payload;
    },

    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    setStoreSelected(state, action: PayloadAction<string>) {
      state.storeSelected = action.payload;
    },

    setShowMapSearchStores(state, action: PayloadAction<boolean>) {
      state.showMapSearchStores = action.payload;
    }
  },
});

export const {
  setShowMapSearchStores,
  setIsLoading,
  setStoreSelected,
  setListStore,
  setLocation,
} = storeSlice.actions;

export default storeSlice.reducer;
