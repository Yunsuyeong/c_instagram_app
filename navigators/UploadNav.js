import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const UploadNav = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "white",
        TabBarIndicatorStyle: { backgroundColor: "red", top: 0 },
      }}
    >
      <Tab.Screen name="Select">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false,
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={28} />
              ),
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: "black",
                shadowOpacity: 0.3,
              },
            }}
          >
            <Stack.Screen
              name="Select"
              options={{ title: "Choose a Photo" }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
};

export default UploadNav;
