import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { ProductModel } from "@/src/models/ProductModel";

type CardProductItemProps = {
  productItem: ProductModel;
  onCardPress: () => void;
  onAddProduct: () => void;
};

const CardProductItem: React.FC<CardProductItemProps> = ({
  onAddProduct,
  onCardPress,
  productItem,
}) => {
  return (
    <TouchableOpacity onPress={onCardPress}>
      <View style={styles.containerCard}>
        <Image
          style={styles.imgProduct}
          source={require("../../../assets/images/icon.png")}
        />
        <View style={styles.containerRowAssessment}>
          <AntDesign name="star" color="#FBBE21" size={12} />
          <Text style={styles.textAssessmentProduct}>
            {productItem.assessement}
          </Text>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.containerDescription}>
            <Text style={styles.titleProdut}>{productItem.title}</Text>
            <Text style={styles.descriptionProdut}>
              {productItem.typeProduct}
            </Text>
          </View>
          <View style={styles.containerRowAction}>
            <Text style={styles.textPriceProduct}>
              R$ {productItem.priceProduct}
            </Text>
            <TouchableOpacity onPress={onAddProduct} style={styles.addProductButton}>
              <MaterialCommunityIcons name="plus" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardProductItem;
