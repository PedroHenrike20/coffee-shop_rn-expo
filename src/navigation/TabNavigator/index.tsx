import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CatalogScreen from "@/src/screens/CatalogScreen";
import StackNavigatorTabHome from "../StackNavigatorTabHome";
import FavoriteScreen from "@/src/screens/FavoriteScreen";
import OrdersScreen from "@/src/screens/OrdersScreen";
import NotificationScreen from "@/src/screens/NotificationScreen";

export default function TabNavigator() {
  const Tabs = createBottomTabNavigator();

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
