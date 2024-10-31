import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from "react-native-picker-select";
import styles from "./styles";
import { AuthContextModel } from "@/src/models/AuthContextModel";
import { AuthContext } from "@/src/context/AuthContext";
import CardPromoContainer from "../CardPromoContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { setStoreSelected } from "@/src/redux/storeSlice";

export interface StoresItemPicker {
  label: string;
  value: string;
}


const HeaderCatalog: React.FC = React.memo(() => {
  const { logout, userModel } = useContext<AuthContextModel>(AuthContext);
  const dispatch = useDispatch();
  const { listStore, storeSelected } = useSelector((state: RootState) => state.store);


  const confirmLogout = () => {
    Alert.alert("Confirmação", "Tem certeza que deseja sair da sua conta?", [
      {
        text: "Cancelar",
        onPress: () => {},
        isPreferred: true,
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: logout,
        isPreferred: false,
      },
    ]);
  };

  return (
    <View>
      <LinearGradient
        style={styles.containerGradiente}
        colors={["#111111", "#313131"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
      >
        <View style={styles.containerNameUser}>
        
          <Text style={styles.textNameUser}>
          {userModel && userModel?.fullName && `Olá, ${userModel?.fullName}!`}
          </Text>
          
        </View>
        <View style={styles.containerRowHeader}>
          <View>
            <Text style={styles.labelLocation}>Localização</Text>
            <RNPickerSelect
              items={listStore || []}
              onValueChange={(value) => dispatch(setStoreSelected(value))}
              doneText="Pronto"
              value={storeSelected}
              pickerProps={{ renderToHardwareTextureAndroid: true }}
              style={{
                placeholder: styles.textStyleDropdown,
                inputIOS: styles.textStyleDropdown,
                inputAndroid: styles.textStyleDropdown,
              }}
              placeholder={{ label: "Selecione uma cafeteria...", value: "" }}
            />
          </View>
          <View>
            <CustomButton
              color="transparent"
              onPress={confirmLogout}
              icon={{
                icon: "logout",
                position: "left",
                colorIcon: "#A2A2A2",
              }}
            />
          </View>
        </View>

        <View style={styles.containerRowSearch}>
          <View style={styles.containerFlex}>
            <CustomInput
              iconPrefixSearch={true}
              placeholder="Procurar um café"
            />
          </View>
          <View style={{ width: 52, height: "100%" }}>
            <CustomButton
              style={{ height: "100%" }}
              icon={{
                icon: "tune-variant",
                colorIcon: "#FFF",
                position: "left",
              }}
              onPress={() => {}}
            />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.containerSecundary}>
        <CardPromoContainer />
      </View>
    </View>
  );
});

export default HeaderCatalog;
