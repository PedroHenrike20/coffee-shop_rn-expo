import React from "react";
import { Image, Text, View } from "react-native";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";

const CardPromoContainer: React.FC = () => {
  return (
    <View  style={styles.containerCard}>
      <Image
        style={styles.imageBackgroundStyle}
        source={require("../../../assets/images/banner_01.png")}
      />
      <View style={styles.containerContent}>
        <View style={styles.containerTag}>
          <Text style={styles.textTag}>PROMO</Text>
        </View>
        <Text style={styles.textCard}>Compre um e leve{"\n"}outro GRÁTIS</Text>
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={["#111111", "#313131"]}
          style={styles.containerHighlight_1}
        />
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={["#111111", "#313131"]}
          style={styles.containerHighlight_2}
        />
        <View />
      </View>
    </View>
  );
};

export default CardPromoContainer;
