import { db } from "@/firebaseConfig";
import CustomButton from "@/src/components/CustomButton";
import CustomInput from "@/src/components/CustomInput";
import { AuthContext } from "@/src/context/AuthContext";
import { AuthContextModel } from "@/src/models/AuthContextModel";
import { UserModel } from "@/src/models/UserModel";
import { RootStackLoginParamList } from "@/src/navigation/types";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, doc, GeoPoint, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";

const CreateAccountScreen: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackLoginParamList>>();
  const route = useRoute<RouteProp<RootStackLoginParamList>>();

  const userWithGoogle = route.params?.createAccountWithGoogle;
  const uid = route.params?.uid;

  const { setUser } = useContext<AuthContextModel>(AuthContext);

  const createAccountWithEmailAndPassword = async () => {

    if (password !== confirmPassword) {
      return Alert.alert("As senhas não coincidem!");
    } else if (
      !email ||
      !fullName ||
      !password ||
      !confirmPassword ||
      !city ||
      !address || 
      !phone
    ) {
      return Alert.alert("Todos os campos são obrigatórios!");
    } else {
      setIsLoading(true);

      setUser(null);
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then(async (userCreated) => {
          // const geoPoint = new GeoPoint(0, 0);

          const userData: UserModel = {
            address,
            city,
            fullName,
            uid: null!,
            location: null,
            phone,
            createdAt: new Date(),
          };
          await setDoc(doc(db, "users", userCreated.user.uid), userData);
          const subCollectionOrdersRef = collection(
            db,
            `users/${userCreated.user.uid}/orderHistory`
          );
          await addDoc(subCollectionOrdersRef, {});

          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);

          const errorCode = e?.code;

          switch (errorCode) {
            case "auth/invalid-email":
              Alert.alert("Não foi possível", "Email inválido!");
              break;
            case "auth/email-already-in-use":
              Alert.alert("Não foi possível", "Esse Email já está em uso!");
              break;
            case "auth/operation-not-allowed":
              Alert.alert("Erro ao criar a conta", "Operação não permitida!");
              break;
            case "auth/weak-password":
              Alert.alert(
                "Não foi possível",
                "A sua senha deve ter pelo menos 6 caracteres!"
              );
              break;
            default:
              Alert.alert(
                "Erro ao criar a conta",
                "Não foi possível criar a sua conta, tente novamente mais tarde!"
              );
              break;
          }
        });
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      style={{ width: "100%" }}
    >
      <Text style={styles.textStyle}>Crie sua conta agora mesmo!</Text>

      <CustomInput
        value={fullName}
        onChangeText={(text) => setFullName(text)}
        placeholder="Nome Completo"
      />

      <CustomInput
        value={phone}
        keyboardType="name-phone-pad"
        onChangeText={(text) => setPhone(text)}
        placeholder="Telefone"
      />

      {!userWithGoogle && (
        <>
          <CustomInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="E-mail"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <CustomInput
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            placeholder="Senha"
          />
          <CustomInput
            value={confirmPassword}
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder="Confirmar Senha"
          />
        </>
      )}

      <CustomInput
        value={city}
        onChangeText={(text) => setCity(text)}
        placeholder="Cidade"
      />
      <CustomInput
        value={address}
        onChangeText={(text) => setAddress(text)}
        placeholder="Endereço"
      />
      <CustomButton
        title={"Criar Conta"}
        onPress={createAccountWithEmailAndPassword}
      />

      <View style={styles.containerLoading}>
        {isLoading && <ActivityIndicator color="#C67C4E" size={35} />}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateAccountScreen;
