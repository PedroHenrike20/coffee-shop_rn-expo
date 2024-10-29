import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import styles from "./styles";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import CustomButtonIconSelected from "@/src/components/CustomButtonIconSelected";
import CustomFooterDetailsProduct from "@/src/components/CustomFooterDetailsProduct";


const ProductDetailsScreen: React.FC = () => {
  const [isHotDrink, setIsHotDrink] = useState(true);
  const [sizeDrink, setSizeDrink] = useState<"P" | "M" | "G">("P");

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.containerImg}>
          <Image
            style={styles.imgProduct}
            source={require("../../../assets/images/product_detail.png")}
          />
        </View>
        <View>
          <View style={styles.containerRowDetails}>
            <View style={styles.containerColumnDetails}>
              <View style={styles.containerText}>
                <Text style={styles.textTitle}>Cafe Mocha</Text>
                <Text style={styles.legendProduct}>Gelado/Quente</Text>
              </View>
              <View style={styles.containerAssessment}>
                <AntDesign name="star" color="#FBBE21" size={20} />
                <Text style={styles.textAssessment}>4.5</Text>
                <Text style={styles.textQuantity}>(344)</Text>
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
                <CustomButtonIconSelected
                  onPress={() => setIsHotDrink(true)}
                  isSelected={isHotDrink}
                >
                  <Feather
                    name="coffee"
                    size={30}
                    color={isHotDrink ? "#C67C4E" : "#111111"}
                  />
                </CustomButtonIconSelected>
                <CustomButtonIconSelected
                  onPress={() => setIsHotDrink(false)}
                  isSelected={!isHotDrink}
                >
                  <Ionicons
                    name="snow"
                    size={32}
                    color={!isHotDrink ? "#C67C4E" : "#111111"}
                  />
                </CustomButtonIconSelected>
              </View>
            </View>
          </View>
          <View style={styles.borderDivider} />
        </View>
        <View style={styles.containerDescription}>
          <Text style={styles.labelContent}>Descrição</Text>
          <Text style={styles.textDescription}>
            Um cappuccino é uma bebida de aproximadamente 150 ml (5 onças),
            sendo 25 ml de café expresso e 85 ml de leite fresco.
          </Text>
        </View>
        <View style={styles.containerSizeDrink}>
          <Text style={styles.labelContent}>Tamanho</Text>

          <View style={styles.containerRowSizeDrinkButton}>
            <CustomButtonIconSelected
              onPress={() => setSizeDrink("P")}
              isSelected={sizeDrink === "P"}
            >
              <View style={styles.containerTextButtonSize}>
                <Text
                  style={{ color: sizeDrink === "P" ? "#C67C4E" : "#242424" }}
                >
                  P
                </Text>
              </View>
            </CustomButtonIconSelected>
            <CustomButtonIconSelected
              onPress={() => setSizeDrink("M")}
              isSelected={sizeDrink === "M"}
            >
              <View style={styles.containerTextButtonSize}>
                <Text
                  style={{ color: sizeDrink === "M" ? "#C67C4E" : "#242424" }}
                >
                  M
                </Text>
              </View>
            </CustomButtonIconSelected>
            <CustomButtonIconSelected
              onPress={() => setSizeDrink("G")}
              isSelected={sizeDrink === "G"}
            >
              <View style={styles.containerTextButtonSize}>
                <Text
                  style={{ color: sizeDrink === "G" ? "#C67C4E" : "#242424" }}
                >
                  G
                </Text>
              </View>
            </CustomButtonIconSelected>
          </View>
        </View>
      </ScrollView>
      <CustomFooterDetailsProduct />
    </>
  );
};

export default ProductDetailsScreen;
