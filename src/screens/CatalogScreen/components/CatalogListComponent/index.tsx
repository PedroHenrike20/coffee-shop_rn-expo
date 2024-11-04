import CardProductItem from "@/src/components/CardProductItem";
import React, { useContext, useEffect } from "react";
import { FlatList, Platform, View } from "react-native";
import ContainerContentListEmpty from "../ContainerContentListEmpty";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import HeaderCatalog from "../HeaderCatalog";
import CustomNavBar from "@/src/components/CustomNavBar";
import CustomButton from "@/src/components/CustomButton";
import { RootStackTabParamList } from "@/src/navigation/types";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { ProductModel } from "@/src/models/ProductModel";
import { AuthContext } from "@/src/context/AuthContext";
import { AuthContextModel } from "@/src/models/AuthContextModel";
import styles from "./styles";
import {
  setListProducts,
  setListProductsFiltered,
} from "@/src/redux/productSlice";

type CatalogListComponentProps = {
  checkPermission: () => void;
  updateListProducts: (value: string) => void;
};

const CatalogListComponent: React.FC<CatalogListComponentProps> = React.memo(
  ({ checkPermission, updateListProducts }) => {
    const {
      listCategory,
      listProducts,
      listProductsFiltered,
      categorySelected,
    } = useSelector((state: RootState) => state.products);
    const { userModel } = useContext<AuthContextModel>(AuthContext);
    const { listStore, storeSelected } = useSelector(
      (state: RootState) => state.store
    );
    const navigation = useNavigation<NavigationProp<RootStackTabParamList>>();

    const navigateToProductDetails = (product: ProductModel) => {
      navigation.navigate("ProductDetails", { productId: product.id });
    };
    const dispatch = useDispatch();

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
      return () => {};
    }, [categorySelected, listProducts]);

    useEffect(() => {
      if (storeSelected!?.length > 0) {
        updateListProducts(storeSelected!);
      } else {
        dispatch(setListProducts(null!));
        dispatch(setListProductsFiltered(null!));
      }
      return () => {};
    }, [storeSelected]);

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listProductsFiltered}
        ListHeaderComponent={
          <>
            <HeaderCatalog/>
            {listProducts !== null &&
              listProducts.length > 0 &&
              !!listStore && <CustomNavBar tabs={listCategory!} />}
          </>
        }
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
    );
  }
);

export default CatalogListComponent;
