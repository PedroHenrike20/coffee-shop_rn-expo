import React, { useCallback, useContext, useEffect } from "react";
import {
  Alert,
  View,
} from "react-native";

import { AuthContext } from "@/src/context/AuthContext";
import { ProductModel } from "@/src/models/ProductModel";
import { AuthContextModel } from "@/src/models/AuthContextModel";
import { StoresItemPicker } from "@/src/screens/CatalogScreen/components/HeaderCatalog";
import * as Location from "expo-location";
import {
  doc,
  GeoPoint,
  setDoc,
  getDocs,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { TabNavBar } from "@/src/components/CustomNavBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import {
  setIsLoading,
  setListStore,
  setShowMapSearchStores,
  setStoreSelected,
} from "@/src/redux/storeSlice";
import {
  setListCategory,
  setListProducts,
  setListProductsFiltered,
} from "@/src/redux/productSlice";
import CatalogListComponent from "./components/CatalogListComponent";
import { StatusBar } from "expo-status-bar";


const CatalogScreen: React.FC = () => {
  const { user, userModel, loadUserData } =
    useContext<AuthContextModel>(AuthContext);
  const dispatch = useDispatch();
  const { listCategory } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (userModel) {
      dispatch(setIsLoading(false));
      if (!userModel.location) {
        checkPermission();
      } else {
        console.log('aq?')
        setShowMapSearchStores(true);
      }
    } else {
      dispatch(setIsLoading(true));
    }
    return () => {};
  }, [userModel]);

  const checkPermission = useCallback(async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos da sua permissão para acessar a localização e mostrar as lojas mais próxima a você.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "OK", onPress: async () => await requestLocation() },
        ]
      );
    } else {
      await requestLocation();
    }
  }, []);

  const requestLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert(
        "Loja não encontrada",
        "Você não concedeu permissão para acessar a localização."
      );
    }

    let localization = await Location.getCurrentPositionAsync({});

    saveCoordinatesOfUser(localization.coords);
  }, []);

  const saveCoordinatesOfUser = useCallback(
    async (coords: Location.LocationObjectCoords) => {
      try {
        const geoPoint = new GeoPoint(coords.latitude, coords.longitude);

        await setDoc(
          doc(db, "users", user?.uid!),
          {
            location: geoPoint,
          },
          { merge: true }
        );

        await loadUserData(user?.uid!);
      } catch (e) {
        Alert.alert("Erro", "Não foi possível atualizar sua localização!");
        dispatch(setIsLoading(false));
      }
    },
    []
  );

  

  const updateListProducts = useCallback(async (storeId: string) => {
    try {
      const storeRef = doc(db, "stores", storeId);
      const productsRef = collection(storeRef, "products");

      const unsubscribe = onSnapshot(
        productsRef,
        (snapshot) => {
          const products: ProductModel[] = snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as ProductModel)
          );

          if (products.length > 0) {
            const categorySet = new Set<TabNavBar>(listCategory);

            products.forEach((product) => {
              if (product.category) {
                categorySet.add({
                  title:
                    product.category.charAt(0).toUpperCase() +
                    product.category.slice(1),
                  value: product.category,
                });
              }
            });

            dispatch(setListCategory([...Array.from(categorySet)]));
            dispatch(setListProducts(products));
            dispatch(setListProductsFiltered(products));
          } else {
            dispatch(setListProducts(null!));
            dispatch(setListProductsFiltered(null!));
          }
        },
        (err) => {
          Alert.alert(
            "Erro",
            "Não foi possível buscar os produtos dessa loja!"
          );
        }
      );

      return unsubscribe;
    } catch (e) {
      Alert.alert(
        "Erro",
        "Não foi possível carregar os produtos, tente novamente mais tarde!"
      );
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
            backgroundColor="#000000"
            hidden={false}
            animated={true}
            translucent={false}
          />
        <CatalogListComponent
          updateListProducts={updateListProducts}
          checkPermission={checkPermission}
        />
    </View>
  );
};

export default CatalogScreen;
