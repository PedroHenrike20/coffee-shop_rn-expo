import React, { useEffect, useState } from "react";
import { Alert, FlatList, Platform, Text, View } from "react-native";
import styles from "./style";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "@/src/components/CustomInput";
import CustomButton from "@/src/components/CustomButton";
import { ProductModel } from "@/src/models/ProductModel";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { RootTabParamList } from "@/src/navigation/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import CardRowProductItem from "./components/CardRowProductItem";
import ContainerContentListFavoriteEmpty from "./components/ContainerContentListFavoriteEmpty";
import { setIsLoading } from "@/src/redux/productSlice";


const FavoriteScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootTabParamList>>();
  const [listProductFavorite, setListProductFavorite] = useState<
    ProductModel[]
  >([]);
  const { listProductIdFavorite } = useSelector(
    (state: RootState) => state.products
  );
  const { storeSelected } = useSelector((state: RootState) => state.store);
  const dispatch = useDispatch();

  useEffect(() => {
    loadProductFavoriteList();
  }, [listProductIdFavorite]);

  const loadProductFavoriteList = async () => {
    dispatch(setIsLoading(true));
    try {
      const productCollectionRef = collection(
        db,
        "stores",
        storeSelected!,
        "products"
      );

      const productDetailsPromise = listProductIdFavorite.map(
        async (productId) => {
          const productRef = doc(productCollectionRef, productId);
          const productSnap = await getDoc(productRef);

          if (productSnap.exists()) {
            return {
              id: productSnap.id,
              ...productSnap.data(),
            } as ProductModel;
          } else {
            return null;
          }
        }
      );

      const products = await Promise.all(productDetailsPromise);
      setListProductFavorite(products.filter((product) => product !== null));
      dispatch(setIsLoading(false));
    } catch (e) {
      setListProductFavorite([]);
      dispatch(setIsLoading(false));

      Alert.alert(
        "Erro",
        "Não foi possível carregar sua lista de produtos favoritos, tente novamente mais tarde!"
      );
    }
  };

  const navigateToProductDetails = (product: ProductModel) => {
    navigation.navigate<any>("TabHome", {
      screen: 'ProductDetails',
      params: {productId: product.id}
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.containerGradiente}
        colors={["#111111", "#313131"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <View style={styles.containerRowSearch}>
          <View style={styles.containerFlex}>
            <CustomInput
              iconPrefixSearch={true}
              onChangeText={(value) => value}
              value={""}
              editable={true}
              placeholder="Procurar um café"
            />
          </View>
          <View style={{ width: 52, height: "100%" }}>
            <CustomButton
              style={{ height: "100%" }}
              icon={{
                icon: "tune-variant",
                colorIcon: "#FFF",
                position: "left",
              }}
              onPress={() => {}}
            />
          </View>
        </View>
      </LinearGradient>
      <FlatList
        contentContainerStyle={styles.containerContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ContainerContentListFavoriteEmpty />}
        data={listProductFavorite}
        renderItem={({ item, index }) => (
          <CardRowProductItem
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

export default FavoriteScreen;
