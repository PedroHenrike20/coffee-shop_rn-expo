import StackNavigationLogin from "@/src/navigation/StackNavigatorLogin/index";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/src/context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "@/src/redux/store";

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <AuthProvider>
        <Provider store={store}>
          <StackNavigationLogin />
        </Provider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
