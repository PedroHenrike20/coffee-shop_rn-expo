import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackTabParamList } from "../types";
import CatalogScreen from "@/src/screens/CatalogScreen";
import ProductDetailsScreen from "@/src/screens/ProductDetailsScreen";


const Stack = createNativeStackNavigator<RootStackTabParamList>();

const StackNavigatorTabHome: React.FC = () => {


  return (
    <Stack.Navigator
      initialRouteName="Catalog"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#F9F9F9" },
      }}
    >
      <Stack.Screen name="Catalog" component={CatalogScreen} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          headerTitle: "Detalhes",
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigatorTabHome;
