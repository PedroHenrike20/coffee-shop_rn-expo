import React, { useEffect } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import CustomButton from "@/src/components/CustomButton";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { getAuth } from "@/firebaseConfig";
import styles from "./styles";
import { useNavigation } from "expo-router";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { NavigationProp } from "@react-navigation/native";
import { RootStackLoginParamList } from "@/src/navigation/types";

WebBrowser.maybeCompleteAuthSession();

type PropsRoute = {
  navigation: NativeStackScreenProps<RootStackLoginParamList, "LoginEntry">;
};

const LoginEntryScreen: React.FC<PropsRoute> = () => {
  const navigator = useNavigation<NavigationProp<RootStackLoginParamList>>();

  const discovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId:
        "33637088775-l3tb168d328iscm03qm9ot1lhcium9f0.apps.googleusercontent.com",
      redirectUri: "https://auth.expo.io/@pedrodev/coffee-shop-app",

      scopes: ["openid", "profile", "email"],
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(getAuth(), credential)
        .then(async (userCredencial) => {
          const user = userCredencial.user;
          navigator.navigate("CreateAccount", {
            createAccountWithGoogle: true,
            uid: user.uid,
          });
        })
        .catch((e) => {
          Alert.alert("Erro ao se conectar com a sua conta Google!");
        });
    }
    return () => {};
  }, [response]);

  const navigateToCreateNewAccount = () => {
    navigator.navigate("CreateAccount", {
      createAccountWithGoogle: false,
      uid: null,
    });
  };

  const navigateToLogin = () => {
    navigator.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <CustomButton
        title={"Entrar com o Google"}
        onPress={() => promptAsync()}
        icon={{
          position: "left",
          image: require("../../../assets/images/google_logo.png"),
        }}
      />
      <CustomButton
        title={"Criar uma conta"}
        onPress={navigateToCreateNewAccount}
        icon={{ position: "left", icon: "email", colorIcon: "#FFF" }}
      />
      <View style={styles.containerTextButton}>
        <Pressable onPress={navigateToLogin}>
          <Text style={styles.textButton}>Acessar minha conta</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginEntryScreen;
