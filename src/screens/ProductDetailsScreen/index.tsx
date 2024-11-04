import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import styles from "./styles";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import CustomFooterDetailsProduct from "@/src/components/CustomFooterDetailsProduct";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackTabParamList } from "@/src/navigation/types";
import { PriceSizeProduct, ProductModel } from "@/src/models/ProductModel";
import CustomButtonSelected from "@/src/components/CustomButtonSelected";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const ProductDetailsScreen: React.FC = () => {
  const [isHotDrink, setIsHotDrink] = useState(true);
  const [priceSizeProduct, setPriceSizeProduct] = useState<PriceSizeProduct>();
  const [product, setProduct] = useState<ProductModel>();
  const { storeSelected } = useSelector((value: RootState) => value.store);

  const route = useRoute<RouteProp<RootStackTabParamList>>();
  useEffect(() => {
    let productId = route.params?.productId;

    const productRef = doc(db, `stores/${storeSelected}/products/${productId}`);
    const unsubscribe = onSnapshot(productRef, (doc) => {
      if (doc.exists()) {
        setProduct({ id: doc.id, ...doc.data() } as ProductModel);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setPriceSizeProduct(product?.prices.find((item) => item.isActive === true));
    return () => {};
  }, [product]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerImg}>
          <Image
            style={styles.imgProduct}
            source={{ uri: product?.imageMediumUrl }}
          />
        </View>
        <View>
          <View style={styles.containerRowDetails}>
            <View style={styles.containerColumnDetails}>
              <View style={styles.containerText}>
                <Text style={styles.textTitle}>{product?.name}</Text>
                <Text style={styles.legendProduct}>Gelado/Quente</Text>
              </View>
              <View style={styles.containerAssessment}>
                <AntDesign name="star" color="#FBBE21" size={20} />
                <Text style={styles.textAssessment}>{product?.assessment}</Text>
                <Text
                  style={styles.textQuantity}
                >{`(${product?.quantityAssessment})`}</Text>
              </View>
            </View>
            <View style={styles.containerTypeDrinkButton}>
              <Text style={styles.legendProduct}>
                Sua bebida {"\n"}vai ser:{" "}
                <Text style={{ color: "#C67C4E", fontWeight: "500" }}>
                  {isHotDrink ? "quente" : "fria"}
                </Text>
              </Text>
              <View style={styles.containerRowAction}>
                <CustomButtonSelected
                  onPress={() => setIsHotDrink(true)}
                  isSelected={isHotDrink}
                >
                  <Feather
                    name="coffee"
                    size={30}
                    color={isHotDrink ? "#C67C4E" : "#111111"}
                  />
                </CustomButtonSelected>
                <CustomButtonSelected
                  onPress={() => setIsHotDrink(false)}
                  isSelected={!isHotDrink}
                >
                  <Ionicons
                    name="snow"
                    size={32}
                    color={!isHotDrink ? "#C67C4E" : "#111111"}
                  />
                </CustomButtonSelected>
              </View>
            </View>
          </View>
          <View style={styles.borderDivider} />
        </View>
        <View style={styles.containerDescription}>
          <Text style={styles.labelContent}>Descrição</Text>
          <Text style={styles.textDescription}>{product?.description}</Text>
        </View>
        <View style={styles.containerSizeDrink}>
          <Text style={styles.labelContent}>Tamanho</Text>

          <View style={styles.containerRowSizeDrinkButton}>
            {product?.prices.map((item, index) => (
              <CustomButtonSelected
                key={index}
                isActive={item.isActive}
                disabled={!item.isActive}
                onPress={() => setPriceSizeProduct(item)}
                isSelected={item === priceSizeProduct}
              >
                <View style={styles.containerTextButtonSize}>
                  <Text
                    style={{
                      color: item === priceSizeProduct ? "#C67C4E" : "#242424",
                    }}
                  >
                    {item.size}
                  </Text>
                </View>
              </CustomButtonSelected>
            ))}
          </View>
        </View>
      </ScrollView>
      <CustomFooterDetailsProduct price={priceSizeProduct?.price!} />
    </>
  );
};

export default ProductDetailsScreen;
