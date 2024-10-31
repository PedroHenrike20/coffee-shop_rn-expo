import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styles from "./style";
import CustomButton from "../CustomButton";

type CustomFooterDetailsProductProp = {
  price: number
}

const CustomFooterDetailsProduct: React.FC<CustomFooterDetailsProductProp> = ({price}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 550);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isVisible && (
        <View style={styles.container}>
          <View style={styles.containerPriceProduct}>
            <Text style={styles.labelPrice}>Preço</Text>
            <Text style={styles.textPrice}>{Intl.NumberFormat('pt-BR', {style: "currency", currency: "BRL"}).format(price)}</Text>
          </View>
          <View style={styles.containerButtonBuy}>
            <CustomButton title={"Comprar Agora"} />
          </View>
        </View>
      )}
    </>
  );
};

export default CustomFooterDetailsProduct;
