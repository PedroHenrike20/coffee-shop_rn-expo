import { RootState } from "@/src/redux/store";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";

const ContainerContentListEmpty: React.FC = () => {
  const {
    listProducts,
    listStore,
    storeSelected,
    listProductsFiltered,
    isLoading,
  } = useSelector((value: RootState) => value.store);

  // console.log({listStore})

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color="#C67C4E" size={35} />
      ) : (
        <>
          {!(
            storeSelected === "" &&
            !listProductsFiltered &&
            listStore !== null &&
            listStore.length > 0
          ) && <FontAwesome5 name="sad-tear" size={40} color="#C67C4E" />}

          {storeSelected !== "0" &&
            storeSelected !== "" &&
            !listProductsFiltered && (
              <Text style={styles.labelMessageList}>
                Nenhum produto disponível nessa loja...
              </Text>
            )}

          {listStore === null &&
            !listProductsFiltered &&
            storeSelected === "" && (
              <Text style={styles.labelMessageList}>
                Nenhuma loja perto de você...
              </Text>
            )}

          {storeSelected === "" &&
            !listProductsFiltered &&
            listStore !== null &&
            listStore.length > 0 && (
              <Text style={styles.labelMessageList}>
                Selecione uma loja e comece a fazer o seu pedido agora mesmo!
              </Text>
            )}
        </>
      )}
    </View>
  );
};

export default ContainerContentListEmpty;
