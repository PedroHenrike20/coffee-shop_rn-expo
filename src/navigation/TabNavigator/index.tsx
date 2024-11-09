import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StackNavigatorTabHome from "../StackNavigatorTabHome";
import FavoriteScreen from "@/src/screens/FavoriteScreen";
import OrdersScreen from "@/src/screens/OrdersScreen";
import NotificationScreen from "@/src/screens/NotificationScreen";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import { RootState } from "@/src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { setListProductIdFavorite } from "@/src/redux/productSlice";

export default function TabNavigator() {
  const Tabs = createBottomTabNavigator();
  const { userModel } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { listProductIdFavorite } = useSelector(
    (state: RootState) => state.products
  );
  const { storeSelected } = useSelector((state: RootState) => state.store);

  useEffect(() => {
    if (userModel?.uid && storeSelected) {
      const favoriteDrinkRef = doc(
        db,
        `users/${userModel!.uid}/favoriteDrinks/${storeSelected}`
      );
      const unsubscribe = onSnapshot(favoriteDrinkRef, (doc) => {
        if (doc.exists()) {
          const data: string[] = doc.data().listFavoriteDrinks || [];
          if (data.length > 0 && data !== listProductIdFavorite) {
            dispatch(setListProductIdFavorite(data));
          } else {
            dispatch(setListProductIdFavorite([]));
          }
        } else {
          dispatch(setListProductIdFavorite([]));
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

        const isScreenProductDetailis = routeNames?.some(
          (route: any) => route.name === "ProductDetails"
        );

        return {
          tabBarStyle: {
            display: isScreenProductDetailis ? "none" : "flex",
          },
          tabBarActiveTintColor: "#C67C4E",
          tabBarInactiveTintColor: "#A2A2A2",
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
        name="Favorites"
        component={FavoriteScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarBadge:
            listProductIdFavorite.length === 0
              ? undefined
              : listProductIdFavorite.length,
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
