import React, { useContext, useState } from "react";
import { FlatList, Platform, View } from "react-native";
import styles from "./styles";

import { AuthContext } from "@/src/context/AuthContext";
import CardProductItem from "@/src/components/CardProductItem";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { RootStackTabParamList } from "@/src/navigation/types";
import { ProductModel } from "@/src/models/ProductModel";
import { AuthContextModel } from "@/src/models/AuthContextModel";
import HeaderCatalog from "@/src/components/HeaderCatalog";

const CatalogScreen: React.FC = () => {
  const { logout } = useContext<AuthContextModel>(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackTabParamList>>();
  const [listProducts, setListProducts] = useState<ProductModel[]>([
    {
      id: "dsfdhbryhtdgfgyjnukj",
      assessement: 4.3,
      title: "Cafe Mocha",
      description: "",
      priceProduct: 5.44,
      typeProduct: "Espumante profundo",
    },
    {
      id: "dsfdhbrweryhtyjnukj",
      assessement: 4.3,
      title: "Cafe Mocha",
      description: "",
      priceProduct: 5.44,
      typeProduct: "Espumante profundo",
    },
    {
      id: "dsfdhbryh,hj4tyjnukj",
      assessement: 4.3,
      title: "Cafe Mocha",
      description: "",
      priceProduct: 5.44,
      typeProduct: "Espumante profundo",
    },
    {
      id: "dsfdhbryhty234refjnukj",
      assessement: 4.3,
      title: "Cafe Mocha",
      description: "",
      priceProduct: 5.44,
      typeProduct: "Espumante profundo",
    },
    {
      id: "dsfdhbryhtyff3245jnukj",
      assessement: 4.3,
      title: "Cafe Mocha",
      description: "",
      priceProduct: 5.44,
      typeProduct: "Espumante profundo",
    },
    {
      id: "dsfdhbryht23dscyjnukj",
      assessement: 4.3,
      title: "Cafe Mocha",
      description: "",
      priceProduct: 5.44,
      typeProduct: "Espumante profundo",
    },
    {
      id: "dsfdhbryhty5jnukj",
      assessement: 4.3,
      title: "Cafe Mocha",
      description: "",
      priceProduct: 5.44,
      typeProduct: "Espumante profundo",
    },
  ]);

  const navigateToProductDetails = (product: ProductModel) => {
    navigation.navigate("ProductDetails", { product });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={listProducts}
        ListHeaderComponent={HeaderCatalog}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={[styles.containerListCatalogWrapper, {gap: Platform.OS === "android" ? 10 : 20}]}
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
