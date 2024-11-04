import React, { useContext } from "react";
import { Image, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styles from "./styles";
import { useNavigation } from "expo-router";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import CustomButton from "@/src/components/CustomButton";
import { AuthContext } from "@/src/context/AuthContext";
import { RootStackLoginParamList } from "@/src/navigation/types";
import { AuthContextModel } from "@/src/models/AuthContextModel";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type PropsRoute = {
  navigation: NativeStackScreenProps<RootStackLoginParamList, "Home">;
};

const HomeScreen: React.FC<PropsRoute> = () => {
  const navigation = useNavigation<NavigationProp<RootStackLoginParamList>>();
  const route = useRoute<RouteProp<RootStackLoginParamList>>();
  const { isLoggedIn, setUser } = useContext<AuthContextModel>(AuthContext);

  const navigateToLogin = () => {
    navigation.navigate("LoginEntry");
  };

  
 


  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImg}
        source={require("../../../assets/images/background.png")}
      />
      <View style={styles.containerSecundary}>
        <View style={styles.containerMessage}>
          <Text style={styles.messageTextMain}>Fast Express {'\n'}Seu café, na velocidade que você precisa!</Text>
          <Text style={styles.messageText}>
          Sejam bem-vindos, aqui conectamos você ao seu café favorito de maneira rápida e conveniente,{'\n'}vamos começar?
            
          </Text>
        </View>
        {!isLoggedIn() && (
          <CustomButton title={"Começar"} onPress={navigateToLogin} />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
