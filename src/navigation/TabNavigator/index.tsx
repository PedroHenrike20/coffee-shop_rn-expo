import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CatalogScreen from "@/src/screens/CatalogScreen";
import StackNavigatorTabHome from "../StackNavigatorTabHome";
import FavoriteScreen from "@/src/screens/FavoriteScreen";
import OrdersScreen from "@/src/screens/OrdersScreen";
import NotificationScreen from "@/src/screens/NotificationScreen";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import { RootState } from "@/src/redux/store";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function TabNavigator() {
  const Tabs = createBottomTabNavigator();
  const { userModel } = useContext(AuthContext);
  const { storeSelected } = useSelector((state: RootState) => state.store);
  const [countFavorite, setCountFavorite] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (userModel?.uid && storeSelected) {
      const favoriteDrinkRef = doc(
        db,
        `users/${userModel!.uid}/favoriteDrinks/${storeSelected}`
      );
      const unsubscribe = onSnapshot(favoriteDrinkRef, (doc) => {
        if (doc.exists()) {
          const data: string[] = doc.data().listFavoriteDrinks || [];
          setCountFavorite(data.length === 0 ? undefined : data.length);
        }else{
          setCountFavorite(undefined);
        }
        return () => unsubscribe();
      });
    }
  }, [storeSelected, userModel]);

  return (
    <Tabs.Navigator
      initialRouteName="TabHome"
      screenOptions={({ navigation }) => {
        const state = navigation.getState();
        const routeNames = state.routes[state.index].state?.routes;

        const isScreenProductDetailis = routeNames?.some((route: any) => route.name === 'ProductDetails');

        return {
          tabBarStyle: {
            display: isScreenProductDetailis ? 'none' : 'flex',
          },
          tabBarActiveTintColor: "#C67C4E",
          tabBarInactiveTintColor: "#A2A2A2"
        };
      }}
    >
      <Tabs.Screen
        name="TabHome"
        component={StackNavigatorTabHome}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarBadge: countFavorite,
          // tabBarBadgeStyle: {backgroundColor: "#C67C4E", color: "#FFF"},
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="Bag"
        component={OrdersScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={30} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
