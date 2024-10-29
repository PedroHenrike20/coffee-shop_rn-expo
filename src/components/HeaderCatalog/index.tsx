import React, { useContext, useState } from "react";
import { Alert, Text, View } from "react-native";
import CustomNavBar, { TabNavBar } from "../CustomNavBar";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from "react-native-picker-select";
import styles from "./styles";
import { AuthContextModel } from "@/src/models/AuthContextModel";
import { AuthContext } from "@/src/context/AuthContext";
import CardPromoContainer from "../CardPromoContainer";

const HeaderCatalog: React.FC = () => {
  const { logout, user } = useContext<AuthContextModel>(AuthContext);

  const [location, setLocation] = useState(1);
  const [locations, setLocations] = useState([
    { label: "Av Brasil, SP", value: 1 },
  ]);

  const navTabs: TabNavBar[] = [
    { title: "Ver todos", value: "all" },
    { title: "Machiato", value: "machiato" },
    { title: "Latte", value: "latte" },
    { title: "Americano", value: "americano" },
    { title: "Capuccino", value: "capuccino" },
  ];

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
            <Text style={styles.textNameUser}>Olá, {user?.displayName ?? 'seja bem-vindo'}!</Text>
          </View>
        <View style={styles.containerRowHeader}>
          <View>
            <Text style={styles.labelLocation}>Localização</Text>
            <RNPickerSelect
              items={[{ label: "Av Brasil, SP", value: 1 }]}
              onValueChange={(value) => setLocation(value)}
              doneText="Pronto"
              value={location}
              pickerProps={{ renderToHardwareTextureAndroid: true }}
              style={{
                placeholder: styles.textStyleDropdown,
                inputIOS: styles.textStyleDropdown,
                inputAndroid: styles.textStyleDropdown,
                chevron: { backgroundColor: "grey" },
              }}
              placeholder={{ label: "Selecione uma cafeteria...", value: null }}
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
        <CustomNavBar tabs={navTabs} />
      </View>
    </View>
  );
};

export default HeaderCatalog;
