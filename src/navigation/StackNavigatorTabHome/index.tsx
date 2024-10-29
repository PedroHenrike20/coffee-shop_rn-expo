import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackTabParamList } from "../types";
import CatalogScreen from "@/src/screens/CatalogScreen";
import ProductDetailsScreen from "@/src/screens/ProductDetailsScreen";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator<RootStackTabParamList>();

const StackNavigatorTabHome: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Catalog"
      screenOptions={{ headerShown: false, contentStyle: {backgroundColor: "#F9F9F9"} }}
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
          headerRight: ({}) => (
            <TouchableOpacity>
              {/* <MaterialCommunityIcons name="heart" color="#ED5151"  size={30} /> */}
              <MaterialCommunityIcons name="heart-outline" color="#2A2A2A"  size={30} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigatorTabHome;
