import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar, cache } from "./apollo";
import { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoggedInNav from "./navigators/LoggedInNav";
import LoggedOutNav from "./navigators/LoggedOutNav";

export default function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [appIsReady, setAppIsReady] = useState(false);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    Promise.all([...fontPromises, ...imagePromises]);
  };

  useEffect(() => {
    const preload = async () => {
      const token = await AsyncStorage.getItem("token");
      const cachePersistor = new CachePersistor({
        cache,
        storage: new AsyncStorageWrapper(AsyncStorage),
      });
      if (token) {
        isLoggedInVar(true);
        tokenVar(token.replace(/"/g, ""));
      }
      try {
        await SplashScreen.preventAutoHideAsync();
        preloadAssets();
      } catch (err) {
        console.error(err);
      } finally {
        setAppIsReady(true);
      }
    };
    preload();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
      </ApolloProvider>
    </View>
  );
}
