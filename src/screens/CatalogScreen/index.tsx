import React, { useCallback, useContext, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  Text,
  View,
} from "react-native";
import styles from "./styles";

import { AuthContext } from "@/src/context/AuthContext";
import CardProductItem from "@/src/components/CardProductItem";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { RootStackTabParamList } from "@/src/navigation/types";
import { ProductModel } from "@/src/models/ProductModel";
import { AuthContextModel } from "@/src/models/AuthContextModel";
import HeaderCatalog, {
  StoresItemPicker,
} from "@/src/components/HeaderCatalog";
import * as Location from "expo-location";
import {
  doc,
  GeoPoint,
  setDoc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import CustomButton from "@/src/components/CustomButton";
import { getDistanceRadiusForKm } from "@/src/utils/getDistanceRadiusForKm";
import CustomNavBar, { TabNavBar } from "@/src/components/CustomNavBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import {
  setIsLoading,
  setListCategory,
  setListProducts,
  setListProductsFiltered,
  setListStore,
  setStoreSelected,
} from "@/src/redux/storeSlice";
import ContainerContentListEmpty from "@/src/components/ContainerContentListEmpty";

const CatalogScreen: React.FC = () => {
  const { user, userModel, loadUserData } =
    useContext<AuthContextModel>(AuthContext);
  const dispatch = useDispatch();

  const navigation = useNavigation<NavigationProp<RootStackTabParamList>>();
  const {
    listStore,
    categorySelected,
    listProducts,
    listProductsFiltered,
    storeSelected,
    listCategory,
  } = useSelector((state: RootState) => state.store);

  useEffect(() => {
    checkPermission();
  }, []);

  useEffect(() => {
    if (categorySelected === "all") {
      dispatch(setListProductsFiltered(listProducts!));
    } else {
      dispatch(
        setListProductsFiltered(
          listProducts!?.filter(
            (product) => product.category === categorySelected
          )
        )
      );
    }
  }, [categorySelected, listProducts]);

  useEffect(() => {
    if (storeSelected!?.length > 0) {
      updateListProducts(storeSelected!);
    } else {
      dispatch(setListProducts(null!));
      dispatch(setListProductsFiltered(null!));
    }
  }, [storeSelected]);

  const checkPermission = async () => {
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
  };

  const requestLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert(
        "Loja não encontrada",
        "Você não concedeu permissão para acessar a localização."
      );
    }

    let localization = await Location.getCurrentPositionAsync({});

    saveCoordinatesOfUser(localization.coords);
  };

  const navigateToProductDetails = (product: ProductModel) => {
    navigation.navigate("ProductDetails", { product });
  };

  const saveCoordinatesOfUser = async (
    coords: Location.LocationObjectCoords
  ) => {
    try {
      dispatch(setIsLoading(true));
      const geoPoint = new GeoPoint(coords.latitude, coords.longitude);

      await setDoc(
        doc(db, "users", user?.uid!),
        {
          location: geoPoint,
        },
        { merge: true }
      );

      await loadUserData(user?.uid!);

      fetchStores(coords, 400);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível atualizar sua localização!");
      dispatch(setIsLoading(false));

    }
  };

  const fetchStores = async (
    coords: Location.LocationObjectCoords,
    radius: number
  ) => {
    const radiusInDegrees = radius / 111;

    const storesRef = collection(db, "stores");

    const queryStores = query(
      storesRef,
      where(
        "location",
        ">=",
        new GeoPoint(
          coords.latitude - radiusInDegrees,
          coords.longitude - radiusInDegrees
        )
      ),
      where(
        "location",
        "<=",
        new GeoPoint(
          coords.latitude + radiusInDegrees,
          coords.longitude + radiusInDegrees
        )
      )
    );

    const snapshotData = await getDocs(queryStores);

    const stores: StoresItemPicker[] = [];

    snapshotData.forEach((doc) => {
      const storeData = doc.data();
      const storeLocation = storeData.location;

      const distance = getDistanceRadiusForKm(
        coords.latitude,
        coords.longitude,
        storeLocation.latitude,
        storeLocation.longitude
      );

      if (distance <= radius) {
        stores.push({
          value: doc.id,
          label: storeData.name,
        } as StoresItemPicker);
      }
    });

    if (stores?.length > 0) {
      dispatch(setListStore(stores));
      dispatch(setStoreSelected(stores[0].value));
    }
    dispatch(setIsLoading(false));
  };

  const updateListProducts = useCallback(async (storeId: string) => {
    try {
      const storeRef = doc(db, "stores", storeId);
      const productsRef = collection(storeRef, "products");

      const querySnapshot = await getDocs(productsRef);

      const products: ProductModel[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as ProductModel)
      );

      if (products.length > 0) {
        const categorySet = new Set<TabNavBar>();

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

        dispatch(
          setListCategory([...listCategory, ...Array.from(categorySet)])
        );
        dispatch(setListProducts(products));
        dispatch(setListProductsFiltered(products));
      } else {
        dispatch(setListProducts(null!));
        dispatch(setListProductsFiltered(null!));
      }
    } catch (e) {
      Alert.alert(
        "Erro",
        "Não foi possível carregar os produtos, tente novamente mais tarde!"
      );
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listProductsFiltered}
        ListHeaderComponent={React.memo(() => (
          <>
            <HeaderCatalog />
            {listProducts !== null &&
              listProducts.length > 0 &&
              !!listStore && <CustomNavBar tabs={listCategory!} />}
          </>
        ))}
        ListEmptyComponent={() => (
          <View style={styles.containerContentListEmpty}>
            {userModel?.location === null ? (
              <CustomButton
                title={"Permitir minha localização"}
                onPress={checkPermission}
                icon={{
                  position: "left",
                  icon: "map-marker",
                  colorIcon: "#FFF",
                }}
              />
            ) : (
              <ContainerContentListEmpty />
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        columnWrapperStyle={[
          styles.containerListCatalogWrapper,
          { gap: Platform.OS === "android" ? 10 : 20 },
        ]}
        numColumns={2}
        renderItem={({ item, index }) => (
          <CardProductItem
            key={index}
            productItem={item}
            onAddProduct={() => {}}
            onCardPress={() => navigateToProductDetails(item)}
          />
        )}
      />
    </View>
  );
};

export default CatalogScreen;
