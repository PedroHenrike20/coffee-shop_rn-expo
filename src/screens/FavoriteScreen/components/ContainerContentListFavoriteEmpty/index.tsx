import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import styles from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { FontAwesome5 } from "@expo/vector-icons";

const ContainerContentListFavoriteEmpty: React.FC = () => {
  const { isLoading } = useSelector((state: RootState) => state.products);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color="#C67C4E" size={35} />
      ) : (
        <>
          <FontAwesome5 name="sad-tear" size={40} color="#C67C4E" />
          <Text style={styles.labelMessageList}>
            Nenhum produto foi adicionado a sua lista de favoritos!
          </Text>
        </>
      )}
    </View>
  );
};

export default ContainerContentListFavoriteEmpty;
