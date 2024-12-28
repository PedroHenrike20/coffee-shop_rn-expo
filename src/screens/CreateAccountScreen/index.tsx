import { db } from "@/firebaseConfig";
import CustomButton from "@/src/components/CustomButton";
import CustomInput from "@/src/components/CustomInput";
import { AuthContext } from "@/src/context/AuthContext";
import { AuthContextModel } from "@/src/models/AuthContextModel";
import { UserModel } from "@/src/models/UserModel";
import { RootStackLoginParamList } from "@/src/navigation/types";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { confirmPasswordReset, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { Formik } from "formik";
import * as Yup from "yup";

const CreateAccountScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackLoginParamList>>();
  const route = useRoute<RouteProp<RootStackLoginParamList>>();

  const userWithGoogle = route.params?.createAccountWithGoogle;
  const uid = route.params?.uid;

  const { setUser } = useContext<AuthContextModel>(AuthContext);

  const createAccountWithEmailAndPassword = async (data: UserModel) => {
    setIsLoading(true);

    setUser(null);
    createUserWithEmailAndPassword(getAuth(), data.email!, data.password!)
      .then(async (userCreated) => {
        const userData: Omit<UserModel, "email" | "password" | "confirmPassword"> = {
          address: data.address,
          city: data.city,
          fullName: data.fullName,
          uid: null!,
          location: null,
          phone: data.phone,
          createdAt: new Date(),
        };
        await setDoc(doc(db, "users", userCreated.user.uid), userData);
        const subCollectionOrdersRef = collection(
          db,
          `users/${userCreated.user.uid}/orderHistory`
        );
        const subCollectionFavoriteDrinks = collection(
          db,
          `users/${userCreated.user.uid}/favoriteDrinks`
        );
        await addDoc(subCollectionOrdersRef, {});
        await addDoc(subCollectionFavoriteDrinks, {});

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
  };

  const validationSchema = Yup.object<UserModel>({
    fullName: Yup.string().required("O nome é obrigatório!"),
    email: Yup.string()
      .email("Email inválido!")
      .required("O email é obrigatório!"),
    password: Yup.string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("A senha é obrigatória!"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'As senhas devem coincidir!').required('A confirmação da senha é obrigatória!'),
    phone: Yup.number().required("O telefone é obrigatório!"),
    city: Yup.string().required("A cidade é obrigatório!"),
    address: Yup.string().required("O endereço é obrigatório!"),
  });

  const initialValues: UserModel = {
    address: "",
    city: "",
    fullName: "",
    location: null,
    createdAt: null!,
    phone: "",
    uid: null!,
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: UserModel) => {
    await createAccountWithEmailAndPassword(values);
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.textStyle}>Crie sua conta agora mesmo!</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid
          }) => (
            <>
              <CustomInput
                label="Nome completo"
                value={values.fullName}
                onBlur={handleBlur("fullName")}
                onChangeText={handleChange("fullName")}
                placeholder="Informe o seu nome"
                error={errors.fullName}
                touched={touched.fullName}
              />

              <CustomInput
                label="Telefone"
                value={values.phone}
                onBlur={handleBlur("phone")}
                keyboardType="phone-pad"
                onChangeText={handleChange("phone")}
                placeholder="Informe o seu telefone"
                error={errors.phone}
                touched={touched.phone}
              />

              {!userWithGoogle && (
                <>
                  <CustomInput
                    label="Email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    placeholder="Informe o seu email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    error={errors.email}
                    onBlur={handleBlur("email")}
                    touched={touched.email}
                  />
                  <CustomInput
                    label="Senha"
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    placeholder="Informe sua senha"
                    error={errors.password}
                    touched={touched.password}
                  />
                  <CustomInput
                    label="Confirmar senha"
                    value={values.confirmPassword}
                    secureTextEntry={true}
                    onBlur={handleBlur('confirmPassword')}
                    onChangeText={handleChange('confirmPassword')}
                    placeholder="Confirme sua senha"
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                  />
                </>
              )}

              <CustomInput
                label="Cidade"
                value={values.city}
                onBlur={handleBlur("city")}
                onChangeText={handleChange("city")}
                placeholder="Informe a sua cidade"
                error={errors.city}
                touched={touched.city}
              />
              <CustomInput
                label="Endereço"
                value={values.address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                placeholder="Informe o seue endereço"
                error={errors.address}
                touched={touched.address}
              />
              <CustomButton
                title={"Criar Conta"}
                isDisabled={!isValid}
                onPress={() => handleSubmit()}
              />
              <View style={styles.containerLoading}>
                {isLoading && <ActivityIndicator color="#C67C4E" size={35} />}
              </View>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateAccountScreen;
