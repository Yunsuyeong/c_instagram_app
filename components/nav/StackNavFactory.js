import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Photo from "../../screens/Photo";
import Profile from "../../screens/Profile";
import Feed from "../../screens/Feed";
import Search from "../../screens/Search";
import Notifications from "../../screens/Notifications";
import Me from "../../screens/Me";

const Stack = createStackNavigator();

export default function StackNavFactory({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
          shadowColor: "rgba(255,255,255,0.5)",
        },
        headerTintColor: "white",
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen name={"SFeed"} component={Feed} />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"SSearch"} component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name={"SNotifications"} component={Notifications} />
      ) : null}
      {screenName === "Me" ? (
        <Stack.Screen name={"SMe"} component={Me} />
      ) : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
}
