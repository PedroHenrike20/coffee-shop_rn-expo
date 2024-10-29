import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import LoginEntryScreen from "@/src/screens/LoginEntryScreen";
import LoginScreen from "@/src/screens/LoginScreen";
import { AuthContext } from "@/src/context/AuthContext";
import { RootStackLoginParamList } from "../types";
import TabNavigator from "../TabNavigator";
import { AuthContextModel } from "@/src/models/AuthContextModel";
import CreateAccountScreen from "@/src/screens/CreateAccountScreen";

const Stack = createNativeStackNavigator<RootStackLoginParamList>();


const StackNavigationLogin: React.FC = () => {
  const { user } = useContext<AuthContextModel>(AuthContext);
  

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false,}}
    >
      {user ? (
        <Stack.Screen name="TabNavigator"  component={TabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="LoginEntry" component={LoginEntryScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigationLogin;
