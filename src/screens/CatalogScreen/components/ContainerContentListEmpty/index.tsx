import { RootState } from "@/src/redux/store";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useContext, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";
import MapViewComponent from "../MapViewComponent";
import { AuthContext } from "@/src/context/AuthContext";

const ContainerContentListEmpty: React.FC = () => {
  const { listStore, storeSelected, isLoading, showMapSearchStores } = useSelector(
    (state: RootState) => state.store
  );

  const { userModel } = useContext(AuthContext);

  const { listProductsFiltered, listProducts } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    console.log(showMapSearchStores)
  }, [showMapSearchStores]);


  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color="#C67C4E" size={35} />
      ) : (showMapSearchStores && userModel?.location) ? (
        <>
        <MapViewComponent location={userModel.location}/>
        </>
      ) : (
        <>
          {!(
            storeSelected === "" &&
            !listProductsFiltered &&
            listStore !== null &&
            listStore.length > 0 && !showMapSearchStores
          ) && <FontAwesome5 name="sad-tear" size={40} color="#C67C4E" />}

          {storeSelected !== "0" &&
            storeSelected !== "" &&
            !listProductsFiltered && !showMapSearchStores && (
              <Text style={styles.labelMessageList}>
                Nenhum produto disponível nessa loja...
              </Text>
            )}

          {listStore === null &&
            !listProductsFiltered &&
            storeSelected === "" && !showMapSearchStores && (
              <Text style={styles.labelMessageList}>
                Nenhuma loja perto de você...
              </Text>
            )}

          {storeSelected === "" &&
            !listProductsFiltered &&
            listStore !== null &&
            listStore.length > 0 && !showMapSearchStores && (
              <Text style={styles.labelMessageList}>
                Selecione uma loja e comece a fazer o seu pedido agora mesmo!
              </Text>
            )}

          {storeSelected &&
            listProductsFiltered &&
            listProductsFiltered.length === 0 &&
            listProducts &&
            listProducts.length > 0 && !showMapSearchStores && (
              <Text style={styles.labelMessageList}>
                Nenhum produto foi encontrado!
              </Text>
            )}
        </>
      )}
    </View>
  );
};

export default ContainerContentListEmpty;
