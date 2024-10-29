import StackNavigationLogin from "@/src/navigation/StackNavigatorLogin/index";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/src/context/AuthContext";
import { StatusBar } from 'expo-status-bar';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#FFF"}}>
      {/* <StatusBar style="light" backgroundColor="#000" translucent animated /> */}
      <AuthProvider>
        <StackNavigationLogin />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
