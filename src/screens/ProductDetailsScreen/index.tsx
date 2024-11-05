import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CustomFooterDetailsProduct from "@/src/components/CustomFooterDetailsProduct";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackTabParamList } from "@/src/navigation/types";
import { PriceSizeProduct, ProductModel } from "@/src/models/ProductModel";
import CustomButtonSelected from "@/src/components/CustomButtonSelected";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useNavigation } from "expo-router";
import { AuthContext } from "@/src/context/AuthContext";

const ProductDetailsScreen: React.FC = () => {
  const { userModel } = useContext(AuthContext);
  const [isHotDrink, setIsHotDrink] = useState(true);
  const [priceSizeProduct, setPriceSizeProduct] = useState<PriceSizeProduct>();
  const [product, setProduct] = useState<ProductModel>();
  const { storeSelected } = useSelector((value: RootState) => value.store);
  const [isFavoriteDrink, setIsFavoriteDrink] = useState(false);

  const route = useRoute<RouteProp<RootStackTabParamList>>();
  const navigation = useNavigation();

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
    checkFavoriteDrink();
    return () => {};
  }, [product]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({}) => (
        <TouchableOpacity onPress={saveFavoriteDrink}>
          {isFavoriteDrink ? (
            <MaterialCommunityIcons name="heart" color="#ED5151" size={30} />
          ) : (
            <MaterialCommunityIcons
              name="heart-outline"
              color="#2A2A2A"
              size={30}
            />
          )}
        </TouchableOpacity>
      ),
    });
  });

  const checkFavoriteDrink = async () => {
    try {
      const favoriteProductRef = doc(
        db,
        "users",
        userModel!.uid,
        "favoriteDrinks",
        storeSelected!,
      );

      const dataSnapFavoriteDrink = await getDoc(favoriteProductRef);

      if (dataSnapFavoriteDrink.exists()) {
        const productIds = dataSnapFavoriteDrink.data().listFavoriteDrinks || [];
        setIsFavoriteDrink(productIds.includes(product!.id));
      }else{
        setIsFavoriteDrink(false);
      }
    } catch (e) {
      setIsFavoriteDrink(false);
    }
  };

  const saveFavoriteDrink = async () => { 
    try {
      const favoriteProductRef = doc(
        db,
        "users",
        userModel!.uid,
        "favoriteDrinks",
        storeSelected!,
      );

      const dataSnapFavoriteDrink = await getDoc(favoriteProductRef);

      if (!dataSnapFavoriteDrink.exists()) {
        await setDoc(favoriteProductRef, {
          listFavoriteDrinks: [product!.id],
        })
      }else{
        const dataFavoriteDrink = dataSnapFavoriteDrink.data();
        const productIds: string[] = dataFavoriteDrink.listFavoriteDrinks;

        if(!productIds.includes(product!.id)){
          productIds.push(product!.id);
          await setDoc(favoriteProductRef, {
            listFavoriteDrinks: productIds,
          });
        }else{
          const updatedFavoriteDrinksIds = productIds.filter(productId => productId !== product!.id);
          await setDoc(favoriteProductRef, {
            listFavoriteDrinks: updatedFavoriteDrinksIds
          });
        }
      }
      
      setIsFavoriteDrink(!isFavoriteDrink);

    } catch (e) {
      Alert.alert(
        "Erro",
        "Não foi possível adicionar esse produtos ao favorito"
      );
    }
  };

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
