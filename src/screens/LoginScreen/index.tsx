import CustomInput from "@/src/components/CustomInput";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import styles from "./style";
import CustomButton from "@/src/components/CustomButton";
import { AuthContext } from "@/src/context/AuthContext";
import { AuthContextModel } from "@/src/models/AuthContextModel";

const LoginScreen: React.FC = () => {
  const [titlePage, setTitlePage] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRecoverPassword, setIsRecoverPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, recoverPassword } = useContext<AuthContextModel>(AuthContext);


  useEffect(() => {
    if (isRecoverPassword) {
      setTitlePage("Recuperar Senha");
    } else {
      setTitlePage("Login");
    }
  }, [isRecoverPassword]);

  const validateProceed = async () => {
    if ((isRecoverPassword || !isRecoverPassword) && !email) {
      return Alert.alert("Informe o seu e-mail!");
    }

    if (!isRecoverPassword && !password) {
      return Alert.alert("Informe a sua senha!");
    }

    setIsLoading(true);
    if (isRecoverPassword) {
      await recoverPassword(email)
        .then(() => {
          Alert.alert("Sucesso", "Email de recuperação enviado para " + email);
          setIsRecoverPassword(false);
          resetData();
        })
        .catch((err) => {
          setIsLoading(false);

          Alert.alert(
            "Erro",
            "Não foi possível enviar o e-mail de recuperação para " + email
          );
        });
    } else {
      login(email, password)
        .then(() => {
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
          Alert.alert("Login", "E-mail ou senha estão incorretos!");
        });
    }
  };

  const initRecoverPassword = () => {
    resetData();
    setIsRecoverPassword(true);
  };

  const abortPasswordRecover = () => {
    setIsRecoverPassword(false);
    resetData();
  };

  const resetData = () => {
    setIsLoading(false);
    setEmail("");
    setPassword("");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="always"
      style={{ width: "100%" }}
    >
      <Text style={styles.textStyle}>{titlePage}</Text>

      <CustomInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCorrect={false}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="E-mail"
      />

      {!isRecoverPassword && (
        <CustomInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Senha"
          secureTextEntry={true}
        />
      )}

      {!isRecoverPassword && (
        <View style={styles.containerTextButton}>
          <Pressable onPress={initRecoverPassword}>
            <Text style={styles.textButton}>Esqueci minha senha</Text>
          </Pressable>
        </View>
      )}

      <CustomButton
        title={isRecoverPassword ? "Recuperar" : "Entrar"}
        onPress={validateProceed}
      />
      {isRecoverPassword && (
        <CustomButton
          title={"Cancelar"}
          color="secundary"
          onPress={abortPasswordRecover}
        />
      )}
      <View style={styles.containerLoading}>
        {isLoading && <ActivityIndicator />}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
